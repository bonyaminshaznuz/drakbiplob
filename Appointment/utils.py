from django.core.mail import send_mail, get_connection
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings
from .models import MailSetting

def send_appointment_email(appointment, event_type):
    """
    Sends email notifications for appointment-related events.
    event_type: 'booked', 'updated', 'confirmed', 'cancelled'
    """
    try:
        # Always use settings.py for email configuration
        from_email = settings.DEFAULT_FROM_EMAIL
        admin_email = settings.ADMIN_EMAIL
        connection = None

        subject_map = {
            'booked': f"New Appointment Request - {appointment.full_name}",
            'updated': f"Appointment Updated - {appointment.full_name}",
            'confirmed': f"Appointment Confirmed - Dr. Abul Khayer (Biplob)",
            'cancelled': f"Appointment Cancelled - Dr. Abul Khayer (Biplob)",
        }

        subject = subject_map.get(event_type, "Appointment Notification")
        recipient_list = []
        
        # 1. Email to User
        if appointment.email:
            recipient_list.append(appointment.email)
        
        # Context for templates
        context = {
            'appointment': appointment,
            'event_type': event_type,
            'formatted_id': appointment.formatted_id
        }
        
        # Try rendering HTML template
        try:
            html_message = render_to_string('emails/appointment_notification.html', context)
            plain_message = strip_tags(html_message)
        except Exception as e:
            print(f"Template rendering error: {e}")
            plain_message = f"Appointment Alert: {event_type}. ID: {appointment.formatted_id}"
            html_message = None

        # Send to User
        if recipient_list:
            send_mail(
                subject=subject,
                message=plain_message,
                from_email=from_email,
                recipient_list=recipient_list,
                html_message=html_message,
                connection=connection,
                fail_silently=False # Keep it False inside our try-block to see errors in console
            )

        # 2. Email to Admin
        if admin_email:
            admin_subject = f"ADMIN ALERT: {subject}"
            
            # Try rendering Admin HTML template
            try:
                admin_html_message = render_to_string('emails/admin_notification.html', context)
                admin_plain_message = strip_tags(admin_html_message)
            except Exception as e:
                print(f"Admin template error: {e}")
                admin_plain_message = f"Admin Alert: {event_type}\nPatient: {appointment.full_name}\nID: {appointment.formatted_id}"
                admin_html_message = None

            send_mail(
                subject=admin_subject,
                message=admin_plain_message,
                from_email=from_email,
                recipient_list=[admin_email],
                html_message=admin_html_message,
                connection=connection,
                fail_silently=False
            )
            
    except Exception as e:
        # LOG THE ERROR BUT DON'T CRASH THE SITE
        print(f"CRITICAL EMAIL ERROR: {e}")
        return False
    
    return True
