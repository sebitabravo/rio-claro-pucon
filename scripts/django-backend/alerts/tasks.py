from celery import shared_task
from django.core.mail import send_mail
from django.conf import settings
from .models import Alert, NotificationChannel, AlertNotification
import requests
import json

@shared_task
def send_alert_notification(alert_id):
    """
    Send notifications for an alert through all active channels
    """
    try:
        alert = Alert.objects.get(id=alert_id)
    except Alert.DoesNotExist:
        return f"Alert {alert_id} not found"
    
    # Get active notification channels
    channels = NotificationChannel.objects.filter(is_active=True)
    
    for channel in channels:
        if channel.channel_type == 'email':
            send_email_notification(alert, channel)
        elif channel.channel_type == 'sms':
            send_sms_notification(alert, channel)
        elif channel.channel_type == 'webhook':
            send_webhook_notification(alert, channel)
    
    return f"Notifications sent for alert {alert_id}"

def send_email_notification(alert, channel):
    """Send email notification"""
    config = channel.configuration
    recipients = config.get('recipients', [])
    
    subject = f"[{alert.get_severity_display()}] {alert.title}"
    message = f"""
    Se ha generado una nueva alerta en el sistema de monitoreo de ríos de Pucón.
    
    Sensor: {alert.sensor.name}
    Río: {alert.sensor.river.name}
    Severidad: {alert.get_severity_display()}
    Mensaje: {alert.message}
    Fecha: {alert.created_at.strftime('%d/%m/%Y %H:%M:%S')}
    
    Por favor, revise el sistema para más detalles.
    """
    
    for recipient in recipients:
        try:
            send_mail(
                subject=subject,
                message=message,
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[recipient],
                fail_silently=False,
            )
            
            # Log successful notification
            AlertNotification.objects.create(
                alert=alert,
                channel=channel,
                recipient=recipient,
                status='sent',
                sent_at=timezone.now()
            )
            
        except Exception as e:
            # Log failed notification
            AlertNotification.objects.create(
                alert=alert,
                channel=channel,
                recipient=recipient,
                status='failed',
                error_message=str(e)
            )

def send_sms_notification(alert, channel):
    """Send SMS notification (placeholder - integrate with SMS provider)"""
    config = channel.configuration
    recipients = config.get('recipients', [])
    api_key = config.get('api_key')
    
    message = f"ALERTA {alert.get_severity_display()}: {alert.sensor.name} - {alert.message}"
    
    for recipient in recipients:
        try:
            # Placeholder for SMS API integration
            # response = requests.post('SMS_PROVIDER_API', data={...})
            
            AlertNotification.objects.create(
                alert=alert,
                channel=channel,
                recipient=recipient,
                status='sent',
                sent_at=timezone.now()
            )
            
        except Exception as e:
            AlertNotification.objects.create(
                alert=alert,
                channel=channel,
                recipient=recipient,
                status='failed',
                error_message=str(e)
            )

def send_webhook_notification(alert, channel):
    """Send webhook notification"""
    config = channel.configuration
    webhook_url = config.get('url')
    
    payload = {
        'alert_id': alert.id,
        'sensor_name': alert.sensor.name,
        'river_name': alert.sensor.river.name,
        'severity': alert.severity,
        'title': alert.title,
        'message': alert.message,
        'timestamp': alert.created_at.isoformat(),
        'sensor_location': {
            'latitude': alert.sensor.latitude,
            'longitude': alert.sensor.longitude
        }
    }
    
    try:
        response = requests.post(
            webhook_url,
            json=payload,
            headers={'Content-Type': 'application/json'},
            timeout=30
        )
        
        AlertNotification.objects.create(
            alert=alert,
            channel=channel,
            recipient=webhook_url,
            status='sent' if response.status_code == 200 else 'failed',
            sent_at=timezone.now(),
            error_message=response.text if response.status_code != 200 else ''
        )
        
    except Exception as e:
        AlertNotification.objects.create(
            alert=alert,
            channel=channel,
            recipient=webhook_url,
            status='failed',
            error_message=str(e)
        )
