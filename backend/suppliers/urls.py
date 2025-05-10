# suppliers/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    SupplierViewSet,
)

router = DefaultRouter()

# Registramos cada ViewSet con una ruta base
router.register(r'suppliers', SupplierViewSet, basename='suppliers')

urlpatterns = [
    path('', include(router.urls)),
]
