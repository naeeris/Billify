# billing/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    InvoiceViewSet,
    CreditNoteViewSet,
)

router = DefaultRouter()

# Registramos cada ViewSet con una ruta base
router.register(r'invoices', InvoiceViewSet, basename='invoices')
router.register(r'credit-notes', CreditNoteViewSet, basename='credit-notes')

urlpatterns = [
    path('', include(router.urls)),
]
