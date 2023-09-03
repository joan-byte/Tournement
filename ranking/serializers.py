from rest_framework import serializers  
from .models import Ranking

class RankingSerializer(serializers.ModelSerializer):    
    class Meta:
        model = Ranking 
        fields = '__all__'