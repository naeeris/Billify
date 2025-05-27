#billing/serializers.py

from rest_framework import serializers
from .models import (
    Invoice,
    CreditNote,
)

# Convertir los modelos Invoice y CreditNote a JSON 
class InvoiceSerializer(serializers.ModelSerializer):
    registered_by_username = serializers.CharField(source='registered_by.username', read_only=True)
    
    class Meta:
        model = Invoice
        fields = '__all__'

class CreditNoteSerializer(serializers.ModelSerializer):
    registered_by_username = serializers.CharField(source='registered_by.username', read_only=True)

    class Meta:
        model = CreditNote
        fields = '__all__'
