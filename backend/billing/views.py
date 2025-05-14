# billing.views.py
from django.shortcuts import render
from rest_framework import viewsets
from .models import (
    Invoice,
    CreditNote,
)
from .serializers import (
    InvoiceSerializer,
    CreditNoteSerializer,
)

# CRUD para Invoice y CreditNote
class InvoiceViewSet(viewsets.ModelViewSet):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer

class CreditNoteViewSet(viewsets.ModelViewSet):
    queryset = CreditNote.objects.all()
    serializer_class = CreditNoteSerializer
