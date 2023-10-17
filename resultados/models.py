# Importaciones necesarias de Django y otros modelos
from django.db import models
from django.db.models.signals import pre_save, post_save, post_delete
from django.dispatch import receiver
from mesas.models import Mesa
from resultados.state import previous_points 
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

@receiver(pre_save, sender=Resultado)
def pre_save_resultado(sender, instance, **kwargs):
    if instance.pk:  # Verifica si la instancia existe en la base de datos (es decir, es una actualización y no una creación)
        old_result = Resultado.objects.get(pk=instance.pk)
        previous_points[instance.pk] = {
            'pareja_uno': old_result.puntos_pareja_uno,
            'pareja_dos': old_result.puntos_pareja_dos
        }
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

    # Después de eliminar un registro en Resultado, se llama a la función 
    # para actualizar el ranking correspondiente.
    actualizar_ranking(instance)
    
    from ranking.models import Ranking

    # Eliminar las entradas correspondientes de Ranking para pareja_uno y pareja_dos
    if instance.n_pareja_uno:
        Ranking.objects.filter(Numero_pareja=instance.n_pareja_uno).delete()
    if instance.n_pareja_dos:
        Ranking.objects.filter(Numero_pareja=instance.n_pareja_dos).delete()
