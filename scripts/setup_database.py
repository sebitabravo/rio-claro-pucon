"""
Script to set up the database with initial data
"""
import os
import sys
import django
from datetime import datetime, timedelta
from django.utils import timezone

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'river_monitoring.settings')
django.setup()

from django.contrib.auth import get_user_model
from sensors.models import River, Sensor, SensorReading
from alerts.models import Alert

User = get_user_model()

def create_initial_data():
    """Create initial data for the system"""
    print("Creating initial data...")
    
    # Create superuser
    if not User.objects.filter(username='admin').exists():
        admin_user = User.objects.create_superuser(
            username='admin',
            email='admin@pucon.cl',
            password='admin123',
            first_name='Administrador',
            last_name='Sistema',
            role='admin'
        )
        print(f"Created admin user: {admin_user.username}")
    
    # Create rivers
    rivers_data = [
        {
            'name': 'Río Trancura',
            'description': 'Principal río que atraviesa Pucón',
            'latitude': -39.2706,
            'longitude': -71.9756
        },
        {
            'name': 'Río Pucón',
            'description': 'Río que pasa por el centro de la ciudad',
            'latitude': -39.2833,
            'longitude': -71.9500
        },
        {
            'name': 'Río Liucura',
            'description': 'Río en el sector norte de Pucón',
            'latitude': -39.2500,
            'longitude': -71.9800
        }
    ]
    
    for river_data in rivers_data:
        river, created = River.objects.get_or_create(
            name=river_data['name'],
            defaults=river_data
        )
        if created:
            print(f"Created river: {river.name}")
    
    # Create sensors
    sensors_data = [
        {
            'name': 'Río Trancura - Puente Principal',
            'sensor_code': 'TRA-001',
            'river': 'Río Trancura',
            'latitude': -39.2706,
            'longitude': -71.9756,
            'max_level': 5.0,
            'warning_threshold': 75,
            'critical_threshold': 90
        },
        {
            'name': 'Río Pucón - Centro',
            'sensor_code': 'PUC-001',
            'river': 'Río Pucón',
            'latitude': -39.2833,
            'longitude': -71.9500,
            'max_level': 3.5,
            'warning_threshold': 70,
            'critical_threshold': 85
        },
        {
            'name': 'Río Liucura - Sector Norte',
            'sensor_code': 'LIU-001',
            'river': 'Río Liucura',
            'latitude': -39.2500,
            'longitude': -71.9800,
            'max_level': 4.2,
            'warning_threshold': 80,
            'critical_threshold': 95
        },
        {
            'name': 'Río Trancura - Sector Sur',
            'sensor_code': 'TRA-002',
            'river': 'Río Trancura',
            'latitude': -39.2800,
            'longitude': -71.9700,
            'max_level': 4.8,
            'warning_threshold': 75,
            'critical_threshold': 90
        }
    ]
    
    for sensor_data in sensors_data:
        river = River.objects.get(name=sensor_data.pop('river'))
        sensor_data['river'] = river
        sensor_data['installation_date'] = timezone.now().date()
        
        sensor, created = Sensor.objects.get_or_create(
            sensor_code=sensor_data['sensor_code'],
            defaults=sensor_data
        )
        if created:
            print(f"Created sensor: {sensor.name}")
    
    # Create sample sensor readings
    print("Creating sample sensor readings...")
    sensors = Sensor.objects.all()
    
    for sensor in sensors:
        # Create readings for the last 7 days
        for i in range(168):  # 168 hours = 7 days
            timestamp = timezone.now() - timedelta(hours=i)
            
            # Simulate realistic water levels with some variation
            base_level = sensor.max_level * 0.6  # 60% of max level
            variation = (i % 24) * 0.1  # Daily variation
            noise = (hash(str(timestamp)) % 100) / 1000  # Random noise
            
            water_level = max(0, base_level + variation + noise)
            temperature = 10 + (i % 24) * 0.5 + noise * 10  # Temperature variation
            flow_rate = water_level * 8 + noise * 20  # Flow rate based on level
            
            SensorReading.objects.create(
                sensor=sensor,
                water_level=water_level,
                temperature=temperature,
                flow_rate=flow_rate,
                battery_level=95 - (i * 0.01),  # Slowly decreasing battery
                signal_strength=-45 - (i % 10),  # Signal strength variation
                timestamp=timestamp
            )
    
    print("Initial data creation completed!")

if __name__ == '__main__':
    create_initial_data()
