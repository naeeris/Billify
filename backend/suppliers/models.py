from django.conf import settings
from django.db import models
from django.core.validators import RegexValidator
from phonenumber_field.modelfields import PhoneNumberField


# Modelo Supplier
class Supplier(models.Model):
    cif_validator = RegexValidator(
        regex=r'^[0-9A-Z]{8,9}$',
        message='El CIF/NIF debe tener 8-9 caracteres alfanuméricos en mayúsculas'
    )
    cif = models.CharField(max_length=20, unique=True, validators=[cif_validator], db_index=True)
    name = models.CharField(max_length=255, unique=True, db_index=True)
    address = models.TextField(blank=True, null=True)
    contact_email = models.EmailField(blank=True, null=True)
    contact_phone = PhoneNumberField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name='suppliers_created',
        verbose_name='Created By',
    )
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "Supplier"
        verbose_name_plural = "Suppliers"
        ordering = ['name']
