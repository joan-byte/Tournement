from rest_framework import viewsets
from .models import Resultado
from .serializers import ResultadoSerializer

class ResultadosViewSet(viewsets.ModelViewSet):
    queryset = Resultado.objects.all()
    serializer_class = ResultadoSerializer


