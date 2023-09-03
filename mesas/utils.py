from .models import Mesa
from inscripcion.models import Parejas
from ranking.models import Ranking
import random

# Función que asigna parejas a mesas para la primera ronda
def mesas_primera():
    # Obtiene todas las parejas ordenadas por su número
    parejas = list(Parejas.objects.all().order_by('id'))
    
    # Mezcla las parejas al azar
    random.shuffle(parejas)
    
    # Calcula el número de mesas necesarias (dividiendo entre 2 y redondeando hacia arriba)
    num_mesas = len(parejas) // 2 + len(parejas) % 2

    # Asigna parejas y sus nombres a cada mesa y guarda la mesa en la base de datos
    for i in range(num_mesas):
        mesa = Mesa(numero=i+1)
        
        pareja_uno_obj = parejas.pop(0) if parejas else None
        mesa.pareja_uno = pareja_uno_obj.id if pareja_uno_obj else None
        mesa.nombre_pareja_uno = pareja_uno_obj.Nombre_pareja if pareja_uno_obj else None
        
        pareja_dos_obj = parejas.pop(0) if parejas else None
        mesa.pareja_dos = pareja_dos_obj.id if pareja_dos_obj else None
        mesa.nombre_pareja_dos = pareja_dos_obj.Nombre_pareja if pareja_dos_obj else None

        mesa.partida = 1
        mesa.save()

# Función que asigna parejas a mesas según un ranking
def parejas_a_mesas():
    # Obtiene todos los rankings y los ordena por su valor de rank
    rankings = list(Ranking.objects.all().order_by('rank'))

    # Obtiene todas las mesas y las ordena por número
    mesas = list(Mesa.objects.all().order_by('numero'))

    # Asigna parejas y sus nombres a las mesas según el ranking y guarda las mesas en la base de datos
    for mesa in mesas:
        pareja_uno_obj = rankings.pop(0).pareja if rankings else None
        mesa.pareja_uno = pareja_uno_obj.id if pareja_uno_obj else None
        mesa.nombre_pareja_uno = pareja_uno_obj.Nombre_pareja if pareja_uno_obj else None
        
        pareja_dos_obj = rankings.pop(0).pareja if rankings else None
        mesa.pareja_dos = pareja_dos_obj.id if pareja_dos_obj else None
        mesa.nombre_pareja_dos = pareja_dos_obj.Nombre_pareja if pareja_dos_obj else None
        
        mesa.save()
