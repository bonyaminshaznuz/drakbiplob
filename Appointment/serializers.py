from rest_framework import serializers
from .models import AvailableSlot, Appointment

class AvailableSlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = AvailableSlot
        fields = ['id', 'date', 'time', 'is_booked']

class AppointmentSerializer(serializers.ModelSerializer):
    slot_details = AvailableSlotSerializer(source='slot', read_only=True)
    
    class Meta:
        model = Appointment
        fields = ['id', 'formatted_id', 'full_name', 'date_of_birth', 'phone_number', 'email', 'slot', 'slot_details', 'reason', 'status', 'created_at']
