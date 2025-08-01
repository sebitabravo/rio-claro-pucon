from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RiverViewSet, SensorViewSet, SensorReadingViewSet, SensorCalibrationViewSet

router = DefaultRouter()
router.register(r'rivers', RiverViewSet)
router.register(r'sensors', SensorViewSet)
router.register(r'readings', SensorReadingViewSet)
router.register(r'calibrations', SensorCalibrationViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
