from django.shortcuts import render, redirect, get_object_or_404
from django.http import Http404
from rest_framework import generics, status
from rest_framework.response import Response
from .models import AvailableSlot, Appointment, MailSetting, PasswordResetOTP
from .serializers import AvailableSlotSerializer, AppointmentSerializer
from django.contrib import messages
from .utils import send_appointment_email, send_password_reset_otp
from django.contrib.admin.views.decorators import staff_member_required
from django.contrib.auth import views as auth_views
from django.contrib.auth import authenticate, login, get_user_model
from django.contrib.auth.hashers import make_password
from django.views.decorators.http import require_http_methods
from django.utils import timezone
from django.contrib.auth.decorators import login_required

User = get_user_model()

# Use staff_member_required with custom login_url
from functools import wraps

def staff_required_custom_login(view_func):
    return staff_member_required(view_func, login_url='/accounts/login/')


# API Views for Frontend (Public)
class AvailableSlotListView(generics.ListAPIView):
    queryset = AvailableSlot.objects.filter(is_booked=False)
    serializer_class = AvailableSlotSerializer

class AppointmentCreateView(generics.CreateAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

    def perform_create(self, serializer):
        appointment = serializer.save()
        # Mark slot as booked
        slot = appointment.slot
        slot.is_booked = True
        slot.save()
        # Send Email
        send_appointment_email(appointment, 'booked')

class AppointmentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    lookup_field = 'id'
    
    def get_object(self):
        lookup_value = self.kwargs.get(self.lookup_field)
        
        # Check if lookup_value is numeric (original ID)
        if lookup_value.isdigit():
            return get_object_or_404(Appointment, id=lookup_value)
        
        # If not numeric, it might be the formatted ID (Initial + DOB + ID)
        # Format is: [A-Z][0-9]{8}[0-9]+
        # We can extract the ID from the end if it matches the pattern
        import re
        match = re.match(r'^[A-Z][0-9]{8}([0-9]+)$', lookup_value, re.IGNORECASE)
        if match:
            actual_id = match.group(1)
            return get_object_or_404(Appointment, id=actual_id)
            
        # Fallback to direct lookup if any other case (might fail with 404)
        return get_object_or_404(Appointment, id=lookup_value)

    def perform_update(self, serializer):
        # When user updates their info via API, set status back to pending
        appointment = serializer.save(status='pending')
        # Send Email
        send_appointment_email(appointment, 'updated')

    def perform_destroy(self, instance):
        # Notify before deleting if user cancels
        send_appointment_email(instance, 'cancelled')
        instance.delete()

# Template Views for Admin (Protected)
@staff_required_custom_login
def admin_appointment_list(request):
    from datetime import date, timedelta
    from django.db.models import Q
    
    today = date.today()
    
    # Get filter parameters
    status_filter = request.GET.get('status', '')
    date_filter = request.GET.get('date', '')
    search_query = request.GET.get('search', '')
    
    # Start with all appointments
    appointments = Appointment.objects.select_related('slot').all()
    
    # Apply status filter
    if status_filter and status_filter in ['pending', 'confirmed', 'cancelled']:
        appointments = appointments.filter(status=status_filter)
    
    # Apply date filter
    if date_filter == 'today':
        appointments = appointments.filter(slot__date=today)
    elif date_filter == 'tomorrow':
        tomorrow = today + timedelta(days=1)
        appointments = appointments.filter(slot__date=tomorrow)
    elif date_filter == 'this_week':
        week_end = today + timedelta(days=7)
        appointments = appointments.filter(slot__date__range=[today, week_end])
    elif date_filter == 'upcoming':
        appointments = appointments.filter(slot__date__gte=today)
    elif date_filter == 'past':
        appointments = appointments.filter(slot__date__lt=today)
    
    # Apply search filter
    if search_query:
        # Get all appointments matching ORM fields
        orm_filtered = appointments.filter(
            Q(full_name__icontains=search_query) |
            Q(phone_number__icontains=search_query) |
            Q(email__icontains=search_query)
        )
        # Only match formatted_id if search_query is at least 5 characters
        if len(search_query) >= 5:
            formatted_id_filtered = [appt for appt in appointments if search_query.lower() in appt.formatted_id.lower()]
        else:
            formatted_id_filtered = []
        # Combine results, avoiding duplicates
        appointments = list({appt.id: appt for appt in list(orm_filtered) + formatted_id_filtered}.values())
    
    # Group appointments by date for template
    from collections import OrderedDict
    appointments_by_date = OrderedDict()
    
    # Separate appointments into today, future, and past
    today_list = []
    future_dict = {}  # key: date object, value: list of appointments
    past_dict = {}    # key: date object, value: list of appointments
    
    for apt in appointments:
        apt_date = apt.slot.date
        
        if apt_date == today:
            today_list.append(apt)
        elif apt_date > today:
            if apt_date not in future_dict:
                future_dict[apt_date] = []
            future_dict[apt_date].append(apt)
        else:
            if apt_date not in past_dict:
                past_dict[apt_date] = []
            past_dict[apt_date].append(apt)
    
    # Sort appointments within each group by time
    today_list.sort(key=lambda x: x.slot.time)
    for date_key in future_dict:
        future_dict[date_key].sort(key=lambda x: x.slot.time)
    for date_key in past_dict:
        past_dict[date_key].sort(key=lambda x: x.slot.time)
    
    # Build ordered dictionary: Today first, then future dates (ascending), then past dates (descending)
    if today_list:
        appointments_by_date['Today'] = today_list
    
    # Add future dates in chronological order
    for date_key in sorted(future_dict.keys()):
        date_display = date_key.strftime('%B %d, %Y')
        appointments_by_date[date_display] = future_dict[date_key]
    
    # Add past dates in reverse chronological order (most recent first)
    for date_key in sorted(past_dict.keys(), reverse=True):
        date_display = date_key.strftime('%B %d, %Y')
        appointments_by_date[date_display] = past_dict[date_key]
    
    # Get statistics
    total_count = Appointment.objects.count()
    today_count = Appointment.objects.filter(slot__date=today).count()
    pending_count = Appointment.objects.filter(status='pending').count()
    confirmed_count = Appointment.objects.filter(status='confirmed').count()
    cancelled_count = Appointment.objects.filter(status='cancelled').count()
    
    context = {
        'appointments_by_date': appointments_by_date,
        'status_filter': status_filter,
        'date_filter': date_filter,
        'search_query': search_query,
        'today': today,
        'statistics': {
            'total': total_count,
            'today': today_count,
            'pending': pending_count,
            'confirmed': confirmed_count,
            'cancelled': cancelled_count,
        }
    }
    return render(request, 'appointment.html', context)

@login_required
def admin_release_slots(request):
    # Auto-fix inconsistencies: if a slot is marked booked but has no appointment, free it
    AvailableSlot.objects.filter(is_booked=True, appointment__isnull=True).update(is_booked=False)
    
    if request.method == 'POST':
        dates_str = request.POST.get('dates') # comma separated dates
        times = request.POST.getlist('times') # multiple times
        
        if not dates_str or not times:
            messages.error(request, "Please select both dates and times.")
            return redirect('admin-release-slots')
            
        dates = dates_str.split(',')
        created_count = 0
        for date_val in dates:
            for time_val in times:
                _, created = AvailableSlot.objects.get_or_create(date=date_val.strip(), time=time_val)
                if created:
                    created_count += 1
        
        if created_count > 0:
            messages.success(request, f"Successfully released {created_count} new slots!")
        else:
            messages.info(request, "Selected slots were already released.")
            
        return redirect('admin-release-slots')
    
    from datetime import date, timedelta
    today = date.today()
    max_date = today + timedelta(days=30)
    
    # Logic to find dates that have all 96 slots (00:00-23:45 with 15-minute intervals - 24 hours)
    from django.db.models import Count
    full_slots_count = 96  # 24 hours (00-23) × 4 slots per hour (00, 15, 30, 45)
    full_dates_query = AvailableSlot.objects.values('date').annotate(slot_count=Count('id')).filter(slot_count__gte=full_slots_count)
    full_dates = [d['date'].strftime('%Y-%m-%d') for d in full_dates_query]
    
    import json
    existing_slots_query = AvailableSlot.objects.values('date', 'time')
    existing_slots_map = {}
    for s in existing_slots_query:
        d_str = s['date'].strftime('%Y-%m-%d')
        t_str = s['time'].strftime('%H:%M')
        if d_str not in existing_slots_map:
            existing_slots_map[d_str] = []
        existing_slots_map[d_str].append(t_str)
    
    slots = AvailableSlot.objects.all().order_by('-is_booked', '-date', 'time')
    context = {
        'slots': slots,
        'min_date': today.strftime('%Y-%m-%d'),
        'max_date': max_date.strftime('%Y-%m-%d'),
        'full_dates': full_dates,
        'existing_slots': existing_slots_map,
        'hours': ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"],
        'minutes': ["00", "15", "30", "45"]
    }
    return render(request, 'releasedateandtime.html', context)

@login_required
def admin_confirm_appointment(request, pk):
    appointment = get_object_or_404(Appointment, pk=pk)
    appointment.status = 'confirmed'
    appointment.save()
    messages.success(request, f"Appointment for {appointment.full_name} confirmed!")
    # Send Email
    send_appointment_email(appointment, 'confirmed')
    return redirect('admin-appointment-list')

@login_required
def admin_cancel_appointment(request, pk):
    appointment = get_object_or_404(Appointment, pk=pk)
    appointment.status = 'cancelled'
    appointment.save()
    
    # Free the slot
    slot = appointment.slot
    slot.is_booked = False
    slot.save()
    
    messages.warning(request, f"Appointment for {appointment.full_name} cancelled and slot released.")
    # Send Email
    send_appointment_email(appointment, 'cancelled')
    return redirect('admin-appointment-list')

@login_required
def admin_delete_slot(request, pk):
    slot = get_object_or_404(AvailableSlot, pk=pk)
    if slot.is_booked:
        messages.error(request, "Cannot delete a booked slot! Cancel the appointment first.")
    else:
        slot.delete()
        messages.success(request, "Slot deleted successfully!")
    return redirect('admin-release-slots')

@login_required
def admin_bulk_delete_slots(request):
    if request.method == 'POST':
        slot_ids = request.POST.getlist('slot_ids')
        if not slot_ids:
            messages.warning(request, "No slots selected for deletion.")
            return redirect('admin-release-slots')
        
        # Only delete slots that are not booked
        slots_to_delete = AvailableSlot.objects.filter(id__in=slot_ids, is_booked=False)
        count = slots_to_delete.count()
        slots_to_delete.delete()
        
        if count > 0:
            messages.success(request, f"Successfully deleted {count} slots.")
        else:
            messages.error(request, "No available slots were deleted (they might be booked).")
            
    return redirect('admin-release-slots')

@login_required
def admin_mail_settings(request):
    config = MailSetting.objects.first()
    if request.method == 'POST':
        if not config:
            config = MailSetting()
            # On initial creation, require API credentials
            mailjet_api_key = request.POST.get('mailjet_api_key', '').strip()
            mailjet_api_secret = request.POST.get('mailjet_api_secret', '').strip()
            if not mailjet_api_key or not mailjet_api_secret:
                messages.error(request, "Mailjet API Key and API Secret are required for initial setup!")
                return render(request, 'mail_settings.html', {'config': config})
            config.mailjet_api_key = mailjet_api_key
            config.mailjet_api_secret = mailjet_api_secret
        else:
            # On update, only update if new values provided
            mailjet_api_key = request.POST.get('mailjet_api_key', '').strip()
            mailjet_api_secret = request.POST.get('mailjet_api_secret', '').strip()
            if mailjet_api_key:
                config.mailjet_api_key = mailjet_api_key
            if mailjet_api_secret:
                config.mailjet_api_secret = mailjet_api_secret
        
        # Email Settings (always update)
        config.default_from_email = request.POST.get('default_from_email', '').strip()
        config.admin_email = request.POST.get('admin_email', '').strip()
        
        # Validate required fields
        if not config.default_from_email or not config.admin_email:
            messages.error(request, "From Email and Admin Email are required!")
            return render(request, 'mail_settings.html', {'config': config})
        
        config.save()
        messages.success(request, "Mailjet API settings updated successfully!")
        return redirect('admin-mail-settings')

    return render(request, 'mail_settings.html', {'config': config})


# Admin Panel Dashboard/Index
@login_required
def admin_panel_index(request):
    """Admin panel dashboard with welcome message and summary statistics"""
    from datetime import date, timedelta
    from django.db.models import Q
    
    today = date.today()
    
    # Appointment Statistics
    total_appointments = Appointment.objects.count()
    today_appointments = Appointment.objects.filter(slot__date=today).count()
    pending_appointments = Appointment.objects.filter(status='pending').count()
    confirmed_appointments = Appointment.objects.filter(status='confirmed').count()
    cancelled_appointments = Appointment.objects.filter(status='cancelled').count()
    
    # Slot Statistics
    total_slots = AvailableSlot.objects.count()
    available_slots = AvailableSlot.objects.filter(is_booked=False).count()
    booked_slots = AvailableSlot.objects.filter(is_booked=True).count()
    
    # Upcoming Appointments (next 7 days)
    week_end = today + timedelta(days=7)
    upcoming_appointments = Appointment.objects.filter(slot__date__range=[today, week_end], status__in=['pending', 'confirmed']).count()
    
    # Recent Appointments (last 5)
    recent_appointments = Appointment.objects.select_related('slot').order_by('-created_at')[:5]
    
    # Portfolio Statistics (if Portfolio app is installed)
    try:
        from Portfolio.models import HeroSection, Service, Video, Testimonial
        portfolio_stats = {
            'hero_count': HeroSection.objects.count(),
            'service_count': Service.objects.count(),
            'video_count': Video.objects.count(),
            'testimonial_count': Testimonial.objects.count(),
        }
    except ImportError:
        portfolio_stats = {
            'hero_count': 0,
            'service_count': 0,
            'video_count': 0,
            'testimonial_count': 0,
        }
    
    context = {
        'user': request.user,
        'today': today,
        'statistics': {
            'appointments': {
                'total': total_appointments,
                'today': today_appointments,
                'pending': pending_appointments,
                'confirmed': confirmed_appointments,
                'cancelled': cancelled_appointments,
                'upcoming': upcoming_appointments,
            },
            'slots': {
                'total': total_slots,
                'available': available_slots,
                'booked': booked_slots,
            },
            'portfolio': portfolio_stats,
        },
        'recent_appointments': recent_appointments,
    }
    
    return render(request, 'admin_panel_index.html', context)


# Admin Login View
@require_http_methods(["GET", "POST"])
def admin_login(request):
    """Custom login view for admin panel - staff only"""
    # If user is already logged in and is staff, redirect to dashboard
    if request.user.is_authenticated and request.user.is_staff:
        next_url = request.GET.get('next', 'admin-panel-index')
        return redirect(next_url)
    
    if request.method == 'POST':
        username = request.POST.get('username', '').strip()
        password = request.POST.get('password', '').strip()
        
        if not username or not password:
            messages.error(request, 'Please provide both username and password.')
            return render(request, 'login.html')
        
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            if user.is_staff:
                login(request, user)
                next_url = request.GET.get('next', 'admin-panel-index')
                messages.success(request, f'Welcome back, {user.get_full_name() or user.get_username()}!')
                return redirect(next_url)
            else:
                messages.error(request, 'Access denied. Staff privileges required.')
                return render(request, 'login.html')
        else:
            messages.error(request, 'Invalid username or password.')
            return render(request, 'login.html')
    
    return render(request, 'login.html')


# Password Reset Views
@require_http_methods(["GET", "POST"])
def forgot_password(request):
    """Step 1: Request password reset - enter email"""
    if request.user.is_authenticated:
        return redirect('admin-panel-index')
    
    if request.method == 'POST':
        email = request.POST.get('email', '').strip().lower()
        
        if not email:
            messages.error(request, 'Please enter your email address.')
            return render(request, 'forgot_password.html')
        
        # Check if user exists and is staff (case-insensitive email lookup)
        try:
            user = User.objects.get(email__iexact=email, is_staff=True)
        except User.DoesNotExist:
            # Don't reveal if email exists or not (security best practice)
            messages.success(request, 'If an account exists with this email, an OTP code has been sent.')
            return render(request, 'forgot_password.html')
        
        # Send OTP
        success, otp = send_password_reset_otp(email)
        
        if success and otp:
            # Store email in session for next step
            request.session['reset_email'] = email
            messages.success(request, f'OTP code has been sent to {email}. Please check your email.')
            return redirect('verify-otp')
        else:
            messages.error(request, 'Failed to send OTP. Please try again later.')
            return render(request, 'forgot_password.html')
    
    return render(request, 'forgot_password.html')


@require_http_methods(["GET", "POST"])
def verify_otp(request):
    """Step 2: Verify OTP code"""
    if request.user.is_authenticated:
        return redirect('admin-panel-index')
    
    # Check if email is in session
    email = request.session.get('reset_email')
    if not email:
        messages.error(request, 'Please start the password reset process again.')
        return redirect('forgot-password')
    
    if request.method == 'POST':
        otp_code = request.POST.get('otp', '').strip()
        
        if not otp_code or len(otp_code) != 6:
            messages.error(request, 'Please enter a valid 6-digit OTP code.')
            return render(request, 'verify_otp.html', {'email': email})
        
        # Verify OTP
        try:
            otp = PasswordResetOTP.objects.get(
                email=email,
                otp_code=otp_code,
                is_used=False
            )
            
            if otp.is_valid():
                # Store OTP ID in session for password reset
                request.session['reset_otp_id'] = otp.id
                messages.success(request, 'OTP verified successfully. Please set your new password.')
                return redirect('reset-password')
            else:
                messages.error(request, 'OTP has expired. Please request a new one.')
                del request.session['reset_email']
                return redirect('forgot-password')
                
        except PasswordResetOTP.DoesNotExist:
            messages.error(request, 'Invalid OTP code. Please try again.')
            return render(request, 'verify_otp.html', {'email': email})
    
    return render(request, 'verify_otp.html', {'email': email})


@require_http_methods(["GET", "POST"])
def reset_password(request):
    """Step 3: Set new password"""
    if request.user.is_authenticated:
        return redirect('admin-panel-index')
    
    # Check if OTP is verified
    email = request.session.get('reset_email')
    otp_id = request.session.get('reset_otp_id')
    
    if not email or not otp_id:
        messages.error(request, 'Please complete the OTP verification first.')
        return redirect('forgot-password')
    
    try:
        otp = PasswordResetOTP.objects.get(id=otp_id, email=email, is_used=False)
        if not otp.is_valid():
            messages.error(request, 'OTP has expired. Please start the process again.')
            del request.session['reset_email']
            del request.session['reset_otp_id']
            return redirect('forgot-password')
    except PasswordResetOTP.DoesNotExist:
        messages.error(request, 'Invalid session. Please start the process again.')
        del request.session['reset_email']
        del request.session['reset_otp_id']
        return redirect('forgot-password')
    
    if request.method == 'POST':
        password = request.POST.get('password', '').strip()
        password_confirm = request.POST.get('password_confirm', '').strip()
        
        if not password or not password_confirm:
            messages.error(request, 'Please fill in all fields.')
            return render(request, 'reset_password.html')
        
        if password != password_confirm:
            messages.error(request, 'Passwords do not match.')
            return render(request, 'reset_password.html')
        
        if len(password) < 8:
            messages.error(request, 'Password must be at least 8 characters long.')
            return render(request, 'reset_password.html')
        
        # Update password
        try:
            user = User.objects.get(email__iexact=email, is_staff=True)
            user.set_password(password)
            user.save()
            
            # Mark OTP as used
            otp.mark_as_used()
            
            # Clear session
            del request.session['reset_email']
            del request.session['reset_otp_id']
            
            messages.success(request, 'Password has been reset successfully. You can now login with your new password.')
            return redirect('admin-login')
            
        except User.DoesNotExist:
            messages.error(request, 'User not found.')
            del request.session['reset_email']
            del request.session['reset_otp_id']
            return redirect('forgot-password')
    
    return render(request, 'reset_password.html')


# Custom Error Handlers
def custom_404_view(request, exception):
    """Custom 404 error page handler"""
    return render(request, '404.html', status=404)


def custom_500_view(request):
    """Custom 500 error page handler"""
    return render(request, '500.html', status=500)
