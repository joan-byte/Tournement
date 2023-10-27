from rest_framework import viewsets, generics

from .models import Ranking
from .serializers import RankingSerializer

class RankingViewSset(viewsets.ModelViewSet):
    queryset = Ranking.objects.all()
    serializer_class = RankingSerializer

class RankingListCreateView(generics.ListCreateAPIView):
    queryset = Ranking.objects.all().order_by('serieB', '-partidas_ganadas', '-puntos')
    serializer_class = RankingSerializer
    
# Create your views here.
