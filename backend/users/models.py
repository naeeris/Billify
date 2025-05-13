from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    """
    Modelo de usuario personalizado que extiende el modelo base de Django.
    """
    ROLE_CHOICES = [
        ('estandar', 'Usuario Estándar'),
        ('admin', 'Administrador'),
    ]

    role = models.CharField(
        _('Rol'),
        max_length=10,
        choices=ROLE_CHOICES
    )
    