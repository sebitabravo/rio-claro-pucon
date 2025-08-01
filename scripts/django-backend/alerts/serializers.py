from rest_framework import serializers
from .models import Alert, AlertRule, NotificationChannel, AlertNotification

class AlertSerializer(serializers.ModelSerializer):
    sensor_name = serializers.CharField(source='sensor.name', read_only=True)
    river_name = serializers.CharField(source='sensor.river.name', read_only=True)
    acknowledged_by_name = serializers.CharField(source='acknowledged_by.get_full_name', read_only=True)
    resolved_by_name = serializers.CharField(source='resolved_by.get_full_name', read_only=True)

    class Meta:
        model = Alert
        fields = ['id', 'sensor', 'sensor_name', 'river_name', 'sensor_reading',
                 'severity', 'status', 'title', 'message', 'created_at',
                 'acknowledged_at', 'acknowledged_by', 'acknowledged_by_name',
                 'resolved_at', 'resolved_by', 'resolved_by_name']

class AlertRuleSerializer(serializers.ModelSerializer):
    sensor_name = serializers.CharField(source='sensor.name', read_only=True)

    class Meta:
        model = AlertRule
        fields = ['id', 'name', 'sensor', 'sensor_name', 'metric', 'condition',
                 'threshold_value', 'severity', 'is_active', 'created_at', 'updated_at']

class NotificationChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotificationChannel
        fields = ['id', 'name', 'channel_type', 'configuration', 'is_active', 'created_at']

class AlertNotificationSerializer(serializers.ModelSerializer):
    alert_title = serializers.CharField(source='alert.title', read_only=True)
    channel_name = serializers.CharField(source='channel.name', read_only=True)

    class Meta:
        model = AlertNotification
        fields = ['id', 'alert', 'alert_title', 'channel', 'channel_name',
                 'recipient', 'status', 'sent_at', 'error_message']
