# Generated by Django 4.0.1 on 2024-01-12 15:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('TIENDA', '0005_clasenatacion_imagen'),
    ]

    operations = [
        migrations.AddField(
            model_name='inscripcionclase',
            name='clase_comprada',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='inscripcionclase',
            name='precio_clase',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True),
        ),
    ]
