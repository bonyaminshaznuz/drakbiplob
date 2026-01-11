from django.contrib import admin
from .models import HeroSection, Service, AboutSection, Video, Testimonial, Research, ContactSection, ServicesSection, NavbarSettings, FooterSettings, SiteSettings


@admin.register(HeroSection)
class HeroSectionAdmin(admin.ModelAdmin):
    list_display = ['title_line1', 'title_line2', 'rating', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['title_line1', 'title_line2', 'description']


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ['title', 'icon', 'order', 'is_featured', 'is_active', 'created_at']
    list_filter = ['is_featured', 'is_active', 'created_at']
    search_fields = ['title', 'description']
    ordering = ['order']
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'description', 'icon', 'link', 'order')
        }),
        ('Display Options', {
            'fields': ('is_featured', 'is_active')
        }),
    )
    help_texts = {
        'icon': 'Enter Font Awesome icon class (e.g., fas fa-syringe, fas fa-heartbeat, fas fa-hand-holding-medical). Browse icons at: https://fontawesome.com/icons',
    }


@admin.register(AboutSection)
class AboutSectionAdmin(admin.ModelAdmin):
    list_display = ['title', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']


@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
    list_display = ['title', 'duration', 'order', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['title', 'description']
    ordering = ['order']


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ['name', 'role', 'rating', 'order', 'is_active', 'created_at']
    list_filter = ['rating', 'is_active', 'created_at']
    search_fields = ['name', 'role', 'content']
    ordering = ['order']


@admin.register(Research)
class ResearchAdmin(admin.ModelAdmin):
    list_display = ['title', 'publication_info', 'order', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['title', 'publication_info']
    ordering = ['order']


@admin.register(ContactSection)
class ContactSectionAdmin(admin.ModelAdmin):
    list_display = ['title', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']


@admin.register(ServicesSection)
class ServicesSectionAdmin(admin.ModelAdmin):
    list_display = ['title', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']


@admin.register(NavbarSettings)
class NavbarSettingsAdmin(admin.ModelAdmin):
    list_display = ['doctor_name', 'phone_number', 'email', 'is_active', 'updated_at']
    list_filter = ['is_active', 'updated_at']
    search_fields = ['doctor_name', 'doctor_title', 'phone_number', 'email']


@admin.register(FooterSettings)
class FooterSettingsAdmin(admin.ModelAdmin):
    list_display = ['doctor_name', 'phone_number', 'email', 'is_active', 'updated_at']
    list_filter = ['is_active', 'updated_at']
    search_fields = ['doctor_name', 'address', 'phone_number', 'email']


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    list_display = ['site_title', 'is_active', 'updated_at']
    list_filter = ['is_active', 'updated_at']
    search_fields = ['site_title', 'site_description']
    
    def has_add_permission(self, request):
        # Only allow one instance
        return not SiteSettings.objects.exists()
    
    def has_delete_permission(self, request, obj=None):
        return False  # Don't allow deletion
