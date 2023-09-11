from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from mesas.models import Mesa
from .utils import calcular_resultados

class Resultado(models.Model):
    mesa = models.ForeignKey(Mesa, on_delete=models.PROTECT, related_name='resultados')
    partida = models.IntegerField(blank=True, null=True)
    n_pareja_uno = models.IntegerField(blank=True, null=True)
    nombre_pareja_uno = models.CharField(max_length=50, null=True, blank=True)
    puntos_pareja_uno = models.IntegerField(blank=True, null=True)
    n_pareja_dos = models.IntegerField(blank=True, null=True)
    nombre_pareja_dos = models.CharField(max_length=50, null=True, blank=True)
    puntos_pareja_dos = models.IntegerField(blank=True, null=True)
    res_par_uno = models.IntegerField()
    res_par_dos = models.IntegerField()

    class Meta:
        unique_together = ['mesa', 'partida']

    def save(self, *args, **kwargs):
        self.puntos_pareja_uno, self.puntos_pareja_dos = calcular_resultados(self.res_par_uno, self.res_par_dos)
        super(Resultado, self).save(*args, **kwargs)

    def __str__(self):
        return f"Resultado para {self.mesa}"

@receiver(post_save, sender=Resultado)
def update_mesa_resultado_id(sender, instance, **kwargs):
    """
    Actualiza el campo resultado_id en el modelo Mesa relacionado 
    con el ID del Resultado recién guardado.
    """
    mesa_related = instance.mesa
    mesa_related.resultado_id = instance.id
    mesa_related.save()
