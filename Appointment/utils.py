from mailjet_rest import Client
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings
from .models import MailSetting, PasswordResetOTP


def _get_mail_config():
    """
    Get email configuration from MailSetting model or fallback to settings.py
    Returns configuration dictionary with Mailjet API credentials
    """
    mail_setting = MailSetting.objects.first()
    
    if mail_setting:
        # Use dynamic configuration from database
        return mail_setting.get_email_config()
    else:
        # Fallback to settings.py (backward compatibility)
        return {
            'from_email': getattr(settings, 'DEFAULT_FROM_EMAIL', 'Dr. Abul Khayer (Biplob) <your-email@gmail.com>'),
            'admin_email': getattr(settings, 'ADMIN_EMAIL', ''),
            'api_key': getattr(settings, 'MAILJET_API_KEY', ''),
            'api_secret': getattr(settings, 'MAILJET_API_SECRET', ''),
        }


def _parse_from_email(from_email_str):
    """Parse from_email string like 'Name <email@domain.com>' into name and email"""
    if '<' in from_email_str and '>' in from_email_str:
        name = from_email_str.split('<')[0].strip()
        email = from_email_str.split('<')[-1].replace('>', '').strip()
        return email, name
    return from_email_str, from_email_str


def _send_email_via_mailjet(config, from_email, to_email, to_name, subject, html_message, plain_message):
    """Send email using Mailjet API"""
    try:
        if not config.get('api_key') or not config.get('api_secret'):
            print("ERROR: Mailjet API credentials not configured!")
            return False
            
        mailjet = Client(auth=(config['api_key'], config['api_secret']), version='v3.1')
        
        from_email_addr, from_name = _parse_from_email(from_email)
        
        data = {
            'Messages': [
                {
                    "From": {
                        "Email": from_email_addr,
                        "Name": from_name
                    },
                    "To": [{"Email": to_email, "Name": to_name}],
                    "Subject": subject,
                    "TextPart": plain_message,
                    "HTMLPart": html_message or plain_message,
                }
            ]
        }
        result = mailjet.send.create(data=data)
        if result.status_code != 200:
            print(f"Mailjet email error: {result.status_code} {result.json()}")
            return False
        return True
    except Exception as e:
        print(f"Mailjet send error: {e}")
        import traceback
        traceback.print_exc()
        return False


def send_appointment_email(appointment, event_type):
    """
    Sends email notifications for appointment-related events using Mailjet API.
    Configuration is loaded dynamically from MailSetting model or falls back to settings.py
    event_type: 'booked', 'updated', 'confirmed', 'cancelled'
    """
    try:
        # Get dynamic email configuration
        config = _get_mail_config()
        
        if not config or not config.get('api_key') or not config.get('api_secret'):
            print("ERROR: Mailjet API configuration not found or incomplete!")
            return False
        
        from_email = config.get('from_email', 'Dr. Abul Khayer (Biplob) <your-email@gmail.com>')
        admin_email = config.get('admin_email', '')

        subject_map = {
            'booked': f"New Appointment Request - {appointment.full_name}",
            'updated': f"Appointment Updated - {appointment.full_name}",
            'confirmed': f"Appointment Confirmed - Dr. Abul Khayer (Biplob)",
            'cancelled': f"Appointment Cancelled - Dr. Abul Khayer (Biplob)",
        }

        subject = subject_map.get(event_type, "Appointment Notification")
        
        # Context for templates
        context = {
            'appointment': appointment,
            'event_type': event_type,
            'formatted_id': appointment.formatted_id
        }
        
        # Render email templates
        try:
            html_message = render_to_string('emails/appointment_notification.html', context)
            plain_message = strip_tags(html_message)
        except Exception as e:
            print(f"Template rendering error: {e}")
            plain_message = f"Appointment Alert: {event_type}. ID: {appointment.formatted_id}"
            html_message = None

        # 1. Send Email to User
        if appointment.email:
            success = _send_email_via_mailjet(
                config, from_email, appointment.email, appointment.full_name,
                subject, html_message, plain_message
            )
            if not success:
                print(f"Failed to send email to user: {appointment.email}")

        # 2. Send Email to Admin
        if admin_email:
            admin_subject = f"ADMIN ALERT: {subject}"
            try:
                admin_html_message = render_to_string('emails/admin_notification.html', context)
                admin_plain_message = strip_tags(admin_html_message)
            except Exception as e:
                print(f"Admin template error: {e}")
                admin_plain_message = f"Admin Alert: {event_type}\nPatient: {appointment.full_name}\nID: {appointment.formatted_id}"
                admin_html_message = None
            
            success = _send_email_via_mailjet(
                config, from_email, admin_email, "Admin",
                admin_subject, admin_html_message, admin_plain_message
            )
            if not success:
                print(f"Failed to send email to admin: {admin_email}")
            
    except Exception as e:
        # LOG THE ERROR BUT DON'T CRASH THE SITE
        print(f"CRITICAL EMAIL ERROR: {e}")
        import traceback
        traceback.print_exc()
        return False
    
    return True


def send_password_reset_otp(user_email):
    """
    Generate and send OTP code for password reset via email using Mailjet API.
    Returns (success: bool, otp_object: PasswordResetOTP or None)
    """
    try:
        # Generate OTP
        otp = PasswordResetOTP.generate_otp(user_email)
        if not otp:
            return False, None
        
        # Get email configuration
        config = _get_mail_config()
        
        if not config or not config.get('api_key') or not config.get('api_secret'):
            print("ERROR: Mailjet API configuration not found or incomplete!")
            return False, None
        
        from_email = config.get('from_email', 'Dr. Abul Khayer (Biplob) <your-email@gmail.com>')
        
        # Prepare email content
        subject = "Password Reset OTP - Admin Panel"
        
        # Create email context
        context = {
            'otp_code': otp.otp_code,
            'user': otp.user,
            'expires_in_minutes': 10,
        }
        
        # Try to render HTML template, fallback to plain text
        try:
            html_message = render_to_string('emails/password_reset_otp.html', context)
            plain_message = strip_tags(html_message)
        except Exception as e:
            print(f"OTP email template error: {e}")
            # Fallback plain text message
            plain_message = f"""
Password Reset Request - Admin Panel

Hello {otp.user.get_full_name() or otp.user.get_username()},

You have requested to reset your password for the Admin Panel.

Your OTP code is: {otp.otp_code}

This code will expire in 10 minutes.

If you did not request this password reset, please ignore this email.

Best regards,
Dr. Biplob Admin Panel
            """.strip()
            html_message = None
        
        # Send email
        user_name = otp.user.get_full_name() or otp.user.get_username()
        success = _send_email_via_mailjet(
            config, from_email, user_email, user_name,
            subject, html_message, plain_message
        )
        
        if not success:
            print(f"Failed to send OTP email to: {user_email}")
            otp.delete()  # Delete OTP if email sending failed
            return False, None
        
        return True, otp
        
    except Exception as e:
        print(f"CRITICAL OTP EMAIL ERROR: {e}")
        import traceback
        traceback.print_exc()
        return False, None
