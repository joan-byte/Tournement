from django.db.models import F
from resultados.models import Resultado
from inscripcion.models import Parejas  

previous_points = {}

def actualizar_ranking(resultado):
    from .models import Ranking

    # Actualizar el ranking de la pareja_uno si es válido
    if resultado.n_pareja_uno:
        pareja_uno_instance, created = Parejas.objects.get_or_create(id=resultado.n_pareja_uno)
        ranking_pareja_uno, _ = Ranking.objects.get_or_create(Numero_pareja=pareja_uno_instance)
        ranking_pareja_uno.Nombre_pareja = resultado.nombre_pareja_uno
        
        # Si es una modificación, establece los puntos al valor actual del resultado
        if resultado.pk:
            ranking_pareja_uno.puntos = resultado.puntos_pareja_uno
        else:
            ranking_pareja_uno.puntos += resultado.puntos_pareja_uno

        ranking_pareja_uno.partida = resultado.partida
        if resultado.puntos_pareja_uno > 0:
            ranking_pareja_uno.partidas_ganadas = 1
        else:
            ranking_pareja_uno.partidas_ganadas = 0
        
        ranking_pareja_uno.save()

    # Actualizar el ranking de la pareja_dos si es válido
    if resultado.n_pareja_dos:
        pareja_dos_instance, created = Parejas.objects.get_or_create(id=resultado.n_pareja_dos)
        ranking_pareja_dos, _ = Ranking.objects.get_or_create(Numero_pareja=pareja_dos_instance)
        ranking_pareja_dos.Nombre_pareja = resultado.nombre_pareja_dos

        # Si es una modificación, establece los puntos al valor actual del resultado
        if resultado.pk:
            ranking_pareja_dos.puntos = resultado.puntos_pareja_dos
        else:
            ranking_pareja_dos.puntos += resultado.puntos_pareja_dos

        ranking_pareja_dos.partida = resultado.partida
        if resultado.puntos_pareja_dos > 0:
            ranking_pareja_dos.partidas_ganadas = 1
        else:
            ranking_pareja_dos.partidas_ganadas = 0

        ranking_pareja_dos.save()

    # Reordenar el ranking
    all_rankings = Ranking.objects.all().order_by('serieB', '-partidas_ganadas', '-puntos')
    rank_position = 1
    for ranking in all_rankings:
        ranking.rank = rank_position
        ranking.save()
        rank_position += 1
