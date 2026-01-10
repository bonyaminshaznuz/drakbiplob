from django.db import models
from django.db.models.signals import pre_delete
from django.dispatch import receiver

class AvailableSlot(models.Model):
    date = models.DateField()
    time = models.TimeField()
    is_booked = models.BooleanField(default=False)

    class Meta:
        unique_together = ('date', 'time')
        ordering = ['date', 'time']

    def __str__(self):
        return f"{self.date} at {self.time} ({'Booked' if self.is_booked else 'Available'})"

class Appointment(models.Model):
    full_name = models.CharField(max_length=255)
    date_of_birth = models.DateField()
    phone_number = models.CharField(max_length=20)
    email = models.EmailField(blank=True, null=True)
    slot = models.OneToOneField(AvailableSlot, on_delete=models.CASCADE, related_name='appointment')
    reason = models.TextField()
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Appointment for {self.full_name} on {self.slot.date}"

    @property
    def formatted_id(self):
        if not self.id:
            return ""
        first_letter = self.full_name[0].upper() if self.full_name else 'A'
        dob_str = self.date_of_birth.strftime('%d%m%Y') if self.date_of_birth else '00000000'
        return f"{first_letter}{dob_str}{self.id}"
@receiver(pre_delete, sender=Appointment)
def release_slot_on_delete(sender, instance, **kwargs):
    if instance.slot:
        instance.slot.is_booked = False
        instance.slot.save()

class MailSetting(models.Model):
    # Mailjet API Configuration
    mailjet_api_key = models.CharField(max_length=255, help_text='Mailjet API Key')
    mailjet_api_secret = models.CharField(max_length=255, help_text='Mailjet API Secret')
    
    # Email Settings
    default_from_email = models.CharField(
        max_length=255, 
        default='Dr. Abul Khayer (Biplob) <your-email@gmail.com>',
        help_text='Format: Name <email@domain.com>'
    )
    admin_email = models.EmailField(max_length=255, help_text='Admin notification email address')

    class Meta:
        verbose_name = "Mail Setting"
        verbose_name_plural = "Mail Setting"

    def __str__(self):
        return "Mailjet API Configuration"

    def save(self, *args, **kwargs):
        # Ensure only one instance exists
        if not self.pk and MailSetting.objects.exists():
            return
        super().save(*args, **kwargs)
    
    def get_email_config(self):
        """Returns email configuration as a dictionary"""
        return {
            'api_key': self.mailjet_api_key,
            'api_secret': self.mailjet_api_secret,
            'from_email': self.default_from_email,
            'admin_email': self.admin_email,
        }