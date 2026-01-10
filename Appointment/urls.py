from django.urls import path
from . import views

urlpatterns = [
    # API endpoints
    path('api/slots/', views.AvailableSlotListView.as_view(), name='api-slots'),
    path('api/appointments/', views.AppointmentCreateView.as_view(), name='api-appointment-create'),
    path('api/appointments/<str:id>/', views.AppointmentDetailView.as_view(), name='api-appointment-detail'),
    
    # Admin Template views
    path('admin-panel/appointments/', views.admin_appointment_list, name='admin-appointment-list'),
    path('admin-panel/release-slots/', views.admin_release_slots, name='admin-release-slots'),
    path('admin-panel/confirm/<int:pk>/', views.admin_confirm_appointment, name='admin-confirm-appointment'),
    path('admin-panel/cancel/<int:pk>/', views.admin_cancel_appointment, name='admin-cancel-appointment'),
    path('admin-panel/delete-slot/<int:pk>/', views.admin_delete_slot, name='admin-delete-slot'),
    path('admin-panel/bulk-delete-slots/', views.admin_bulk_delete_slots, name='admin-bulk-delete-slots'),
    path('admin-panel/mail-settings/', views.admin_mail_settings, name='admin-mail-settings'),
]
