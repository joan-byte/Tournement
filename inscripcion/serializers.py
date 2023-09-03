from rest_framework import serializers  
from .models import Parejas

class InscripcionParejasSerializer(serializers.ModelSerializer):    
    class Meta:
        model = Parejas
        fields = '__all__'
        