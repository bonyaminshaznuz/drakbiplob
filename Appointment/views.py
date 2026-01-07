from django.shortcuts import render, redirect, get_object_or_404
from rest_framework import generics, status
from rest_framework.response import Response
from .models import AvailableSlot, Appointment, MailSetting
from .serializers import AvailableSlotSerializer, AppointmentSerializer
from django.contrib import messages
from .utils import send_appointment_email
from django.contrib.admin.views.decorators import staff_member_required

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
@staff_member_required
def admin_appointment_list(request):
    appointments = Appointment.objects.all().order_by('-created_at')
    return render(request, 'appointment.html', {'appointments': appointments})

@staff_member_required
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
    
    # Logic to find dates that have all 32 slots (09:00-12:45 and 14:00-17:45)
    from django.db.models import Count
    full_slots_count = 32 
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
        'hours': ["09", "10", "11", "12", "14", "15", "16", "17"],
        'minutes': ["00", "15", "30", "45"]
    }
    return render(request, 'releasedateandtime.html', context)

@staff_member_required
def admin_confirm_appointment(request, pk):
    appointment = get_object_or_404(Appointment, pk=pk)
    appointment.status = 'confirmed'
    appointment.save()
    messages.success(request, f"Appointment for {appointment.full_name} confirmed!")
    # Send Email
    send_appointment_email(appointment, 'confirmed')
    return redirect('admin-appointment-list')

@staff_member_required
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

@staff_member_required
def admin_delete_slot(request, pk):
    slot = get_object_or_404(AvailableSlot, pk=pk)
    if slot.is_booked:
        messages.error(request, "Cannot delete a booked slot! Cancel the appointment first.")
    else:
        slot.delete()
        messages.success(request, "Slot deleted successfully!")
    return redirect('admin-release-slots')

@staff_member_required
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

@staff_member_required
def admin_mail_settings(request):
    config = MailSetting.objects.first()
    if request.method == 'POST':
        if not config:
            config = MailSetting()
        
        config.email_host = request.POST.get('email_host')
        config.email_port = request.POST.get('email_port', 587)
        config.email_host_user = request.POST.get('email_host_user')
        if request.POST.get('email_host_password'): # Only update if new password provided
            config.email_host_password = request.POST.get('email_host_password')
        config.email_use_tls = request.POST.get('email_use_tls') == 'on'
        config.email_use_ssl = request.POST.get('email_use_ssl') == 'on'
        config.default_from_email = request.POST.get('default_from_email')
        config.admin_email = request.POST.get('admin_email')
        config.save()
        messages.success(request, "Mail settings updated successfully!")
        return redirect('admin-mail-settings')

    return render(request, 'mail_settings.html', {'config': config})
