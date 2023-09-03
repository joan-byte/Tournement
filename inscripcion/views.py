from rest_framework import viewsets
from .models import Parejas
from .serializers import InscripcionParejasSerializer

class InscripcionParejasViewSet(viewsets.ModelViewSet):
    queryset = Parejas.objects.all()
    serializer_class = InscripcionParejasSerializer