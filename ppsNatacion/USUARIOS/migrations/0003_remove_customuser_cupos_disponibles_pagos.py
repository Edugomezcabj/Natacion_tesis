# Generated by Django 4.0.1 on 2024-01-12 16:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('USUARIOS', '0002_customuser_cupos_disponibles_pagos'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customuser',
            name='cupos_disponibles_pagos',
        ),
    ]
