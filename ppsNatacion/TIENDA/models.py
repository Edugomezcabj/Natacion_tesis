from django.db import models
from USUARIOS.models import CustomUser


class ClaseNatacion(models.Model):
    nombre = models.CharField(max_length=100)
    fecha = models.DateField()
    hora_inicio = models.TimeField()
    hora_fin = models.TimeField()
    cupos_disponibles = models.PositiveIntegerField(default=0)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    imagen = models.ImageField(upload_to='clase_imagenes/', null=True, blank=True)  # Campo de imagen

    def __str__(self):
        return f"{self.nombre} - {self.fecha.strftime('%d/%m/%Y')}"
    

class ComprasClase(models.Model):
    usuario = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    clase_comprada = models.CharField(max_length=100, null=True, blank=True)
    precio_clase = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    fecha_compra = models.DateTimeField(auto_now_add=True)
    cupos_disponibles_pagos = models.IntegerField(blank=True, null=True)
    def __str__(self):
        return f'{self.usuario.username} - {self.clase_comprada}'

    @classmethod
    def crear_compra(cls, usuario, clase_comprada, precio_clase, cupos_disponibles_pagos):
        return cls.objects.create(
            usuario=usuario,
            clase_comprada=clase_comprada,
            precio_clase=precio_clase,
            cupos_disponibles_pagos=cupos_disponibles_pagos
        )


  
class InscripcionClase(models.Model):
    usuario = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    clase_natacion = models.ForeignKey(ClaseNatacion, on_delete=models.CASCADE)
    fecha_inscripcion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.usuario.username} - {self.clase_natacion.nombre}'

    def obtener_nombre_clase(self):
        return self.clase_natacion.nombre

    def obtener_fecha(self):
        return self.clase_natacion.fecha

    def obtener_hora_inicio(self):
        return self.clase_natacion.hora_inicio

    def obtener_hora_fin(self):
        return self.clase_natacion.hora_fin

    def obtener_cupos_disponibles(self):
        return self.clase_natacion.cupos_disponibles






class Noticia(models.Model):
    titulo = models.CharField(max_length=100)
    resumen = models.TextField()
    contenido = models.TextField()
    imagen = models.ImageField(upload_to='noticias/')
    fecha_publicacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.titulo