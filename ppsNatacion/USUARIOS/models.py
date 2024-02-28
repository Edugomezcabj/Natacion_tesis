from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    direccion = models.CharField(max_length=255)
    telefono = models.CharField(max_length=15)
    SEXO_CHOICES = [('M', 'Masculino'), ('F', 'Femenino')]
    sexo = models.CharField(choices=SEXO_CHOICES, max_length=1)
    edad = models.IntegerField(default=18)  # O cualquier valor predeterminado que desees
    telefono_emergencia = models.CharField(max_length=15)
    alergias = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.username

    class Meta:
        verbose_name = 'Usuario Personalizado'
        verbose_name_plural = 'Usuarios Personalizados'
