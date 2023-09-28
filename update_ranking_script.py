import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "domino.settings")

import django
django.setup()

from ranking.utils import actualizar_ranking
from ranking.models import Ranking
from resultados.models import Resultado
from inscripcion.models import Parejas

def main():
    print("Iniciando el script de población y actualización desde Resultados...")

    # Obteniendo todas las instancias de Resultado
    all_resultados = Resultado.objects.all()
    print(f"Total de registros Resultado encontrados: {all_resultados.count()}")

    # Creando y/o actualizando las entradas de Ranking basado en cada registro de Resultado
    for resultado in all_resultados:
        print(f"Procesando Resultado con ID: {resultado.id}")
        
        # Obtener instancia de Parejas para pareja_uno
        pareja_uno_instance = Parejas.objects.get(id=resultado.n_pareja_uno)
        
        # Procesando pareja_uno de Resultado
        ranking_pareja_uno, created = Ranking.objects.get_or_create(Numero_pareja=pareja_uno_instance)
        if created:
            print(f"Creado nuevo registro en Ranking para pareja_uno con número de pareja: {resultado.n_pareja_uno}")
        print(f"Actualizando Ranking de pareja_uno (ID: {ranking_pareja_uno.id}) basado en Resultado con ID: {resultado.id}")
        actualizar_ranking(resultado)  # Pasar el objeto Resultado
        
        # Procesando pareja_dos de Resultado
        if resultado.n_pareja_dos:  # Verificar si n_pareja_dos no es None
            # Obtener instancia de Parejas para pareja_dos
            pareja_dos_instance = Parejas.objects.get(id=resultado.n_pareja_dos)
            
            ranking_pareja_dos, created = Ranking.objects.get_or_create(Numero_pareja=pareja_dos_instance)
            if created:
                print(f"Creado nuevo registro en Ranking para pareja_dos con número de pareja: {resultado.n_pareja_dos}")
            print(f"Actualizando Ranking de pareja_dos (ID: {ranking_pareja_dos.id}) basado en Resultado con ID: {resultado.id}")
            actualizar_ranking(resultado)

    print("Finalizó el script de población y actualización desde Resultados.")

if __name__ == "__main__":
    main()
