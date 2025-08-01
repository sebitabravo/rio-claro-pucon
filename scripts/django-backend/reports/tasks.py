from celery import shared_task
from django.utils import timezone
from django.template.loader import render_to_string
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from io import BytesIO
import os
from .models import Report
from sensors.models import SensorReading

@shared_task
def generate_report(report_id):
    """Generate a report file"""
    try:
        report = Report.objects.get(id=report_id)
        report.status = 'generating'
        report.save()
        
        # Generate report based on type
        if report.report_type == 'daily':
            file_path = generate_daily_report(report)
        elif report.report_type == 'weekly':
            file_path = generate_weekly_report(report)
        elif report.report_type == 'monthly':
            file_path = generate_monthly_report(report)
        else:
            file_path = generate_custom_report(report)
        
        report.file_path = file_path
        report.status = 'completed'
        report.completed_at = timezone.now()
        report.save()
        
        return f"Report {report_id} generated successfully"
        
    except Exception as e:
        report.status = 'failed'
        report.error_message = str(e)
        report.save()
        return f"Report {report_id} generation failed: {str(e)}"

def generate_daily_report(report):
    """Generate daily report"""
    # Get sensor readings for the specified date range
    readings = SensorReading.objects.filter(
        sensor__in=report.sensors.all(),
        timestamp__range=[report.start_date, report.end_date]
    ).select_related('sensor', 'sensor__river')
    
    # Create PDF
    buffer = BytesIO()
    p = canvas.Canvas(buffer, pagesize=letter)
    
    # Add content to PDF
    p.drawString(100, 750, f"Reporte Diario - {report.title}")
    p.drawString(100, 730, f"Fecha: {report.start_date.strftime('%d/%m/%Y')}")
    
    y_position = 700
    for reading in readings[:20]:  # Limit to first 20 readings
        text = f"{reading.sensor.name}: {reading.water_level}m, {reading.temperature}°C"
        p.drawString(100, y_position, text)
        y_position -= 20
    
    p.showPage()
    p.save()
    
    # Save file
    filename = f"daily_report_{report.id}_{timezone.now().strftime('%Y%m%d')}.pdf"
    file_path = os.path.join('reports', filename)
    
    with open(file_path, 'wb') as f:
        f.write(buffer.getvalue())
    
    return file_path

def generate_weekly_report(report):
    """Generate weekly report"""
    # Similar implementation for weekly reports
    return generate_daily_report(report)  # Placeholder

def generate_monthly_report(report):
    """Generate monthly report"""
    # Similar implementation for monthly reports
    return generate_daily_report(report)  # Placeholder

def generate_custom_report(report):
    """Generate custom report"""
    # Custom report generation based on parameters
    return generate_daily_report(report)  # Placeholder
