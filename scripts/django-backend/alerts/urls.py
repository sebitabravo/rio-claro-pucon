from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AlertViewSet, AlertRuleViewSet, NotificationChannelViewSet, AlertNotificationViewSet

router = DefaultRouter()
router.register(r'alerts', AlertViewSet)
router.register(r'rules', AlertRuleViewSet)
router.register(r'channels', NotificationChannelViewSet)
router.register(r'notifications', AlertNotificationViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
