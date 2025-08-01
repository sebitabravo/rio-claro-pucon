from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
import uuid

class River(models.Model):
    """Model for rivers in Pucón"""
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    latitude = models.FloatField()
    longitude = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name

class Sensor(models.Model):
    """Model for water level sensors"""
    SENSOR_STATUS_CHOICES = [
        ('active', 'Activo'),
        ('inactive', 'Inactivo'),
        ('maintenance', 'Mantenimiento'),
        ('error', 'Error'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=200)
    sensor_code = models.CharField(max_length=20, unique=True)
    river = models.ForeignKey(River, on_delete=models.CASCADE, related_name='sensors')
    latitude = models.FloatField()
    longitude = models.FloatField()
    status = models.CharField(max_length=20, choices=SENSOR_STATUS_CHOICES, default='active')
    installation_date = models.DateField()
    last_maintenance = models.DateField(null=True, blank=True)
    max_level = models.FloatField(help_text="Nivel máximo en metros")
    warning_threshold = models.FloatField(
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        default=75,
        help_text="Umbral de advertencia en porcentaje"
    )
    critical_threshold = models.FloatField(
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        default=90,
        help_text="Umbral crítico en porcentaje"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return f"{self.name} ({self.sensor_code})"

    @property
    def current_reading(self):
        """Get the most recent sensor reading"""
        return self.readings.first()

    @property
    def current_level_percentage(self):
        """Calculate current level as percentage"""
        current = self.current_reading
        if current and self.max_level > 0:
            return min((current.water_level / self.max_level) * 100, 100)
        return 0

    @property
    def alert_status(self):
        """Determine alert status based on current level"""
        level_pct = self.current_level_percentage
        if level_pct >= self.critical_threshold:
            return 'critical'
        elif level_pct >= self.warning_threshold:
            return 'warning'
        return 'normal'

class SensorReading(models.Model):
    """Model for sensor readings"""
    sensor = models.ForeignKey(Sensor, on_delete=models.CASCADE, related_name='readings')
    water_level = models.FloatField(help_text="Nivel de agua en metros")
    temperature = models.FloatField(help_text="Temperatura en Celsius")
    flow_rate = models.FloatField(help_text="Caudal en m³/s")
    battery_level = models.FloatField(
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        help_text="Nivel de batería en porcentaje"
    )
    signal_strength = models.IntegerField(
        validators=[MinValueValidator(-120), MaxValueValidator(0)],
        help_text="Fuerza de señal en dBm"
    )
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-timestamp']
        indexes = [
            models.Index(fields=['sensor', '-timestamp']),
            models.Index(fields=['-timestamp']),
        ]

    def __str__(self):
        return f"{self.sensor.name} - {self.timestamp.strftime('%Y-%m-%d %H:%M')}"

    @property
    def level_percentage(self):
        """Calculate level as percentage of max"""
        if self.sensor.max_level > 0:
            return min((self.water_level / self.sensor.max_level) * 100, 100)
        return 0

class SensorCalibration(models.Model):
    """Model for sensor calibration records"""
    sensor = models.ForeignKey(Sensor, on_delete=models.CASCADE, related_name='calibrations')
    calibrated_by = models.ForeignKey(User, on_delete=models.CASCADE)
    calibration_date = models.DateTimeField(auto_now_add=True)
    offset_adjustment = models.FloatField(default=0.0)
    scale_factor = models.FloatField(default=1.0)
    notes = models.TextField(blank=True)

    class Meta:
        ordering = ['-calibration_date']

    def __str__(self):
        return f"{self.sensor.name} - {self.calibration_date.strftime('%Y-%m-%d')}"
