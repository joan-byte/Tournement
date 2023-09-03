from rest_framework import serializers  
from .models import Mesa

class MesasSerializer(serializers.ModelSerializer):    
    class Meta:
        model = Mesa
        fields = '__all__'