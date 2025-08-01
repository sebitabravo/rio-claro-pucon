from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.utils import timezone
from django.db.models import Count, Q
from datetime import timedelta
from .models import Alert, AlertRule, NotificationChannel, AlertNotification
from .serializers import (
    AlertSerializer, AlertRuleSerializer, 
    NotificationChannelSerializer, AlertNotificationSerializer
)

class AlertViewSet(viewsets.ModelViewSet):
    queryset = Alert.objects.select_related('sensor', 'sensor__river', 'acknowledged_by', 'resolved_by')
    serializer_class = AlertSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['severity', 'status', 'sensor', 'sensor__river']
    ordering = ['-created_at']

    @action(detail=True, methods=['post'])
    def acknowledge(self, request, pk=None):
        """Acknowledge an alert"""
        alert = self.get_object()
        
        if alert.status != 'active':
            return Response(
                {'error': 'Only active alerts can be acknowledged'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        alert.status = 'acknowledged'
        alert.acknowledged_at = timezone.now()
        alert.acknowledged_by = request.user
        alert.save()
        
        serializer = self.get_serializer(alert)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def resolve(self, request, pk=None):
        """Resolve an alert"""
        alert = self.get_object()
        
        if alert.status == 'resolved':
            return Response(
                {'error': 'Alert is already resolved'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        alert.status = 'resolved'
        alert.resolved_at = timezone.now()
        alert.resolved_by = request.user
        alert.save()
        
        serializer = self.get_serializer(alert)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def active(self, request):
        """Get all active alerts"""
        active_alerts = self.get_queryset().filter(status='active')
        serializer = self.get_serializer(active_alerts, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def summary(self, request):
        """Get alert summary for dashboard"""
        queryset = self.get_queryset()
        
        # Count alerts by severity and status
        summary = queryset.aggregate(
            total_alerts=Count('id'),
            active_alerts=Count('id', filter=Q(status='active')),
            critical_alerts=Count('id', filter=Q(severity='critical', status='active')),
            warning_alerts=Count('id', filter=Q(severity='warning', status='active')),
            acknowledged_alerts=Count('id', filter=Q(status='acknowledged')),
        )
        
        # Get recent alerts (last 24 hours)
        recent_alerts = queryset.filter(
            created_at__gte=timezone.now() - timedelta(hours=24)
        ).count()
        
        summary['recent_alerts_24h'] = recent_alerts
        
        return Response(summary)

class AlertRuleViewSet(viewsets.ModelViewSet):
    queryset = AlertRule.objects.select_related('sensor')
    serializer_class = AlertRuleSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['sensor', 'metric', 'severity', 'is_active']

class NotificationChannelViewSet(viewsets.ModelViewSet):
    queryset = NotificationChannel.objects.all()
    serializer_class = NotificationChannelSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['channel_type', 'is_active']

class AlertNotificationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AlertNotification.objects.select_related('alert', 'channel')
    serializer_class = AlertNotificationSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['alert', 'channel', 'status']
    ordering = ['-sent_at']
