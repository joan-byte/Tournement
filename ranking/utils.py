
from django.db.models import F
from resultados.models import Resultado

def actualizar_ranking(ranking):
    # Calcula el número de partidas ganadas y la puntuación total
    resultados = Resultado.objects.filter(pareja=ranking.pareja)
    for resultado in resultados:
        if resultado.puntos > 0:
            ranking.partidas_ganadas = F('partidas_ganadas') + 1
        ranking.puntos = F('puntos') + resultado.puntos

    # Guarda los cambios en el ranking
    ranking.save()

    # Reordena la tabla de rankings
    rankings = ranking.__class__.objects.all().order_by('serieB', '-partidas_ganadas', '-puntos')
    for i, ranking in enumerate(rankings):
        ranking.rank = i + 1
        ranking.save()
