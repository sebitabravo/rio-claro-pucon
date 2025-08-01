from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.utils import timezone
from datetime import timedelta
from django.db.models import Avg, Max, Min, Count
from .models import River, Sensor, SensorReading, SensorCalibration
from .serializers import (
    RiverSerializer, SensorSerializer, SensorReadingSerializer,
    SensorCalibrationSerializer, SensorReadingCreateSerializer
)

class RiverViewSet(viewsets.ModelViewSet):
    queryset = River.objects.all()
    serializer_class = RiverSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['name']
    search_fields = ['name', 'description']

class SensorViewSet(viewsets.ModelViewSet):
    queryset = Sensor.objects.select_related('river').prefetch_related('readings')
    serializer_class = SensorSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['status', 'river', 'river__name']
    search_fields = ['name', 'sensor_code', 'river__name']

    @action(detail=True, methods=['get'])
    def readings(self, request, pk=None):
        """Get readings for a specific sensor"""
        sensor = self.get_object()
        
        # Get query parameters
        hours = request.query_params.get('hours', 24)
        limit = request.query_params.get('limit', 100)
        
        try:
            hours = int(hours)
            limit = int(limit)
        except ValueError:
            return Response({'error': 'Invalid parameters'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Filter readings by time
        since = timezone.now() - timedelta(hours=hours)
        readings = sensor.readings.filter(timestamp__gte=since)[:limit]
        
        serializer = SensorReadingSerializer(readings, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def statistics(self, request, pk=None):
        """Get statistics for a specific sensor"""
        sensor = self.get_object()
        
        # Get query parameters
        days = request.query_params.get('days', 7)
        
        try:
            days = int(days)
        except ValueError:
            return Response({'error': 'Invalid days parameter'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Calculate statistics
        since = timezone.now() - timedelta(days=days)
        readings = sensor.readings.filter(timestamp__gte=since)
        
        if not readings.exists():
            return Response({'message': 'No data available for the specified period'})
        
        stats = readings.aggregate(
            avg_level=Avg('water_level'),
            max_level=Max('water_level'),
            min_level=Min('water_level'),
            avg_temperature=Avg('temperature'),
            avg_flow_rate=Avg('flow_rate'),
            reading_count=Count('id')
        )
        
        # Calculate level percentages
        if sensor.max_level > 0:
            stats['avg_level_percentage'] = (stats['avg_level'] / sensor.max_level) * 100
            stats['max_level_percentage'] = (stats['max_level'] / sensor.max_level) * 100
            stats['min_level_percentage'] = (stats['min_level'] / sensor.max_level) * 100
        
        return Response(stats)

    @action(detail=False, methods=['get'])
    def dashboard_summary(self, request):
        """Get summary data for dashboard"""
        sensors = self.get_queryset()
        
        total_sensors = sensors.count()
        active_sensors = sensors.filter(status='active').count()
        
        # Get sensors with current alert status
        critical_sensors = []
        warning_sensors = []
        normal_sensors = []
        
        for sensor in sensors:
            alert_status = sensor.alert_status
            if alert_status == 'critical':
                critical_sensors.append(sensor.id)
            elif alert_status == 'warning':
                warning_sensors.append(sensor.id)
            else:
                normal_sensors.append(sensor.id)
        
        # Calculate average level
        recent_readings = SensorReading.objects.filter(
            sensor__in=sensors,
            timestamp__gte=timezone.now() - timedelta(hours=1)
        )
        
        avg_level = 0
        if recent_readings.exists():
            total_level = sum([
                (reading.water_level / reading.sensor.max_level) * 100 
                for reading in recent_readings 
                if reading.sensor.max_level > 0
            ])
            avg_level = total_level / recent_readings.count() if recent_readings.count() > 0 else 0
        
        return Response({
            'total_sensors': total_sensors,
            'active_sensors': active_sensors,
            'critical_count': len(critical_sensors),
            'warning_count': len(warning_sensors),
            'normal_count': len(normal_sensors),
            'average_level_percentage': round(avg_level, 1),
            'system_status': 'operational' if active_sensors == total_sensors else 'degraded'
        })

class SensorReadingViewSet(viewsets.ModelViewSet):
    queryset = SensorReading.objects.select_related('sensor')
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['sensor', 'sensor__river']
    ordering = ['-timestamp']

    def get_serializer_class(self):
        if self.action == 'create':
            return SensorReadingCreateSerializer
        return SensorReadingSerializer

    @action(detail=False, methods=['get'])
    def latest(self, request):
        """Get latest readings from all sensors"""
        latest_readings = []
        sensors = Sensor.objects.filter(status='active')
        
        for sensor in sensors:
            latest_reading = sensor.readings.first()
            if latest_reading:
                latest_readings.append(latest_reading)
        
        serializer = SensorReadingSerializer(latest_readings, many=True)
        return Response(serializer.data)

class SensorCalibrationViewSet(viewsets.ModelViewSet):
    queryset = SensorCalibration.objects.select_related('sensor', 'calibrated_by')
    serializer_class = SensorCalibrationSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['sensor']
    ordering = ['-calibration_date']
