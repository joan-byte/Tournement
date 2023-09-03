# En ranking/models.py
from django.db import models
from inscripcion.models import Parejas
from .utils import actualizar_ranking

class Ranking(models.Model):
    pareja = models.OneToOneField(Parejas, on_delete=models.CASCADE)
    rank = models.IntegerField()
    serieB = models.BooleanField(default=False)
    partidas_ganadas = models.IntegerField(default=0)
    puntos = models.IntegerField(default=0)
    partida = models.IntegerField(default=0)

    def save(self, *args, **kwargs):
        actualizar_ranking(self)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Ranking para {self.pareja}"
