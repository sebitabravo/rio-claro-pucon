from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ReportViewSet, ReportTemplateViewSet

router = DefaultRouter()
router.register(r'reports', ReportViewSet)
router.register(r'templates', ReportTemplateViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
