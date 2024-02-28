from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ['username', 'email', 'direccion', 'telefono', 'sexo', 'edad']  # Campos a mostrar en la lista de usuarios
    # Otros ajustes o personalizaciones que desees agregar

admin.site.register(CustomUser, CustomUserAdmin)
