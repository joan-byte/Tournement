from django.db import models

class Mesa(models.Model):
    numero = models.IntegerField(primary_key=True, unique=True, verbose_name="Número de Mesa")
    pareja_uno = models.IntegerField(null=True, blank=True, verbose_name="Número de la primera pareja")
    nombre_pareja_uno = models.CharField(max_length=255, null=True, blank=True, verbose_name="Nombre de la primera pareja")
    pareja_dos = models.IntegerField(null=True, blank=True, verbose_name="Número de la segunda pareja")
    nombre_pareja_dos = models.CharField(max_length=255, null=True, blank=True, verbose_name="Nombre de la segunda pareja")
    partida = models.IntegerField(default=1, verbose_name="Número de Partida")
    resultado_id = models.IntegerField(null=True, blank=True)

    class Meta:
        verbose_name = "Mesa"
        verbose_name_plural = "Mesas"
        
    def __str__(self):
        return f"mesa {self.numero} partida {self.partida}"
