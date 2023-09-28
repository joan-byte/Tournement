from django.db import models
from inscripcion.models import Parejas
from .utils import actualizar_ranking

class Ranking(models.Model):
    
    Numero_pareja = models.OneToOneField(Parejas, default=0, on_delete=models.DO_NOTHING)
    Nombre_pareja = models.CharField(max_length=50, null=True, blank=True)
    partida = models.IntegerField(default=0)
    rank = models.IntegerField(default=0, null=True, blank=True)
    serieB = models.BooleanField(default=False)
    partidas_ganadas = models.IntegerField(default=0)
    puntos = models.IntegerField(default=0)

    def save(self, *args, **kwargs):
        #actualizar_ranking(self)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Ranking para {self.Numero_pareja}"
    
   
