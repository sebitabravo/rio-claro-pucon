from rest_framework import serializers
from .models import River, Sensor, SensorReading, SensorCalibration

class RiverSerializer(serializers.ModelSerializer):
    sensor_count = serializers.SerializerMethodField()

    class Meta:
        model = River
        fields = ['id', 'name', 'description', 'latitude', 'longitude', 
                 'sensor_count', 'created_at', 'updated_at']

    def get_sensor_count(self, obj):
        return obj.sensors.filter(status='active').count()

class SensorReadingSerializer(serializers.ModelSerializer):
    level_percentage = serializers.ReadOnlyField()

    class Meta:
        model = SensorReading
        fields = ['id', 'water_level', 'temperature', 'flow_rate', 
                 'battery_level', 'signal_strength', 'level_percentage', 'timestamp']

class SensorSerializer(serializers.ModelSerializer):
    river_name = serializers.CharField(source='river.name', read_only=True)
    current_reading = SensorReadingSerializer(read_only=True)
    current_level_percentage = serializers.ReadOnlyField()
    alert_status = serializers.ReadOnlyField()
    readings_count = serializers.SerializerMethodField()

    class Meta:
        model = Sensor
        fields = ['id', 'name', 'sensor_code', 'river', 'river_name', 
                 'latitude', 'longitude', 'status', 'installation_date',
                 'last_maintenance', 'max_level', 'warning_threshold',
                 'critical_threshold', 'current_reading', 'current_level_percentage',
                 'alert_status', 'readings_count', 'created_at', 'updated_at']

    def get_readings_count(self, obj):
        return obj.readings.count()

class SensorCalibrationSerializer(serializers.ModelSerializer):
    calibrated_by_name = serializers.CharField(source='calibrated_by.get_full_name', read_only=True)

    class Meta:
        model = SensorCalibration
        fields = ['id', 'sensor', 'calibrated_by', 'calibrated_by_name',
                 'calibration_date', 'offset_adjustment', 'scale_factor', 'notes']

class SensorReadingCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating sensor readings (used by IoT devices)"""
    
    class Meta:
        model = SensorReading
        fields = ['sensor', 'water_level', 'temperature', 'flow_rate', 
                 'battery_level', 'signal_strength']

    def create(self, validated_data):
        reading = super().create(validated_data)
        
        # Check if this reading triggers an alert
        from alerts.utils import check_and_create_alert
        check_and_create_alert(reading)
        
        return reading
