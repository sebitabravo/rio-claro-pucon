from django.utils import timezone
from .models import Alert, AlertRule
from .tasks import send_alert_notification

def check_and_create_alert(sensor_reading):
    """
    Check if a sensor reading triggers any alert rules and create alerts if necessary
    """
    sensor = sensor_reading.sensor
    
    # Get active alert rules for this sensor
    rules = AlertRule.objects.filter(
        Q(sensor=sensor) | Q(sensor__isnull=True),
        is_active=True
    )
    
    for rule in rules:
        should_trigger = False
        
        # Check different conditions
        if rule.metric == 'water_level':
            value = sensor_reading.water_level
        elif rule.metric == 'temperature':
            value = sensor_reading.temperature
        elif rule.metric == 'flow_rate':
            value = sensor_reading.flow_rate
        elif rule.metric == 'battery_level':
            value = sensor_reading.battery_level
        else:
            continue
        
        # Evaluate condition
        if rule.condition == 'greater_than' and value > rule.threshold_value:
            should_trigger = True
        elif rule.condition == 'less_than' and value < rule.threshold_value:
            should_trigger = True
        elif rule.condition == 'equals' and value == rule.threshold_value:
            should_trigger = True
        elif rule.condition == 'rapid_change':
            # Check for rapid change (implementation depends on specific requirements)
            should_trigger = check_rapid_change(sensor, rule.metric, value, rule.threshold_value)
        
        if should_trigger:
            # Check if there's already an active alert for this rule
            existing_alert = Alert.objects.filter(
                sensor=sensor,
                severity=rule.severity,
                status='active',
                title__icontains=rule.name
            ).first()
            
            if not existing_alert:
                # Create new alert
                alert = Alert.objects.create(
                    sensor=sensor,
                    sensor_reading=sensor_reading,
                    severity=rule.severity,
                    title=f"{rule.name} - {sensor.name}",
                    message=f"Sensor {sensor.name} ha activado la regla '{rule.name}'. "
                           f"Valor actual: {value} {get_metric_unit(rule.metric)}"
                )
                
                # Send notifications asynchronously
                send_alert_notification.delay(alert.id)

def check_rapid_change(sensor, metric, current_value, threshold_percentage):
    """
    Check if there's a rapid change in the metric value
    """
    # Get the previous reading
    previous_reading = sensor.readings.filter(
        timestamp__lt=timezone.now() - timezone.timedelta(minutes=5)
    ).first()
    
    if not previous_reading:
        return False
    
    if metric == 'water_level':
        previous_value = previous_reading.water_level
    elif metric == 'temperature':
        previous_value = previous_reading.temperature
    elif metric == 'flow_rate':
        previous_value = previous_reading.flow_rate
    else:
        return False
    
    if previous_value == 0:
        return False
    
    # Calculate percentage change
    change_percentage = abs((current_value - previous_value) / previous_value) * 100
    
    return change_percentage > threshold_percentage

def get_metric_unit(metric):
    """Get the unit for a metric"""
    units = {
        'water_level': 'm',
        'temperature': '°C',
        'flow_rate': 'm³/s',
        'battery_level': '%'
    }
    return units.get(metric, '')
