from django.contrib import admin
from .models import Mesa

class MesaAdmin(admin.ModelAdmin):
    list_display = ('numero', 'partida')

admin.site.register(Mesa, MesaAdmin)
