# Importaciones estándar para las vistas de Django y DRF
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Mesa
from .serializers import MesasSerializer
from inscripcion.models import Parejas  # Importando el modelo Parejas de la app inscripcion
from .utils import mesas_primera

class MesasViewSet(viewsets.ModelViewSet):
    # Especifica la fuente de datos (todos los objetos Mesa) y el serializador para el modelo Mesa
    queryset = Mesa.objects.all()
    serializer_class = MesasSerializer

    # Acción personalizada para ejecutar la función mesas_primera
    @action(detail=False, methods=['post'])
    def ejecutar_primera(self, request):
        # Aquí puedes acceder a los datos de Parejas si es necesario, por ejemplo:
        parejas = Parejas.objects.all()
        
        # Llamada a la función mesas_primera (ya definida en utils.py)
        mesas_primera()

        # Respuesta indicando que la función se ejecutó con éxito
        return Response({"message": "mesas_primera ejecutado con éxito"}, status=200)
