from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.contrib.admin.views.decorators import staff_member_required
from .models import HeroSection, Service, AboutSection, Video, Testimonial, Research, ContactSection, ServicesSection, ServicesSectionItem, NavbarSettings, FooterSettings, SiteSettings, VideoSectionSettings
from .serializers import (
    HeroSectionSerializer, ServiceSerializer, AboutSectionSerializer,
    VideoSerializer, TestimonialSerializer, ResearchSerializer,
    ContactSectionSerializer, ServicesSectionSerializer, ServicesSectionItemSerializer, NavbarSettingsSerializer, FooterSettingsSerializer, PortfolioDataSerializer, SiteSettingsSerializer, VideoSectionSettingsSerializer
)


# API Views (for Frontend)
class HeroSectionView(generics.ListAPIView):
    """Get active hero section"""
    serializer_class = HeroSectionSerializer

    def get_queryset(self):
        return HeroSection.objects.filter(is_active=True).first()

    def list(self, request, *args, **kwargs):
        instance = self.get_queryset()
        if instance:
            serializer = self.get_serializer(instance, context={'request': request})
            return Response(serializer.data)
        return Response({}, status=status.HTTP_404_NOT_FOUND)


class ServiceListView(generics.ListAPIView):
    """Get all active services"""
    serializer_class = ServiceSerializer
    queryset = Service.objects.filter(is_active=True)

    def get_serializer_context(self):
        return {'request': self.request}


class FeaturedServiceListView(generics.ListAPIView):
    """Get featured services (for hero section)"""
    serializer_class = ServiceSerializer

    def get_queryset(self):
        return Service.objects.filter(is_active=True, is_featured=True).order_by('order')[:3]

    def get_serializer_context(self):
        return {'request': self.request}


class AboutSectionView(generics.ListAPIView):
    """Get active about section"""
    serializer_class = AboutSectionSerializer

    def get_queryset(self):
        return AboutSection.objects.filter(is_active=True).first()

    def list(self, request, *args, **kwargs):
        instance = self.get_queryset()
        if instance:
            serializer = self.get_serializer(instance, context={'request': request})
            return Response(serializer.data)
        return Response({}, status=status.HTTP_404_NOT_FOUND)


class VideoListView(generics.ListAPIView):
    """Get all active videos"""
    serializer_class = VideoSerializer
    queryset = Video.objects.filter(is_active=True).order_by('order')

    def get_serializer_context(self):
        return {'request': self.request}


class TestimonialListView(generics.ListAPIView):
    """Get all active testimonials"""
    serializer_class = TestimonialSerializer
    queryset = Testimonial.objects.filter(is_active=True).order_by('order')

    def get_serializer_context(self):
        return {'request': self.request}


class ResearchListView(generics.ListAPIView):
    """Get all active research publications"""
    serializer_class = ResearchSerializer
    queryset = Research.objects.filter(is_active=True).order_by('order')


class ContactSectionView(generics.ListAPIView):
    """Get active contact section"""
    serializer_class = ContactSectionSerializer

    def get_queryset(self):
        return ContactSection.objects.filter(is_active=True).first()

    def list(self, request, *args, **kwargs):
        instance = self.get_queryset()
        if instance:
            serializer = self.get_serializer(instance, context={'request': request})
            return Response(serializer.data)
        return Response({}, status=status.HTTP_404_NOT_FOUND)


class PortfolioDataView(APIView):
    """Get all portfolio data in one API call"""
    
    def get(self, request):
        hero = HeroSection.objects.filter(is_active=True).first()
        services = Service.objects.filter(is_active=True).order_by('order')
        services_section = ServicesSection.objects.filter(is_active=True).first()
        about = AboutSection.objects.filter(is_active=True).first()
        videos = Video.objects.filter(is_active=True).order_by('order')
        testimonials = Testimonial.objects.filter(is_active=True).order_by('order')
        research = Research.objects.filter(is_active=True).order_by('order')
        contact = ContactSection.objects.filter(is_active=True).first()
        navbar = NavbarSettings.objects.filter(is_active=True).first()
        footer = FooterSettings.objects.filter(is_active=True).first()
        site_settings = SiteSettings.objects.filter(is_active=True).first()
        video_section_settings = VideoSectionSettings.objects.filter(is_active=True).first()

        context = {'request': request}
        
        data = {
            'hero': HeroSectionSerializer(hero, context=context).data if hero else {},
            'services': ServiceSerializer(services, many=True, context=context).data,
            'featured_services': ServiceSerializer(
                services.filter(is_featured=True)[:3], many=True, context=context
            ).data,
            'services_section': ServicesSectionSerializer(services_section, context=context).data if services_section else {},
            'about': AboutSectionSerializer(about, context=context).data if about else {},
            'videos': VideoSerializer(videos, many=True, context=context).data,
            'testimonials': TestimonialSerializer(testimonials, many=True, context=context).data,
            'research': ResearchSerializer(research, many=True).data,
            'contact': ContactSectionSerializer(contact, context=context).data if contact else {},
            'navbar': NavbarSettingsSerializer(navbar).data if navbar else {},
            'footer': FooterSettingsSerializer(footer).data if footer else {},
            'site_settings': SiteSettingsSerializer(site_settings, context=context).data if site_settings else {},
            'video_section_settings': VideoSectionSettingsSerializer(video_section_settings).data if video_section_settings else {},
        }

        return Response(data, status=status.HTTP_200_OK)


# Navbar & Footer API Views
class NavbarSettingsView(APIView):
    """Get active navbar settings"""
    
    def get(self, request):
        navbar = NavbarSettings.objects.filter(is_active=True).first()
        if navbar:
            serializer = NavbarSettingsSerializer(navbar)
            return Response(serializer.data, status=status.HTTP_200_OK)
        # Return default structure if no settings exist
        return Response({
            'logo_icon': 'fas fa-stethoscope',
            'doctor_name': 'Dr. Abul Khayer (Biplob)',
            'doctor_title': 'Anaesthetist, Intensivist & Pain Physician',
            'phone_number': '+8801762037234',
            'email': 'akbiplob36@gmail.com',
            'working_hours': 'Mon - Fri: 9:00 AM - 6:00 PM',
            'appointment_button_text': 'Book Appointment',
            'appointment_button_icon': 'fas fa-calendar-check'
        }, status=status.HTTP_200_OK)


class FooterSettingsView(APIView):
    """Get active footer settings"""
    
    def get(self, request):
        footer = FooterSettings.objects.filter(is_active=True).first()
        if footer:
            serializer = FooterSettingsSerializer(footer)
            return Response(serializer.data, status=status.HTTP_200_OK)
        # Return default structure if no settings exist
        return Response({
            'logo_icon': 'fas fa-stethoscope',
            'doctor_name': 'Dr. Abul Khayer (Biplob)',
            'description': 'Dedicated to providing expert anaesthesia, intensive care, pain management, and diabetology services with personalized treatment plans.',
            'address': 'Dhaka, Bangladesh',
            'phone_number': '+8801762037234',
            'email': 'akbiplob36@gmail.com',
            'working_hours': 'Mon - Fri: 9:00 AM - 6:00 PM',
            'footer_sections': [
                {
                    'title': 'Quick Links',
                    'links': [
                        {'label': 'Home', 'href': '/'},
                        {'label': 'About Doctor', 'href': '/#about'},
                        {'label': 'Services', 'href': '/#services'},
                        {'label': 'Blog', 'href': '/#blog'},
                        {'label': 'Contact', 'href': '/#contact'}
                    ]
                },
                {
                    'title': 'Our Services',
                    'links': [
                        {'label': 'Anaesthesia', 'href': '#'},
                        {'label': 'Intensive Care', 'href': '#'},
                        {'label': 'Pain Management', 'href': '#'},
                        {'label': 'Diabetology', 'href': '#'},
                        {'label': 'Consultation', 'href': '#'}
                    ]
                },
                {
                    'title': 'Patient Resources',
                    'links': [
                        {'label': 'Educational Videos', 'href': '/#blog'},
                        {'label': 'FAQ', 'href': '#'},
                        {'label': 'Research Papers', 'href': '#'},
                        {'label': 'Book Appointment', 'href': '/appointment'}
                    ]
                }
            ],
            'social_media_title': 'Follow Us',
            'copyright_text': 'Copyright © 2025 Dr. Abul Khayer (Biplob). All rights reserved.'
        }, status=status.HTTP_200_OK)


class SiteSettingsView(APIView):
    """Get active site settings including favicon"""
    
    def get(self, request):
        site_settings = SiteSettings.objects.filter(is_active=True).first()
        if site_settings:
            serializer = SiteSettingsSerializer(site_settings, context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        # Return default if no settings exist
        return Response({
            'site_title': 'Dr. Abul Khayer (Biplob)',
            'favicon_url': None,
            'site_description': None
        }, status=status.HTTP_200_OK)


# Admin Template Views (Protected)
@staff_member_required
def admin_portfolio_dashboard(request):
    """Portfolio management dashboard"""
    context = {
        'hero_count': HeroSection.objects.count(),
        'service_count': Service.objects.count(),
        'services_section_count': ServicesSection.objects.count(),
        'video_count': Video.objects.count(),
        'testimonial_count': Testimonial.objects.count(),
        'research_count': Research.objects.count(),
        'about_count': AboutSection.objects.count(),
        'contact_count': ContactSection.objects.count(),
    }
    return render(request, 'portfolio/dashboard.html', context)


# Hero Section CRUD
@staff_member_required
def admin_hero_list(request):
    heroes = HeroSection.objects.all().order_by('-is_active', '-created_at')
    return render(request, 'portfolio/hero_list.html', {'heroes': heroes})


@staff_member_required
def admin_hero_create(request):
    if request.method == 'POST':
        hero = HeroSection()
        hero.badge_text = request.POST.get('badge_text', '')
        hero.title_line1 = request.POST.get('title_line1', '')
        hero.title_line2 = request.POST.get('title_line2', '')
        hero.description = request.POST.get('description', '')
        hero.image_alt = request.POST.get('image_alt', '')
        hero.video_url = request.POST.get('video_url', '')
        hero.years_experience = request.POST.get('years_experience', '')
        hero.patients_count = request.POST.get('patients_count', '')
        hero.emergency_availability = request.POST.get('emergency_availability', '')
        hero.rating = request.POST.get('rating', 4.9)
        hero.is_active = request.POST.get('is_active') == 'on'
        if 'image' in request.FILES:
            hero.image = request.FILES['image']
        hero.save()
        messages.success(request, 'Hero section created successfully!')
        return redirect('admin-hero-list')
    return render(request, 'portfolio/hero_form.html', {'action': 'Create'})


@staff_member_required
def admin_hero_edit(request, pk):
    hero = get_object_or_404(HeroSection, pk=pk)
    if request.method == 'POST':
        hero.badge_text = request.POST.get('badge_text', '')
        hero.title_line1 = request.POST.get('title_line1', '')
        hero.title_line2 = request.POST.get('title_line2', '')
        hero.description = request.POST.get('description', '')
        hero.image_alt = request.POST.get('image_alt', '')
        hero.video_url = request.POST.get('video_url', '')
        hero.years_experience = request.POST.get('years_experience', '')
        hero.patients_count = request.POST.get('patients_count', '')
        hero.emergency_availability = request.POST.get('emergency_availability', '')
        hero.rating = request.POST.get('rating', 4.9)
        hero.is_active = request.POST.get('is_active') == 'on'
        if 'image' in request.FILES:
            hero.image = request.FILES['image']
        hero.save()
        messages.success(request, 'Hero section updated successfully!')
        return redirect('admin-hero-list')
    return render(request, 'portfolio/hero_form.html', {'hero': hero, 'action': 'Edit'})


@staff_member_required
def admin_hero_delete(request, pk):
    hero = get_object_or_404(HeroSection, pk=pk)
    if request.method == 'POST':
        hero.delete()
        messages.success(request, 'Hero section deleted successfully!')
        return redirect('admin-hero-list')
    return render(request, 'portfolio/hero_confirm_delete.html', {'hero': hero})


# Service CRUD
@staff_member_required
def admin_service_list(request):
    services = Service.objects.all().order_by('order', 'title')
    return render(request, 'portfolio/service_list.html', {'services': services})


@staff_member_required
def admin_service_create(request):
    if request.method == 'POST':
        service = Service()
        service.icon = request.POST.get('icon', '')
        service.title = request.POST.get('title', '')
        service.description = request.POST.get('description', '')
        service.link = request.POST.get('link', '')
        service.order = int(request.POST.get('order', 0))
        service.is_featured = request.POST.get('is_featured') == 'on'
        service.is_active = request.POST.get('is_active') == 'on'
        service.save()
        messages.success(request, 'Service created successfully!')
        return redirect('admin-service-list')
    return render(request, 'portfolio/service_form.html', {'action': 'Create'})


@staff_member_required
def admin_service_edit(request, pk):
    service = get_object_or_404(Service, pk=pk)
    if request.method == 'POST':
        service.icon = request.POST.get('icon', '')
        service.title = request.POST.get('title', '')
        service.description = request.POST.get('description', '')
        service.link = request.POST.get('link', '')
        service.order = int(request.POST.get('order', 0))
        service.is_featured = request.POST.get('is_featured') == 'on'
        service.is_active = request.POST.get('is_active') == 'on'
        service.save()
        messages.success(request, 'Service updated successfully!')
        return redirect('admin-service-list')
    return render(request, 'portfolio/service_form.html', {'service': service, 'action': 'Edit'})


@staff_member_required
def admin_service_delete(request, pk):
    service = get_object_or_404(Service, pk=pk)
    if request.method == 'POST':
        service.delete()
        messages.success(request, 'Service deleted successfully!')
        return redirect('admin-service-list')
    return render(request, 'portfolio/service_confirm_delete.html', {'service': service})


# About Section CRUD
@staff_member_required
def admin_about_list(request):
    abouts = AboutSection.objects.all().order_by('-is_active', '-created_at')
    return render(request, 'portfolio/about_list.html', {'abouts': abouts})


@staff_member_required
def admin_about_create(request):
    if request.method == 'POST':
        about = AboutSection()
        about.badge_text = request.POST.get('badge_text', '')
        about.title = request.POST.get('title', '')
        about.description_paragraph1 = request.POST.get('description_paragraph1', '')
        about.description_paragraph2 = request.POST.get('description_paragraph2', '')
        about.image_alt = request.POST.get('image_alt', '')
        about.patients_managed = request.POST.get('patients_managed', '')
        about.patients_managed_description = request.POST.get('patients_managed_description', '')
        about.years_experience_detail = request.POST.get('years_experience_detail', '')
        about.years_experience_description = request.POST.get('years_experience_description', '')
        about.is_active = request.POST.get('is_active') == 'on'
        if 'image' in request.FILES:
            about.image = request.FILES['image']
        about.save()
        messages.success(request, 'About section created successfully!')
        return redirect('admin-about-list')
    return render(request, 'portfolio/about_form.html', {'action': 'Create'})


@staff_member_required
def admin_about_edit(request, pk):
    about = get_object_or_404(AboutSection, pk=pk)
    if request.method == 'POST':
        about.badge_text = request.POST.get('badge_text', '')
        about.title = request.POST.get('title', '')
        about.description_paragraph1 = request.POST.get('description_paragraph1', '')
        about.description_paragraph2 = request.POST.get('description_paragraph2', '')
        about.image_alt = request.POST.get('image_alt', '')
        about.patients_managed = request.POST.get('patients_managed', '')
        about.patients_managed_description = request.POST.get('patients_managed_description', '')
        about.years_experience_detail = request.POST.get('years_experience_detail', '')
        about.years_experience_description = request.POST.get('years_experience_description', '')
        about.is_active = request.POST.get('is_active') == 'on'
        if 'image' in request.FILES:
            about.image = request.FILES['image']
        about.save()
        messages.success(request, 'About section updated successfully!')
        return redirect('admin-about-list')
    return render(request, 'portfolio/about_form.html', {'about': about, 'action': 'Edit'})


@staff_member_required
def admin_about_delete(request, pk):
    about = get_object_or_404(AboutSection, pk=pk)
    if request.method == 'POST':
        about.delete()
        messages.success(request, 'About section deleted successfully!')
        return redirect('admin-about-list')
    return render(request, 'portfolio/about_confirm_delete.html', {'about': about})


# Video CRUD
@staff_member_required
def admin_video_list(request):
    videos = Video.objects.all().order_by('order', '-created_at')
    return render(request, 'portfolio/video_list.html', {'videos': videos})


@staff_member_required
def admin_video_create(request):
    if request.method == 'POST':
        video = Video()
        video.title = request.POST.get('title', '')
        video.description = request.POST.get('description', '')
        video.video_url = request.POST.get('video_url', '')
        video.duration = request.POST.get('duration', '05 MINS')
        video.order = int(request.POST.get('order', 0))
        video.is_active = request.POST.get('is_active') == 'on'
        if 'thumbnail' in request.FILES:
            video.thumbnail = request.FILES['thumbnail']
        video.save()
        messages.success(request, 'Video created successfully!')
        return redirect('admin-video-list')
    return render(request, 'portfolio/video_form.html', {'action': 'Create'})


@staff_member_required
def admin_video_edit(request, pk):
    video = get_object_or_404(Video, pk=pk)
    if request.method == 'POST':
        video.title = request.POST.get('title', '')
        video.description = request.POST.get('description', '')
        video.video_url = request.POST.get('video_url', '')
        video.duration = request.POST.get('duration', '05 MINS')
        video.order = int(request.POST.get('order', 0))
        video.is_active = request.POST.get('is_active') == 'on'
        if 'thumbnail' in request.FILES:
            video.thumbnail = request.FILES['thumbnail']
        video.save()
        messages.success(request, 'Video updated successfully!')
        return redirect('admin-video-list')
    return render(request, 'portfolio/video_form.html', {'video': video, 'action': 'Edit'})


@staff_member_required
def admin_video_delete(request, pk):
    video = get_object_or_404(Video, pk=pk)
    if request.method == 'POST':
        video.delete()
        messages.success(request, 'Video deleted successfully!')
        return redirect('admin-video-list')
    return render(request, 'portfolio/video_confirm_delete.html', {'video': video})


# Testimonial CRUD
@staff_member_required
def admin_testimonial_list(request):
    testimonials = Testimonial.objects.all().order_by('order', '-created_at')
    return render(request, 'portfolio/testimonial_list.html', {'testimonials': testimonials})


@staff_member_required
def admin_testimonial_create(request):
    if request.method == 'POST':
        testimonial = Testimonial()
        testimonial.name = request.POST.get('name', '')
        testimonial.role = request.POST.get('role', '')
        testimonial.content = request.POST.get('content', '')
        testimonial.rating = int(request.POST.get('rating', 5))
        testimonial.order = int(request.POST.get('order', 0))
        testimonial.is_active = request.POST.get('is_active') == 'on'
        if 'image' in request.FILES:
            testimonial.image = request.FILES['image']
        testimonial.save()
        messages.success(request, 'Testimonial created successfully!')
        return redirect('admin-testimonial-list')
    return render(request, 'portfolio/testimonial_form.html', {'action': 'Create'})


@staff_member_required
def admin_testimonial_edit(request, pk):
    testimonial = get_object_or_404(Testimonial, pk=pk)
    if request.method == 'POST':
        testimonial.name = request.POST.get('name', '')
        testimonial.role = request.POST.get('role', '')
        testimonial.content = request.POST.get('content', '')
        testimonial.rating = int(request.POST.get('rating', 5))
        testimonial.order = int(request.POST.get('order', 0))
        testimonial.is_active = request.POST.get('is_active') == 'on'
        if 'image' in request.FILES:
            testimonial.image = request.FILES['image']
        testimonial.save()
        messages.success(request, 'Testimonial updated successfully!')
        return redirect('admin-testimonial-list')
    return render(request, 'portfolio/testimonial_form.html', {'testimonial': testimonial, 'action': 'Edit'})


@staff_member_required
def admin_testimonial_delete(request, pk):
    testimonial = get_object_or_404(Testimonial, pk=pk)
    if request.method == 'POST':
        testimonial.delete()
        messages.success(request, 'Testimonial deleted successfully!')
        return redirect('admin-testimonial-list')
    return render(request, 'portfolio/testimonial_confirm_delete.html', {'testimonial': testimonial})


# Research CRUD
@staff_member_required
def admin_research_list(request):
    researches = Research.objects.all().order_by('order', '-created_at')
    return render(request, 'portfolio/research_list.html', {'researches': researches})


@staff_member_required
def admin_research_create(request):
    if request.method == 'POST':
        research = Research()
        research.title = request.POST.get('title', '')
        research.publication_info = request.POST.get('publication_info', '')
        research.order = int(request.POST.get('order', 0))
        research.is_active = request.POST.get('is_active') == 'on'
        research.save()
        messages.success(request, 'Research publication created successfully!')
        return redirect('admin-research-list')
    return render(request, 'portfolio/research_form.html', {'action': 'Create'})


@staff_member_required
def admin_research_edit(request, pk):
    research = get_object_or_404(Research, pk=pk)
    if request.method == 'POST':
        research.title = request.POST.get('title', '')
        research.publication_info = request.POST.get('publication_info', '')
        research.order = int(request.POST.get('order', 0))
        research.is_active = request.POST.get('is_active') == 'on'
        research.save()
        messages.success(request, 'Research publication updated successfully!')
        return redirect('admin-research-list')
    return render(request, 'portfolio/research_form.html', {'research': research, 'action': 'Edit'})


@staff_member_required
def admin_research_delete(request, pk):
    research = get_object_or_404(Research, pk=pk)
    if request.method == 'POST':
        research.delete()
        messages.success(request, 'Research publication deleted successfully!')
        return redirect('admin-research-list')
    return render(request, 'portfolio/research_confirm_delete.html', {'research': research})


# Contact Section CRUD
@staff_member_required
def admin_contact_list(request):
    contacts = ContactSection.objects.all().order_by('-is_active', '-created_at')
    return render(request, 'portfolio/contact_list.html', {'contacts': contacts})


@staff_member_required
def admin_contact_create(request):
    if request.method == 'POST':
        contact = ContactSection()
        contact.badge_text = request.POST.get('badge_text', '')
        contact.title = request.POST.get('title', '')
        contact.description = request.POST.get('description', '')
        contact.image_alt = request.POST.get('image_alt', '')
        contact.show_virtual_consultations = request.POST.get('show_virtual_consultations') == 'on'
        contact.show_in_person_visits = request.POST.get('show_in_person_visits') == 'on'
        contact.is_active = request.POST.get('is_active') == 'on'
        if 'image' in request.FILES:
            contact.image = request.FILES['image']
        contact.save()
        messages.success(request, 'Contact section created successfully!')
        return redirect('admin-contact-list')
    return render(request, 'portfolio/contact_form.html', {'action': 'Create'})


@staff_member_required
def admin_contact_edit(request, pk):
    contact = get_object_or_404(ContactSection, pk=pk)
    if request.method == 'POST':
        contact.badge_text = request.POST.get('badge_text', '')
        contact.title = request.POST.get('title', '')
        contact.description = request.POST.get('description', '')
        contact.image_alt = request.POST.get('image_alt', '')
        contact.show_virtual_consultations = request.POST.get('show_virtual_consultations') == 'on'
        contact.show_in_person_visits = request.POST.get('show_in_person_visits') == 'on'
        contact.is_active = request.POST.get('is_active') == 'on'
        if 'image' in request.FILES:
            contact.image = request.FILES['image']
        contact.save()
        messages.success(request, 'Contact section updated successfully!')
        return redirect('admin-contact-list')
    return render(request, 'portfolio/contact_form.html', {'contact': contact, 'action': 'Edit'})


@staff_member_required
def admin_contact_delete(request, pk):
    contact = get_object_or_404(ContactSection, pk=pk)
    if request.method == 'POST':
        contact.delete()
        messages.success(request, 'Contact section deleted successfully!')
        return redirect('admin-contact-list')
    return render(request, 'portfolio/contact_confirm_delete.html', {'contact': contact})


# Services Section CRUD
@staff_member_required
def admin_services_section_list(request):
    services_sections = ServicesSection.objects.all().order_by('-is_active', '-created_at')
    return render(request, 'portfolio/services_section_list.html', {'services_sections': services_sections})


@staff_member_required
def admin_services_section_create(request):
    if request.method == 'POST':
        services_section = ServicesSection()
        services_section.badge_text = request.POST.get('badge_text', '')
        services_section.title = request.POST.get('title', '')
        services_section.description = request.POST.get('description', '')
        services_section.is_active = request.POST.get('is_active') == 'on'
        services_section.save()
        messages.success(request, 'Services section created successfully!')
        return redirect('admin-services-section-list')
    return render(request, 'portfolio/services_section_form.html', {'action': 'Create'})


@staff_member_required
def admin_services_section_edit(request, pk):
    services_section = get_object_or_404(ServicesSection, pk=pk)
    if request.method == 'POST':
        services_section.badge_text = request.POST.get('badge_text', '')
        services_section.title = request.POST.get('title', '')
        services_section.description = request.POST.get('description', '')
        services_section.is_active = request.POST.get('is_active') == 'on'
        services_section.save()
        messages.success(request, 'Services section updated successfully!')
        return redirect('admin-services-section-list')
    return render(request, 'portfolio/services_section_form.html', {'services_section': services_section, 'action': 'Edit'})


@staff_member_required
def admin_services_section_delete(request, pk):
    services_section = get_object_or_404(ServicesSection, pk=pk)
    if request.method == 'POST':
        services_section.delete()
        messages.success(request, 'Services section deleted successfully!')
        return redirect('admin-services-section-list')
    return render(request, 'portfolio/services_section_confirm_delete.html', {'services_section': services_section})


# Services Section Items CRUD
@staff_member_required
def admin_services_section_item_list(request, section_pk):
    services_section = get_object_or_404(ServicesSection, pk=section_pk)
    items = ServicesSectionItem.objects.filter(services_section=services_section).order_by('order')
    return render(request, 'portfolio/services_section_item_list.html', {
        'services_section': services_section,
        'items': items
    })


@staff_member_required
def admin_services_section_item_create(request, section_pk):
    services_section = get_object_or_404(ServicesSection, pk=section_pk)
    if request.method == 'POST':
        item = ServicesSectionItem()
        item.services_section = services_section
        item.icon = request.POST.get('icon', '')
        item.title = request.POST.get('title', '')
        item.description = request.POST.get('description', '')
        item.link = request.POST.get('link', '') or None
        item.order = int(request.POST.get('order', 0))
        item.is_active = request.POST.get('is_active') == 'on'
        item.save()
        messages.success(request, 'Services section item created successfully!')
        return redirect('admin-services-section-item-list', section_pk=section_pk)
    return render(request, 'portfolio/services_section_item_form.html', {
        'services_section': services_section,
        'item': None,
        'action': 'Create'
    })


@staff_member_required
def admin_services_section_item_edit(request, section_pk, item_pk):
    services_section = get_object_or_404(ServicesSection, pk=section_pk)
    item = get_object_or_404(ServicesSectionItem, pk=item_pk, services_section=services_section)
    if request.method == 'POST':
        item.icon = request.POST.get('icon', '')
        item.title = request.POST.get('title', '')
        item.description = request.POST.get('description', '')
        item.link = request.POST.get('link', '') or None
        item.order = int(request.POST.get('order', 0))
        item.is_active = request.POST.get('is_active') == 'on'
        item.save()
        messages.success(request, 'Services section item updated successfully!')
        return redirect('admin-services-section-item-list', section_pk=section_pk)
    return render(request, 'portfolio/services_section_item_form.html', {
        'services_section': services_section,
        'item': item,
        'action': 'Edit'
    })


@staff_member_required
def admin_services_section_item_delete(request, section_pk, item_pk):
    services_section = get_object_or_404(ServicesSection, pk=section_pk)
    item = get_object_or_404(ServicesSectionItem, pk=item_pk, services_section=services_section)
    if request.method == 'POST':
        item.delete()
        messages.success(request, 'Services section item deleted successfully!')
        return redirect('admin-services-section-item-list', section_pk=section_pk)
    return render(request, 'portfolio/services_section_item_confirm_delete.html', {
        'services_section': services_section,
        'item': item
    })


# Navbar Settings CRUD
@staff_member_required
def admin_navbar_edit(request):
    navbar = NavbarSettings.objects.first()
    if not navbar:
        navbar = NavbarSettings()
        navbar.save()

    if request.method == 'POST':
        navbar.logo_icon = request.POST.get('logo_icon', '')
        navbar.doctor_name = request.POST.get('doctor_name', '')
        navbar.doctor_title = request.POST.get('doctor_title', '')
        navbar.phone_number = request.POST.get('phone_number', '')
        navbar.email = request.POST.get('email', '')
        navbar.working_hours = request.POST.get('working_hours', '')
        
        navbar.appointment_button_text = request.POST.get('appointment_button_text', '')
        navbar.appointment_button_icon = request.POST.get('appointment_button_icon', '')
        navbar.is_active = request.POST.get('is_active') == 'on'
        navbar.save()
        messages.success(request, 'Navbar settings updated successfully!')
        return redirect('admin-navbar-edit')
    
    navbar_data = {
        'navbar': navbar
    }
    return render(request, 'portfolio/navbar_form.html', navbar_data)


# Footer Settings CRUD
@staff_member_required
def admin_footer_edit(request):
    footer = FooterSettings.objects.first()
    if not footer:
        footer = FooterSettings()
        footer.save()

    if request.method == 'POST':
        footer.logo_icon = request.POST.get('logo_icon', '')
        footer.doctor_name = request.POST.get('doctor_name', '')
        footer.description = request.POST.get('description', '')
        footer.address = request.POST.get('address', '')
        footer.phone_number = request.POST.get('phone_number', '')
        footer.email = request.POST.get('email', '')
        footer.working_hours = request.POST.get('working_hours', '')
        
        social_media_title = request.POST.get('social_media_title', '')
        
        # Parse footer sections JSON
        import json
        footer_sections_json = request.POST.get('footer_sections', '[]') or '[]'
        
        try:
            footer.footer_sections = json.loads(footer_sections_json) if footer_sections_json and footer_sections_json.strip() else []
        except json.JSONDecodeError as e:
            footer.footer_sections = []
        except Exception as e:
            footer.footer_sections = []
        
        footer.social_media_title = social_media_title
        footer.facebook_url = request.POST.get('facebook_url', '')
        footer.twitter_url = request.POST.get('twitter_url', '')
        footer.linkedin_url = request.POST.get('linkedin_url', '')
        footer.instagram_url = request.POST.get('instagram_url', '')
        footer.youtube_url = request.POST.get('youtube_url', '')
        footer.copyright_text = request.POST.get('copyright_text', '')
        footer.is_active = request.POST.get('is_active') == 'on'
        footer.save()
        messages.success(request, 'Footer settings updated successfully!')
        return redirect('admin-footer-edit')
    
    import json
    # Convert JSON fields to strings for template
    footer_data = {
        'footer': footer,
        'footer_sections_json': json.dumps(footer.footer_sections if footer.footer_sections else [], indent=2, ensure_ascii=False),
    }
    return render(request, 'portfolio/footer_form.html', footer_data)


# Site Settings CRUD
@staff_member_required
def admin_site_settings_edit(request):
    site_settings = SiteSettings.objects.first()
    if not site_settings:
        site_settings = SiteSettings()
        site_settings.save()

    if request.method == 'POST':
        site_settings.site_title = request.POST.get('site_title', '')
        site_settings.site_description = request.POST.get('site_description', '')
        site_settings.is_active = request.POST.get('is_active') == 'on'
        if 'favicon' in request.FILES:
            site_settings.favicon = request.FILES['favicon']
        site_settings.save()
        messages.success(request, 'Site settings updated successfully!')
        return redirect('admin-site-settings-edit')
    
    return render(request, 'portfolio/site_settings_form.html', {'site_settings': site_settings})
