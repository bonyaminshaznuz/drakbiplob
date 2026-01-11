from django.db import models


class HeroSection(models.Model):
    badge_text = models.CharField(max_length=100, default="Top Rated Specialist")
    title_line1 = models.CharField(max_length=200, default="Your Health,")
    title_line2 = models.CharField(max_length=200, default="Our Priority")
    description = models.TextField(default="Expert care in Anaesthesiology, ICU, and Pain Management. Dedicated to providing compassionate tailored medical services.")
    image = models.ImageField(upload_to='portfolio/hero/', blank=True, null=True)
    image_alt = models.CharField(max_length=200, default="Dr. Abul Khayer")
    video_url = models.URLField(blank=True, null=True, help_text="Optional video URL for Watch Video button")
    
    # Stats
    years_experience = models.CharField(max_length=50, default="12+")
    patients_count = models.CharField(max_length=50, default="5k+")
    emergency_availability = models.CharField(max_length=50, default="24/7")
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=4.9)
    
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Hero Section"
        verbose_name_plural = "Hero Section"
        ordering = ['-is_active', '-created_at']

    def __str__(self):
        return f"Hero Section - {self.title_line1} {self.title_line2}"


class Service(models.Model):
    icon = models.CharField(max_length=50, help_text="Font Awesome icon class (e.g., 'fas fa-syringe')")
    title = models.CharField(max_length=200)
    description = models.TextField()
    link = models.URLField(blank=True, null=True)
    order = models.IntegerField(default=0, help_text="Display order")
    is_featured = models.BooleanField(default=False, help_text="Show in hero section services")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'title']

    def __str__(self):
        return self.title


class AboutSection(models.Model):
    badge_text = models.CharField(max_length=100, default="About Me")
    title = models.CharField(max_length=200, default="Professional Summary")
    description_paragraph1 = models.TextField()
    description_paragraph2 = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='portfolio/about/', blank=True, null=True)
    image_alt = models.CharField(max_length=200, default="Doctor with patient")
    
    # Stats
    patients_managed = models.CharField(max_length=50, default="50+")
    patients_managed_description = models.TextField(default="Successfully managed anaesthesia and critical care for thousands of patients.")
    years_experience_detail = models.CharField(max_length=50, default="2+")
    years_experience_description = models.TextField(default="Years of expertise in anaesthesiology, ICU management, and pain treatment.")
    
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "About Section"
        verbose_name_plural = "About Section"

    def __str__(self):
        return "About Section"


class Video(models.Model):
    title = models.CharField(max_length=300)
    description = models.TextField()
    thumbnail = models.ImageField(upload_to='portfolio/videos/', blank=True, null=True, help_text="Upload thumbnail image")
    video_url = models.URLField(blank=True, null=True)
    duration = models.CharField(max_length=20, default="05 MINS")
    order = models.IntegerField(default=0, help_text="Display order")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', '-created_at']

    def __str__(self):
        return self.title


class VideoSectionSettings(models.Model):
    """Settings for the Educational Videos section"""
    badge_text = models.CharField(max_length=100, default="Educational Videos")
    title = models.CharField(max_length=300, default="Watch: My Promise to You")
    show_all_videos_link = models.URLField(
        blank=True, 
        null=True, 
        help_text="Link for 'Show All Videos' button (e.g., YouTube channel, external page, or /#blog for same page)"
    )
    show_all_videos_text = models.CharField(max_length=100, default="Show All Videos")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Video Section Settings"
        verbose_name_plural = "Video Section Settings"

    def __str__(self):
        return "Video Section Settings"
    
    def save(self, *args, **kwargs):
        # Ensure only one instance exists
        if not self.pk and VideoSectionSettings.objects.exists():
            return
        super().save(*args, **kwargs)


class Testimonial(models.Model):
    name = models.CharField(max_length=200)
    role = models.CharField(max_length=200, help_text="e.g., Surgical Patient, ICU Patient")
    content = models.TextField()
    rating = models.IntegerField(default=5, choices=[(i, i) for i in range(1, 6)])
    image = models.ImageField(upload_to='portfolio/testimonials/', blank=True, null=True, help_text="Upload profile image")
    order = models.IntegerField(default=0, help_text="Display order")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', '-created_at']

    def __str__(self):
        return f"{self.name} - {self.role}"


class Research(models.Model):
    title = models.CharField(max_length=500)
    publication_info = models.CharField(max_length=300, help_text="e.g., Published in Journal of Oncology, 2024")
    order = models.IntegerField(default=0, help_text="Display order")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Research & Publications"
        ordering = ['order', '-created_at']

    def __str__(self):
        return self.title


class ContactSection(models.Model):
    badge_text = models.CharField(max_length=100, default="Book Now")
    title = models.CharField(max_length=300, default="Schedule a Virtual or In-Personal Appointment Today")
    description = models.TextField()
    image = models.ImageField(upload_to='portfolio/contact/', blank=True, null=True, help_text="Upload image")
    image_alt = models.CharField(max_length=200, default="Doctor consultation")
    show_virtual_consultations = models.BooleanField(default=True)
    show_in_person_visits = models.BooleanField(default=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Contact/CTA Section"
        verbose_name_plural = "Contact/CTA Section"

    def __str__(self):
        return "Contact Section"


class ServicesSection(models.Model):
    badge_text = models.CharField(max_length=100, default="✦ Specialized Care")
    title = models.CharField(max_length=300, default="Specialized Medical Services")
    description = models.TextField(default="Delivering evidence-based treatment with compassion and clinical excellence.")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Services Section"
        verbose_name_plural = "Services Section"

    def __str__(self):
        return "Services Section"


class ServicesSectionItem(models.Model):
    services_section = models.ForeignKey(ServicesSection, on_delete=models.CASCADE, related_name='items')
    icon = models.CharField(max_length=50, help_text="Font Awesome icon class (e.g., 'fas fa-syringe')")
    title = models.CharField(max_length=200)
    description = models.TextField()
    link = models.URLField(blank=True, null=True)
    order = models.IntegerField(default=0, help_text="Display order")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Services Section Item"
        verbose_name_plural = "Services Section Items"
        ordering = ['order', 'title']

    def __str__(self):
        return f"{self.services_section.title} - {self.title}"


class NavbarSettings(models.Model):
    # Logo/Brand Info
    logo_icon = models.CharField(max_length=50, default="fas fa-stethoscope", help_text="Font Awesome icon class")
    doctor_name = models.CharField(max_length=200, default="Dr. Abul Khayer (Biplob)")
    doctor_title = models.CharField(max_length=200, default="Anaesthetist, Intensivist & Pain Physician")
    
    # Top Contact Bar
    phone_number = models.CharField(max_length=20, default="+8801762037234")
    email = models.EmailField(default="akbiplob36@gmail.com")
    working_hours = models.CharField(max_length=100, default="Mon - Fri: 9:00 AM - 6:00 PM")
    
    # Navigation Menu Items (stored as JSON)
    menu_items = models.JSONField(default=list, help_text="List of menu items with label and href")
    
    # Appointment Button
    appointment_button_text = models.CharField(max_length=100, default="Book Appointment")
    appointment_button_icon = models.CharField(max_length=50, default="fas fa-calendar-check")
    
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Navbar Settings"
        verbose_name_plural = "Navbar Settings"

    def __str__(self):
        return "Navbar Settings"
    
    def save(self, *args, **kwargs):
        # Ensure only one instance exists
        if not self.pk and NavbarSettings.objects.exists():
            return
        super().save(*args, **kwargs)


class FooterSettings(models.Model):
    # Brand Info
    logo_icon = models.CharField(max_length=50, default="fas fa-stethoscope")
    doctor_name = models.CharField(max_length=200, default="Dr. Abul Khayer (Biplob)")
    description = models.TextField(default="Dedicated to providing expert anaesthesia, intensive care, pain management, and diabetology services with personalized treatment plans.")
    
    # Contact Info
    address = models.CharField(max_length=300, default="Dhaka, Bangladesh")
    phone_number = models.CharField(max_length=20, default="+8801762037234")
    email = models.EmailField(default="akbiplob36@gmail.com")
    working_hours = models.CharField(max_length=100, default="Mon - Fri: 9:00 AM - 6:00 PM")
    
    # Quick Links
    quick_links_title = models.CharField(max_length=100, default="Quick Links")
    quick_links = models.JSONField(default=list, help_text="List of quick links with label and href")
    
    # Services Links
    services_title = models.CharField(max_length=100, default="Our Services")
    services_links = models.JSONField(default=list, help_text="List of service links")
    
    # Patient Resources
    resources_title = models.CharField(max_length=100, default="Patient Resources")
    resources_links = models.JSONField(default=list, help_text="List of resource links")
    
    # Social Media Links
    social_media_title = models.CharField(max_length=100, default="Follow Us")
    facebook_url = models.URLField(blank=True, null=True)
    twitter_url = models.URLField(blank=True, null=True)
    linkedin_url = models.URLField(blank=True, null=True)
    instagram_url = models.URLField(blank=True, null=True)
    youtube_url = models.URLField(blank=True, null=True)
    
    # Footer Bottom
    copyright_text = models.CharField(max_length=300, default="Copyright © 2025 Dr. Abul Khayer (Biplob). All rights reserved.")
    
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Footer Settings"
        verbose_name_plural = "Footer Settings"

    def __str__(self):
        return "Footer Settings"
    
    def save(self, *args, **kwargs):
        # Ensure only one instance exists
        if not self.pk and FooterSettings.objects.exists():
            return
        super().save(*args, **kwargs)


class SiteSettings(models.Model):
    """Site-wide settings including favicon"""
    site_title = models.CharField(max_length=200, default="Dr. Abul Khayer (Biplob)")
    favicon = models.ImageField(upload_to='site/favicon/', blank=True, null=True, help_text="Upload favicon (recommended: 32x32 or 16x16 PNG/ICO)")
    site_description = models.TextField(blank=True, null=True)
    
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Site Settings"
        verbose_name_plural = "Site Settings"

    def __str__(self):
        return "Site Settings"
    
    def save(self, *args, **kwargs):
        # Ensure only one instance exists
        if not self.pk and SiteSettings.objects.exists():
            return
        super().save(*args, **kwargs)