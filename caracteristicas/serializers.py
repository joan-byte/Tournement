from rest_framework import serializers
from .models import caracteristicas_campeonato

class ConfiguracionSerializer(serializers.ModelSerializer): 
    class Meta:
        model = caracteristicas_campeonato   
        fields = '__all__'
        