from rest_framework import viewsets
from .models import Ranking
from .serializers import RankingSerializer

class RankingViewSset(viewsets.ModelViewSet):
    queryset = Ranking.objects.all()
    serializer_class = RankingSerializer


# Create your views here.
