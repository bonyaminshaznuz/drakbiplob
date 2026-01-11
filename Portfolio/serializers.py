from rest_framework import serializers
from django.conf import settings
import os
from .models import HeroSection, Service, AboutSection, Video, Testimonial, Research, ContactSection, ServicesSection, ServicesSectionItem, NavbarSettings, FooterSettings, SiteSettings, VideoSectionSettings


def get_image_url(image_field, request=None):
    """Helper function to get absolute URL for image fields"""
    if not image_field:
        return None
    
    try:
        # Django's ImageField.url automatically includes MEDIA_URL prefix
        # e.g., returns "/media/portfolio/hero/filename.jpg"
        image_url = image_field.url
        
        if request:
            # Use request to build absolute URL (works in both dev and production)
            absolute_url = request.build_absolute_uri(image_url)
            return absolute_url
        
        # Fallback: construct URL manually using API_URL from settings
        # This is used when request context is not available
        api_url = settings.API_URL if hasattr(settings, 'API_URL') else os.getenv('API_URL', 'http://localhost:8000')
        
        # Ensure API_URL doesn't end with /
        api_url = api_url.rstrip('/')
        
        # Ensure image_url starts with / (MEDIA_URL already includes it)
        if not image_url.startswith('/'):
            image_url = f"/{image_url}"
        elif image_url.startswith('//'):
            # Handle cases where URL might have double slashes
            image_url = image_url[1:]
        
        # Construct full URL
        full_url = f"{api_url}{image_url}"
        return full_url
        
    except AttributeError as e:
        # If image_field doesn't have a url attribute
        print(f"ImageField missing url attribute: {e}")
        return None
    except Exception as e:
        # Log error for debugging but don't crash
        import logging
        logger = logging.getLogger(__name__)
        logger.error(f"Error building image URL: {e}", exc_info=True)
        return None


class HeroSectionSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = HeroSection
        fields = [
            'badge_text', 'title_line1', 'title_line2', 'description',
            'image', 'image_alt', 'video_url', 'years_experience',
            'patients_count', 'emergency_availability', 'rating'
        ]

    def get_image(self, obj):
        if obj.image:
            request = self.context.get('request')
            return get_image_url(obj.image, request)
        return None


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'icon', 'title', 'description', 'link', 'order', 'is_featured']


class AboutSectionSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = AboutSection
        fields = [
            'badge_text', 'title', 'description_paragraph1', 'description_paragraph2',
            'image', 'image_alt', 'patients_managed', 'patients_managed_description',
            'years_experience_detail', 'years_experience_description'
        ]

    def get_image(self, obj):
        if obj.image:
            request = self.context.get('request')
            return get_image_url(obj.image, request)
        return None


class VideoSerializer(serializers.ModelSerializer):
    thumbnail_url = serializers.SerializerMethodField()

    class Meta:
        model = Video
        fields = ['id', 'title', 'description', 'thumbnail_url', 'video_url', 'duration', 'order']

    def get_thumbnail_url(self, obj):
        # Return uploaded thumbnail image URL
        if obj.thumbnail:
            request = self.context.get('request')
            return get_image_url(obj.thumbnail, request)
        return None


class TestimonialSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Testimonial
        fields = ['id', 'name', 'role', 'content', 'rating', 'image_url', 'order']

    def get_image_url(self, obj):
        # Return uploaded image URL
        if obj.image:
            request = self.context.get('request')
            return get_image_url(obj.image, request)
        return None


class ResearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Research
        fields = ['id', 'title', 'publication_info', 'order']


class ContactSectionSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = ContactSection
        fields = [
            'badge_text', 'title', 'description', 'image_url', 'image_alt',
            'show_virtual_consultations', 'show_in_person_visits'
        ]

    def get_image_url(self, obj):
        # Return uploaded image URL
        if obj.image:
            request = self.context.get('request')
            return get_image_url(obj.image, request)
        return None


class ServicesSectionItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServicesSectionItem
        fields = ['id', 'icon', 'title', 'description', 'link', 'order']


class ServicesSectionSerializer(serializers.ModelSerializer):
    items = serializers.SerializerMethodField()
    
    class Meta:
        model = ServicesSection
        fields = ['badge_text', 'title', 'description', 'items']
    
    def get_items(self, obj):
        if obj:
            active_items = obj.items.filter(is_active=True).order_by('order')
            return ServicesSectionItemSerializer(active_items, many=True).data
        return []


class NavbarSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = NavbarSettings
        fields = [
            'logo_icon', 'doctor_name', 'doctor_title',
            'phone_number', 'email', 'working_hours',
            'menu_items', 'appointment_button_text', 'appointment_button_icon'
        ]


class FooterSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = FooterSettings
        fields = [
            'logo_icon', 'doctor_name', 'description',
            'address', 'phone_number', 'email', 'working_hours',
            'quick_links_title', 'quick_links',
            'services_title', 'services_links',
            'resources_title', 'resources_links',
            'social_media_title', 'facebook_url', 'twitter_url', 'linkedin_url', 'instagram_url', 'youtube_url',
            'copyright_text', 'footer_links'
        ]


class SiteSettingsSerializer(serializers.ModelSerializer):
    favicon_url = serializers.SerializerMethodField()

    class Meta:
        model = SiteSettings
        fields = ['site_title', 'favicon_url', 'site_description']

    def get_favicon_url(self, obj):
        # Return uploaded favicon URL
        if obj.favicon:
            request = self.context.get('request')
            return get_image_url(obj.favicon, request)
        return None


class VideoSectionSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoSectionSettings
        fields = ['badge_text', 'title', 'show_all_videos_link', 'show_all_videos_text']


class PortfolioDataSerializer(serializers.Serializer):
    """Combined serializer for all portfolio data"""
    hero = HeroSectionSerializer()
    services = ServiceSerializer(many=True)
    services_section = ServicesSectionSerializer()
    about = AboutSectionSerializer()
    videos = VideoSerializer(many=True)
    testimonials = TestimonialSerializer(many=True)
    research = ResearchSerializer(many=True)
    contact = ContactSectionSerializer()
    navbar = NavbarSettingsSerializer()
    footer = FooterSettingsSerializer()