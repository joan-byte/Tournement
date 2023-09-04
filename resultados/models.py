from django.db import models
from mesas.models import Mesa
from .utils import calcular_resultados

class Resultado(models.Model):
    mesa = models.ForeignKey(Mesa, on_delete=models.PROTECT, to_field='numero')
    partida = models.IntegerField(blank=True, null=True)  # Permitir que 'partida' sea nulo o vacío
    n_pareja_uno = models.IntegerField(blank=True, null=True)
    nombre_pareja_uno = models.CharField(max_length=50, null=True, blank=True)
    puntos_pareja_uno = models.IntegerField(blank=True, null=True)
    n_pareja_dos = models.IntegerField(blank=True, null=True)

    # Hacer el campo anulable
    nombre_pareja_dos = models.CharField(max_length=50, null=True, blank=True)

    puntos_pareja_dos = models.IntegerField(blank=True, null=True)
    res_par_uno = models.IntegerField()
    res_par_dos = models.IntegerField()

    def save(self, *args, **kwargs):
        self.puntos_pareja_uno, self.puntos_pareja_dos = calcular_resultados(self.res_par_uno, self.res_par_dos)
        self.partida = self.mesa.partida  # Copiar el valor de 'partida' de la Mesa relacionada
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Resultado para {self.mesa}"  # revisar: debería ser para la mesa y la partida, pareja número en res_par_uno y res_par_dos
