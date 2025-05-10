from rest_framework import serializers
from .models import Supplier

# Convertir el modelo Supplier a JSON 
class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = '__all__'
        
        