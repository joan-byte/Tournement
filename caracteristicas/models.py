from django.db import models

# Create your models here.
class caracteristicas_campeonato(models.Model):
    nombre_campeonato = models.CharField(max_length=50)
    logo = models.ImageField(upload_to='caracteristicas/tournament_logos/' , blank=True, null=True)
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField()
    lugar = models.CharField(max_length=50)
    num_partidas = models.IntegerField()
    serieB = models.BooleanField(default=False)
    puntos_totales =models.BooleanField(default=False)
    
    def __str__(self):
        return self.nombre_campeonato