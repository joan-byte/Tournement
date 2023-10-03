# Importaciones necesarias de Django y otros modelos
from django.db import models
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from mesas.models import Mesa
from resultados.utils import calcular_resultados  # Importación de la función desde la app 'resultados'

# Definición del modelo Resultado
class Resultado(models.Model):
    # Campos del modelo
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

    # Metadatos del modelo
    class Meta:
        # Restricción para que la combinación de mesa y partida sea única
        unique_together = ['mesa', 'partida']

    # Método save personalizado
    def save(self, *args, **kwargs):
        # Antes de guardar, calcula los puntos para cada pareja
        self.puntos_pareja_uno, self.puntos_pareja_dos = calcular_resultados(self.res_par_uno, self.res_par_dos)
        super(Resultado, self).save(*args, **kwargs)

    # Representación en cadena del modelo
    def __str__(self):
        return f"Resultado para {self.mesa}"

# Señal que se activa después de guardar un Resultado (ya sea creado o modificado)
@receiver(post_save, sender=Resultado)
def post_save_resultado(sender, instance, created, **kwargs):
    from ranking.utils import actualizar_ranking
    """
    Después de guardar un registro en Resultado, se llama a la función 
    para actualizar el ranking correspondiente.
    """
    actualizar_ranking(instance)

    mesa_related = instance.mesa
    mesa_related.resultado_id = instance.id
    mesa_related.save()
# Señal que se activa después de eliminar un Resultado
@receiver(post_delete, sender=Resultado)
def post_delete_resultado(sender, instance, **kwargs):
    from ranking.utils import actualizar_ranking
    """
    Después de eliminar un registro en Resultado, se llama a la función 
    para actualizar el ranking correspondiente.
    """
    actualizar_ranking(instance)
