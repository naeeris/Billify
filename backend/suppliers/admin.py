from django.contrib import admin
from .models import Supplier

# Register your models here.
@admin.register(Supplier)
class SupplierAdmin(admin.ModelAdmin):
    list_display = ['cif', 'name', 'address', 'contact_email', 'contact_phone', 'created_at', 'updated_at']
    search_fields = ['cif', 'name']
    list_filter = ['created_by']
    ordering = ['name']
    list_per_page = 20