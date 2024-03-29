from django.contrib.auth.forms import UserCreationForm
from .models import CustomUser
from django import forms

class RegistroForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = CustomUser
        fields = ('username', 'email', 'direccion', 'telefono', 'sexo', 'edad', 'telefono_emergencia', 'alergias')

