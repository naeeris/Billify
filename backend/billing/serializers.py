#billing/serializers.py

from rest_framework import serializers
from .models import (
    Invoice,
    CreditNote,
)

# Convertir los modelos Invoice y CreditNote a JSON 
class InvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invoice
        fields = '__all__'

class CreditNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreditNote
        fields = '__all__'
