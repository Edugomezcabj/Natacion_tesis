from django.contrib import admin
from .models import ClaseNatacion, InscripcionClase, ComprasClase


@admin.register(ClaseNatacion)
class ClaseNatacionAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'fecha', 'hora_inicio', 'hora_fin', 'cupos_disponibles', 'precio')
    search_fields = ('nombre', 'fecha')
    list_filter = ('fecha',)
    readonly_fields = ('mostrar_imagen',)  # Campo de imagen como solo lectura en el admin

    def mostrar_imagen(self, obj):
        return obj.imagen_tag() if obj.imagen else "Sin imagen"

    mostrar_imagen.short_description = 'Imagen'  # Nombre para el campo en el admin
    
@admin.register(InscripcionClase)
class InscripcionClaseAdmin(admin.ModelAdmin):
    list_display = ('usuario', 'clase_natacion', 'fecha_inscripcion', 'obtener_nombre_clase', 'obtener_fecha', 'obtener_hora_inicio', 'obtener_hora_fin', 'obtener_cupos_disponibles')
    search_fields = ('usuario__username', 'clase_natacion__nombre')
    list_filter = ('fecha_inscripcion',)

@admin.register(ComprasClase)
class ComprasClaseAdmin(admin.ModelAdmin):
    list_display = ['usuario', 'clase_comprada', 'precio_clase', 'fecha_compra', 'cupos_disponibles_pagos']
    search_fields = ['usuario__username', 'clase_comprada']