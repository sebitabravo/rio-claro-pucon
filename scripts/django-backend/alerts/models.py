from django.db import models
from django.contrib.auth.models import User
from sensors.models import Sensor, SensorReading

class Alert(models.Model):
    """Model for system alerts"""
    SEVERITY_CHOICES = [
        ('info', 'Información'),
        ('warning', 'Advertencia'),
        ('critical', 'Crítico'),
    ]
    
    STATUS_CHOICES = [
        ('active', 'Activa'),
        ('acknowledged', 'Reconocida'),
        ('resolved', 'Resuelta'),
    ]

    sensor = models.ForeignKey(Sensor, on_delete=models.CASCADE, related_name='alerts')
    sensor_reading = models.ForeignKey(SensorReading, on_delete=models.CASCADE, null=True, blank=True)
    severity = models.CharField(max_length=20, choices=SEVERITY_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    title = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    acknowledged_at = models.DateTimeField(null=True, blank=True)
    acknowledged_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    resolved_at = models.DateTimeField(null=True, blank=True)
    resolved_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='resolved_alerts')

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['severity', 'status']),
            models.Index(fields=['sensor', '-created_at']),
        ]

    def __str__(self):
        return f"{self.get_severity_display()} - {self.sensor.name} - {self.title}"

class AlertRule(models.Model):
    """Model for alert rules configuration"""
    CONDITION_CHOICES = [
        ('greater_than', 'Mayor que'),
        ('less_than', 'Menor que'),
        ('equals', 'Igual a'),
        ('rapid_change', 'Cambio rápido'),
    ]
    
    METRIC_CHOICES = [
        ('water_level', 'Nivel de agua'),
        ('temperature', 'Temperatura'),
        ('flow_rate', 'Caudal'),
        ('battery_level', 'Nivel de batería'),
    ]

    name = models.CharField(max_length=100)
    sensor = models.ForeignKey(Sensor, on_delete=models.CASCADE, related_name='alert_rules', null=True, blank=True)
    metric = models.CharField(max_length=20, choices=METRIC_CHOICES)
    condition = models.CharField(max_length=20, choices=CONDITION_CHOICES)
    threshold_value = models.FloatField()
    severity = models.CharField(max_length=20, choices=Alert.SEVERITY_CHOICES)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return f"{self.name} - {self.get_severity_display()}"

class NotificationChannel(models.Model):
    """Model for notification channels"""
    CHANNEL_TYPES = [
        ('email', 'Email'),
        ('sms', 'SMS'),
        ('webhook', 'Webhook'),
        ('push', 'Push Notification'),
    ]

    name = models.CharField(max_length=100)
    channel_type = models.CharField(max_length=20, choices=CHANNEL_TYPES)
    configuration = models.JSONField(help_text="Channel-specific configuration")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.get_channel_type_display()})"

class AlertNotification(models.Model):
    """Model for tracking sent notifications"""
    STATUS_CHOICES = [
        ('pending', 'Pendiente'),
        ('sent', 'Enviada'),
        ('failed', 'Fallida'),
    ]

    alert = models.ForeignKey(Alert, on_delete=models.CASCADE, related_name='notifications')
    channel = models.ForeignKey(NotificationChannel, on_delete=models.CASCADE)
    recipient = models.CharField(max_length=200)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    sent_at = models.DateTimeField(null=True, blank=True)
    error_message = models.TextField(blank=True)

    class Meta:
        ordering = ['-sent_at']

    def __str__(self):
        return f"{self.alert.title} -> {self.recipient} ({self.status})"
