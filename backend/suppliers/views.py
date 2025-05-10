# suppliers.views.py
from django.shortcuts import render
from rest_framework import viewsets
from .models import (
    Supplier
)
from .serializers import (
    SupplierSerializer
)

# CRUD para Supplier
class SupplierViewSet(viewsets.ModelViewSet):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer