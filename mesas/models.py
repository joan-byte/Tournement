from django.db import models

class Mesa(models.Model):
    # Campo para el número de mesa
    numero = models.IntegerField(primary_key=True, unique=True, verbose_name="Número de Mesa")
    
    # Campo para el número de la primera pareja
    pareja_uno = models.IntegerField(null=True, blank=True, verbose_name="Número de la primera pareja")
    
    # Campo para el nombre de la primera pareja (añadido según solicitud)
    nombre_pareja_uno = models.CharField(max_length=255, null=True, blank=True, verbose_name="Nombre de la primera pareja")
    
    # Campo para el número de la segunda pareja
    pareja_dos = models.IntegerField(null=True, blank=True, verbose_name="Número de la segunda pareja")
    
    # Campo para el nombre de la segunda pareja (añadido según solicitud)
    nombre_pareja_dos = models.CharField(max_length=255, null=True, blank=True, verbose_name="Nombre de la segunda pareja")
    
    # Campo para el número de partida
    partida = models.IntegerField(default=1, verbose_name="Número de Partida")
    
    # Meta información sobre el modelo
    class Meta:
        verbose_name = "Mesa"
        verbose_name_plural = "Mesas"
        
    # Método para representar el objeto como una cadena
    def __str__(self):
        return f"Mesa {self.numero}"
