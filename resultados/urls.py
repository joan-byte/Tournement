from django.urls import path, include
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from resultados import views

router = routers.DefaultRouter()
router.register(r'resultados', views.ResultadosViewSet, basename='resultados')

urlpatterns = [
    path('api/v1/', include(router.urls)),
]


