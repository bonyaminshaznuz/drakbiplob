from django.contrib import admin
from .models import AvailableSlot, Appointment, MailSetting

@admin.register(MailSetting)
class MailSettingAdmin(admin.ModelAdmin):
    list_display = ('email_host', 'email_port', 'email_host_user', 'admin_email')
    
    def has_add_permission(self, request):
        # Only allow one instance
        if self.model.objects.exists():
            return False
        return super().has_add_permission(request)

@admin.register(AvailableSlot)
class AvailableSlotAdmin(admin.ModelAdmin):
    list_display = ('date', 'time', 'is_booked')
    list_filter = ('date', 'is_booked')
    search_fields = ('date',)

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
