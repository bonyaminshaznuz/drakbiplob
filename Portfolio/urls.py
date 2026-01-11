from django.urls import path
from . import views

urlpatterns = [
    # API endpoints (for frontend)
    path('api/portfolio/', views.PortfolioDataView.as_view(), name='portfolio-data'),
    path('api/portfolio/hero/', views.HeroSectionView.as_view(), name='portfolio-hero'),
    path('api/portfolio/services/', views.ServiceListView.as_view(), name='portfolio-services'),
    path('api/portfolio/services/featured/', views.FeaturedServiceListView.as_view(), name='portfolio-services-featured'),
    path('api/portfolio/about/', views.AboutSectionView.as_view(), name='portfolio-about'),
    path('api/portfolio/videos/', views.VideoListView.as_view(), name='portfolio-videos'),
    path('api/portfolio/testimonials/', views.TestimonialListView.as_view(), name='portfolio-testimonials'),
    path('api/portfolio/research/', views.ResearchListView.as_view(), name='portfolio-research'),
    path('api/portfolio/contact/', views.ContactSectionView.as_view(), name='portfolio-contact'),
    path('api/portfolio/navbar/', views.NavbarSettingsView.as_view(), name='portfolio-navbar'),
    path('api/portfolio/footer/', views.FooterSettingsView.as_view(), name='portfolio-footer'),
    path('api/portfolio/site-settings/', views.SiteSettingsView.as_view(), name='portfolio-site-settings'),
    
    # Admin template views (CRUD)
    path('admin-panel/portfolio/', views.admin_portfolio_dashboard, name='admin-portfolio-dashboard'),
    
    # Hero Section CRUD
    path('admin-panel/portfolio/hero/', views.admin_hero_list, name='admin-hero-list'),
    path('admin-panel/portfolio/hero/create/', views.admin_hero_create, name='admin-hero-create'),
    path('admin-panel/portfolio/hero/edit/<int:pk>/', views.admin_hero_edit, name='admin-hero-edit'),
    path('admin-panel/portfolio/hero/delete/<int:pk>/', views.admin_hero_delete, name='admin-hero-delete'),
    
    # Service CRUD
    path('admin-panel/portfolio/services/', views.admin_service_list, name='admin-service-list'),
    path('admin-panel/portfolio/services/create/', views.admin_service_create, name='admin-service-create'),
    path('admin-panel/portfolio/services/edit/<int:pk>/', views.admin_service_edit, name='admin-service-edit'),
    path('admin-panel/portfolio/services/delete/<int:pk>/', views.admin_service_delete, name='admin-service-delete'),
    
    # About Section CRUD
    path('admin-panel/portfolio/about/', views.admin_about_list, name='admin-about-list'),
    path('admin-panel/portfolio/about/create/', views.admin_about_create, name='admin-about-create'),
    path('admin-panel/portfolio/about/edit/<int:pk>/', views.admin_about_edit, name='admin-about-edit'),
    path('admin-panel/portfolio/about/delete/<int:pk>/', views.admin_about_delete, name='admin-about-delete'),
    
    # Video CRUD
    path('admin-panel/portfolio/videos/', views.admin_video_list, name='admin-video-list'),
    path('admin-panel/portfolio/videos/create/', views.admin_video_create, name='admin-video-create'),
    path('admin-panel/portfolio/videos/edit/<int:pk>/', views.admin_video_edit, name='admin-video-edit'),
    path('admin-panel/portfolio/videos/delete/<int:pk>/', views.admin_video_delete, name='admin-video-delete'),
    
    # Testimonial CRUD
    path('admin-panel/portfolio/testimonials/', views.admin_testimonial_list, name='admin-testimonial-list'),
    path('admin-panel/portfolio/testimonials/create/', views.admin_testimonial_create, name='admin-testimonial-create'),
    path('admin-panel/portfolio/testimonials/edit/<int:pk>/', views.admin_testimonial_edit, name='admin-testimonial-edit'),
    path('admin-panel/portfolio/testimonials/delete/<int:pk>/', views.admin_testimonial_delete, name='admin-testimonial-delete'),
    
    # Research CRUD
    path('admin-panel/portfolio/research/', views.admin_research_list, name='admin-research-list'),
    path('admin-panel/portfolio/research/create/', views.admin_research_create, name='admin-research-create'),
    path('admin-panel/portfolio/research/edit/<int:pk>/', views.admin_research_edit, name='admin-research-edit'),
    path('admin-panel/portfolio/research/delete/<int:pk>/', views.admin_research_delete, name='admin-research-delete'),
    
    # Contact Section CRUD
    path('admin-panel/portfolio/contact/', views.admin_contact_list, name='admin-contact-list'),
    path('admin-panel/portfolio/contact/create/', views.admin_contact_create, name='admin-contact-create'),
    path('admin-panel/portfolio/contact/edit/<int:pk>/', views.admin_contact_edit, name='admin-contact-edit'),
    path('admin-panel/portfolio/contact/delete/<int:pk>/', views.admin_contact_delete, name='admin-contact-delete'),
    
    # Services Section CRUD
    path('admin-panel/portfolio/services-section/', views.admin_services_section_list, name='admin-services-section-list'),
    path('admin-panel/portfolio/services-section/create/', views.admin_services_section_create, name='admin-services-section-create'),
    path('admin-panel/portfolio/services-section/edit/<int:pk>/', views.admin_services_section_edit, name='admin-services-section-edit'),
    path('admin-panel/portfolio/services-section/delete/<int:pk>/', views.admin_services_section_delete, name='admin-services-section-delete'),
    
    # Services Section Items CRUD
    path('admin-panel/portfolio/services-section/<int:section_pk>/items/', views.admin_services_section_item_list, name='admin-services-section-item-list'),
    path('admin-panel/portfolio/services-section/<int:section_pk>/items/create/', views.admin_services_section_item_create, name='admin-services-section-item-create'),
    path('admin-panel/portfolio/services-section/<int:section_pk>/items/edit/<int:item_pk>/', views.admin_services_section_item_edit, name='admin-services-section-item-edit'),
    path('admin-panel/portfolio/services-section/<int:section_pk>/items/delete/<int:item_pk>/', views.admin_services_section_item_delete, name='admin-services-section-item-delete'),
    
    # Navbar & Footer Settings
    path('admin-panel/portfolio/navbar/', views.admin_navbar_edit, name='admin-navbar-edit'),
    path('admin-panel/portfolio/footer/', views.admin_footer_edit, name='admin-footer-edit'),
    
    # Site Settings
    path('admin-panel/portfolio/site-settings/', views.admin_site_settings_edit, name='admin-site-settings-edit'),
]
