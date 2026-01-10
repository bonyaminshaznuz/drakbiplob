from rest_framework import serializers
from .models import HeroSection, Service, AboutSection, Video, Testimonial, Research, ContactSection, NavbarSettings, FooterSettings


class HeroSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroSection
        fields = [
            'badge_text', 'title_line1', 'title_line2', 'description',
            'image', 'image_alt', 'video_url', 'years_experience',
            'patients_count', 'emergency_availability', 'rating'
        ]


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'icon', 'title', 'description', 'link', 'order', 'is_featured']


class AboutSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutSection
        fields = [
            'badge_text', 'title', 'description_paragraph1', 'description_paragraph2',
            'image', 'image_alt', 'patients_managed', 'patients_managed_description',
            'years_experience_detail', 'years_experience_description'
        ]


class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ['id', 'title', 'description', 'thumbnail_url', 'video_url', 'duration', 'order']


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ['id', 'name', 'role', 'content', 'rating', 'image_url', 'order']


class ResearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Research
        fields = ['id', 'title', 'publication_info', 'order']


class ContactSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSection
        fields = [
            'badge_text', 'title', 'description', 'image_url', 'image_alt',
            'show_virtual_consultations', 'show_in_person_visits'
        ]


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


class PortfolioDataSerializer(serializers.Serializer):
    """Combined serializer for all portfolio data"""
    hero = HeroSectionSerializer()
    services = ServiceSerializer(many=True)
    about = AboutSectionSerializer()
    videos = VideoSerializer(many=True)
    testimonials = TestimonialSerializer(many=True)
    research = ResearchSerializer(many=True)
    contact = ContactSectionSerializer()
    navbar = NavbarSettingsSerializer()
    footer = FooterSettingsSerializer()