from rest_framework import serializers
from .models import Report, ReportTemplate

class ReportSerializer(serializers.ModelSerializer):
    created_by_name = serializers.CharField(source='created_by.get_full_name', read_only=True)
    sensor_names = serializers.StringRelatedField(source='sensors', many=True, read_only=True)
    river_names = serializers.StringRelatedField(source='rivers', many=True, read_only=True)

    class Meta:
        model = Report
        fields = ['id', 'title', 'report_type', 'status', 'created_by', 
                 'created_by_name', 'sensors', 'sensor_names', 'rivers', 
                 'river_names', 'start_date', 'end_date', 'parameters',
                 'file_path', 'created_at', 'completed_at', 'error_message']

class ReportCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = ['title', 'report_type', 'sensors', 'rivers', 
                 'start_date', 'end_date', 'parameters']

    def create(self, validated_data):
        validated_data['created_by'] = self.context['request'].user
        return super().create(validated_data)

class ReportTemplateSerializer(serializers.ModelSerializer):
    created_by_name = serializers.CharField(source='created_by.get_full_name', read_only=True)

    class Meta:
        model = ReportTemplate
        fields = ['id', 'name', 'description', 'report_type', 'template_config',
                 'is_active', 'created_by', 'created_by_name', 'created_at', 'updated_at']
