from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.http import FileResponse
from .models import Report, ReportTemplate
from .serializers import ReportSerializer, ReportCreateSerializer, ReportTemplateSerializer
from .tasks import generate_report

class ReportViewSet(viewsets.ModelViewSet):
    queryset = Report.objects.select_related('created_by').prefetch_related('sensors', 'rivers')
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['report_type', 'status', 'created_by']
    ordering = ['-created_at']

    def get_serializer_class(self):
        if self.action == 'create':
            return ReportCreateSerializer
        return ReportSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            report = serializer.save()
            
            # Start report generation task
            generate_report.delay(report.id)
            
            return Response(
                ReportSerializer(report).data, 
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['get'])
    def download(self, request, pk=None):
        """Download generated report file"""
        report = self.get_object()
        
        if report.status != 'completed' or not report.file_path:
            return Response(
                {'error': 'Report is not ready for download'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        return FileResponse(
            report.file_path.open('rb'),
            as_attachment=True,
            filename=f"{report.title}.pdf"
        )

class ReportTemplateViewSet(viewsets.ModelViewSet):
    queryset = ReportTemplate.objects.select_related('created_by')
    serializer_class = ReportTemplateSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['report_type', 'is_active']
