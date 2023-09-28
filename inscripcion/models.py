from django.db import models

# Create your models here.

class Parejas(models.Model):
    
    # Campos definidos originalmente
    Jugador1 = models.CharField(max_length=50)
    Jugador2 = models.CharField(max_length=50)
    Club_pertenencia = models.CharField(max_length=50,blank=True)
    
    # Nuevo campo Numero_pareja. Es un PositiveIntegerField que permite valores nulos.
    # Esto es porque inicialmente, antes de que se guarde el objeto, no tiene un valor asignado.
    Numero_pareja = models.PositiveIntegerField(null=True, blank=True)
    
    Nombre_pareja = models.CharField(max_length=200, blank=True)  # Campo que almacenará la concatenación
    SerieB = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        # Concatenación de los campos Jugador1 y Jugador2 para formar el Nombre_pareja
        self.Nombre_pareja = self.Jugador1 + ' y ' + self.Jugador2
        
        # Guardar el objeto por primera vez. Esto genera un ID para el objeto.
        super(Parejas, self).save(*args, **kwargs)
        
        # Si Numero_pareja no tiene un valor (es decir, es la primera vez que se guarda el objeto),
        # entonces asignar el ID del objeto a Numero_pareja y guardar el objeto de nuevo.
        if not self.Numero_pareja:
            self.Numero_pareja = self.id
            super(Parejas, self).save(*args, **kwargs)

    # Método para representar el objeto como una cadena de texto.
    def __str__(self):
        return self.Nombre_pareja
