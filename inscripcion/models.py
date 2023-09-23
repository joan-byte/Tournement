from django.db import models

# Create your models here.
class Parejas(models.Model):
    
    Jugador1 = models.CharField(max_length=50)
    Jugador2 = models.CharField(max_length=50)
    Club_pertenencia = models.CharField(max_length=50,blank=True)
    # Numero_pareja will be set equal to the id during the save method
    Nombre_pareja = models.CharField(max_length=200, blank=True)  # Campo que almacenará la concatenación
    SerieB = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        self.Nombre_pareja = self.Jugador1 + ' y ' + self.Jugador2  # Concatenación de los campos
        super(Parejas, self).save(*args, **kwargs)
        self.Numero_pareja = self.id  # Set Numero_pareja equal to id after saving

    def __str__(self):
        return self.Nombre_pareja
