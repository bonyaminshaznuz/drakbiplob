from django.urls import path
from . import views

urlpatterns = [
    # API endpoints
    path('api/slots/', views.AvailableSlotListView.as_view(), name='api-slots'),
    path('api/appointments/', views.AppointmentCreateView.as_view(), name='api-appointment-create'),
    path('api/appointments/<str:id>/', views.AppointmentDetailView.as_view(), name='api-appointment-detail'),
    
    # Admin Template views
    path('', views.admin_panel_index, name='admin-panel-index'),
    path('appointments/', views.admin_appointment_list, name='admin-appointment-list'),
    path('release-slots/', views.admin_release_slots, name='admin-release-slots'),
    path('confirm/<int:pk>/', views.admin_confirm_appointment, name='admin-confirm-appointment'),
    path('cancel/<int:pk>/', views.admin_cancel_appointment, name='admin-cancel-appointment'),
    path('delete-slot/<int:pk>/', views.admin_delete_slot, name='admin-delete-slot'),
    path('bulk-delete-slots/', views.admin_bulk_delete_slots, name='admin-bulk-delete-slots'),
    path('mail-settings/', views.admin_mail_settings, name='admin-mail-settings'),
    
    # Password Reset views
    path('accounts/forgot-password/', views.forgot_password, name='forgot-password'),
    path('accounts/verify-otp/', views.verify_otp, name='verify-otp'),
    path('accounts/reset-password/', views.reset_password, name='reset-password'),
]
