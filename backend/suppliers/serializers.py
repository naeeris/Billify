from rest_framework import serializers
from .models import Supplier

# Convertir el modelo Supplier a JSON 
class SupplierSerializer(serializers.ModelSerializer):
    created_by_username = serializers.CharField(source='created_by.username', read_only=True)

    class Meta:
        model = Supplier
        fields = '__all__'
        
        