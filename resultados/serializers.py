from rest_framework import serializers  
from .models import Resultado

class ResultadoSerializer(serializers.ModelSerializer):    
    class Meta:
        model = Resultado 
        fields = '__all__'