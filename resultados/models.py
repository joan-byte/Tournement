from django.db import models
from mesas.models import Mesa
from .utils import calcular_resultados

class Resultado(models.Model):
    mesa = models.ForeignKey(Mesa, on_delete=models.PROTECT, to_field='numero')
    partida = models.IntegerField(blank=True, null=True)  # Permitir que partida sea nulo o vacío
    puntos_pareja_uno = models.IntegerField()
    puntos_pareja_dos = models.IntegerField()
    res_par_uno = models.IntegerField()
    res_par_dos = models.IntegerField()

    def save(self, *args, **kwargs):
        self.res_par_uno, self.res_par_dos = calcular_resultados(self.puntos_pareja_uno, self.puntos_pareja_dos)
        self.partida = self.mesa.partida  # Copiar el valor de partida de la Mesa relacionada
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Resultado para {self.mesa}" # revisar tendria que ser para la mesa y la partida pareja numero pareja numero en res_par_uno y res_par_dos
    
    
