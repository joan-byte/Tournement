from django.db.models import F
from resultados.models import Resultado
from inscripcion.models import Parejas  

previous_points = {}

def actualizar_ranking(resultado):
    from .models import Ranking

    # Actualizar el ranking de la pareja_uno si es válido
    if resultado.n_pareja_uno:
        pareja_uno_instance, created = Parejas.objects.get_or_create(id=resultado.n_pareja_uno)
        if created:
            print(f"Creada nueva instancia de Parejas para pareja_uno con número {resultado.n_pareja_uno}")
        ranking_pareja_uno, _ = Ranking.objects.get_or_create(Numero_pareja=pareja_uno_instance)
        ranking_pareja_uno.Nombre_pareja = resultado.nombre_pareja_uno
        ranking_pareja_uno.puntos = (ranking_pareja_uno.puntos if ranking_pareja_uno.puntos else 0) + resultado.puntos_pareja_uno
        ranking_pareja_uno.partida = (ranking_pareja_uno.partida if ranking_pareja_uno.partida else 0) + 1
        if resultado.puntos_pareja_uno > 0:
            ranking_pareja_uno.partidas_ganadas = 1
        else:
            ranking_pareja_uno.partidas_ganadas = 0
        
        # Restar puntos anteriores si existen
        if resultado.pk in previous_points:
            ranking_pareja_uno.puntos -= previous_points[resultado.pk]['pareja_uno']

        ranking_pareja_uno.save()
        print(f"Pareja uno ({resultado.n_pareja_uno}): {resultado.puntos_pareja_uno} puntos.")

    # Actualizar el ranking de la pareja_dos si es válido
    if resultado.n_pareja_dos:
        pareja_dos_instance, created = Parejas.objects.get_or_create(id=resultado.n_pareja_dos)
        if created:
            print(f"Creada nueva instancia de Parejas para pareja_dos con número {resultado.n_pareja_dos}")
        ranking_pareja_dos, _ = Ranking.objects.get_or_create(Numero_pareja=pareja_dos_instance)
        ranking_pareja_dos.Nombre_pareja = resultado.nombre_pareja_dos
        ranking_pareja_dos.puntos = (ranking_pareja_dos.puntos if ranking_pareja_dos.puntos else 0) + resultado.puntos_pareja_dos
        ranking_pareja_dos.partida = (ranking_pareja_dos.partida if ranking_pareja_dos.partida else 0) + 1
        if resultado.puntos_pareja_dos > 0:
            ranking_pareja_dos.partidas_ganadas = 1
        else:
            ranking_pareja_dos.partidas_ganadas = 0
        
        # Restar puntos anteriores si existen
        if resultado.pk in previous_points:
            ranking_pareja_dos.puntos -= previous_points[resultado.pk]['pareja_dos']

        ranking_pareja_dos.save()
        print(f"Pareja dos ({resultado.n_pareja_dos}): {resultado.puntos_pareja_dos} puntos.")

    # Reordenar el ranking
    all_rankings = Ranking.objects.all().order_by('serieB', '-partidas_ganadas', '-puntos')
    rank_position = 1
    for ranking in all_rankings:
        ranking.rank = rank_position
        ranking.save()
        rank_position += 1
