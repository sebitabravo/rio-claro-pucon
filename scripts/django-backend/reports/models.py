from django.db import models
from django.contrib.auth import get_user_model
from sensors.models import Sensor, River

User = get_user_model()

class Report(models.Model):
    """Model for generated reports"""
    REPORT_TYPES = [
        ('daily', 'Reporte Diario'),
        ('weekly', 'Reporte Semanal'),
        ('monthly', 'Reporte Mensual'),
        ('custom', 'Reporte Personalizado'),
        ('incident', 'Reporte de Incidente'),
    ]
    
    STATUS_CHOICES = [
        ('pending', 'Pendiente'),
        ('generating', 'Generando'),
        ('completed', 'Completado'),
        ('failed', 'Fallido'),
    ]

    title = models.CharField(max_length=200)
    report_type = models.CharField(max_length=20, choices=REPORT_TYPES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reports')
    sensors = models.ManyToManyField(Sensor, blank=True)
    rivers = models.ManyToManyField(River, blank=True)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    parameters = models.JSONField(default=dict, help_text="Additional report parameters")
    file_path = models.FileField(upload_to='reports/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    error_message = models.TextField(blank=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} - {self.get_report_type_display()}"

class ReportTemplate(models.Model):
    """Model for report templates"""
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    report_type = models.CharField(max_length=20, choices=Report.REPORT_TYPES)
    template_config = models.JSONField(help_text="Template configuration")
    is_active = models.BooleanField(default=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name
