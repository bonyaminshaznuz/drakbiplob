from django.contrib import admin
from .models import AvailableSlot, Appointment, MailSetting, PasswordResetOTP

@admin.register(MailSetting)
class MailSettingAdmin(admin.ModelAdmin):
    list_display = ('mailjet_api_key', 'admin_email', 'default_from_email')
    fields = ('mailjet_api_key', 'mailjet_api_secret', 'default_from_email', 'admin_email')
    
    def has_add_permission(self, request):
        # Only allow one instance
        if self.model.objects.exists():
            return False
        return super().has_add_permission(request)

@admin.register(AvailableSlot)
class AvailableSlotAdmin(admin.ModelAdmin):
    list_display = ('date', 'time', 'is_booked')

@admin.register(PasswordResetOTP)
class PasswordResetOTPAdmin(admin.ModelAdmin):
    list_display = ('email', 'otp_code', 'created_at', 'expires_at', 'is_used', 'is_valid_display')
    list_filter = ('is_used', 'created_at')
    search_fields = ('email', 'otp_code')
    readonly_fields = ('created_at', 'expires_at')
    ordering = ['-created_at']
    
    def is_valid_display(self, obj):
        return obj.is_valid()
    is_valid_display.boolean = True
    is_valid_display.short_description = 'Is Valid'

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'phone_number', 'get_date', 'get_time', 'created_at')
    search_fields = ('full_name', 'phone_number', 'email')
    
    def get_date(self, obj):
        return obj.slot.date
    get_date.short_description = 'Date'
    
    def get_time(self, obj):
        return obj.slot.time
    get_time.short_description = 'Time'
