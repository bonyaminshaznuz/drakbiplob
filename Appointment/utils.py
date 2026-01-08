from mailjet_rest import Client
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
        mailjet = Client(auth=(settings.MAILJET_API_KEY, settings.MAILJET_API_SECRET), version='v3.1')

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
            data = {
                'Messages': [
                    {
                        "From": {
                            "Email": from_email.split('<')[-1].replace('>', '').strip() if '<' in from_email else from_email,
                            "Name": from_email.split('<')[0].strip() if '<' in from_email else from_email
                        },
                        "To": [{"Email": email, "Name": appointment.full_name} for email in recipient_list],
                        "Subject": subject,
                        "TextPart": plain_message,
                        "HTMLPart": html_message or plain_message,
                    }
                ]
            }
            result = mailjet.send.create(data=data)
            if result.status_code != 200:
                print(f"Mailjet user email error: {result.status_code} {result.json()}")

        # 2. Email to Admin
        if admin_email:
            admin_subject = f"ADMIN ALERT: {subject}"
            try:
                admin_html_message = render_to_string('emails/admin_notification.html', context)
                admin_plain_message = strip_tags(admin_html_message)
            except Exception as e:
                print(f"Admin template error: {e}")
                admin_plain_message = f"Admin Alert: {event_type}\nPatient: {appointment.full_name}\nID: {appointment.formatted_id}"
                admin_html_message = None
            data = {
                'Messages': [
                    {
                        "From": {
                            "Email": from_email.split('<')[-1].replace('>', '').strip() if '<' in from_email else from_email,
                            "Name": from_email.split('<')[0].strip() if '<' in from_email else from_email
                        },
                        "To": [{"Email": admin_email, "Name": "Admin"}],
                        "Subject": admin_subject,
                        "TextPart": admin_plain_message,
                        "HTMLPart": admin_html_message or admin_plain_message,
                    }
                ]
            }
            result = mailjet.send.create(data=data)
            if result.status_code != 200:
                print(f"Mailjet admin email error: {result.status_code} {result.json()}")
            
    except Exception as e:
        # LOG THE ERROR BUT DON'T CRASH THE SITE
        print(f"CRITICAL EMAIL ERROR: {e}")
        return False
    
    return True
