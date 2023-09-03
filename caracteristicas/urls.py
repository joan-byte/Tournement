
from django.urls import path, include
from rest_framework import routers
from caracteristicas import views 

router = routers.DefaultRouter()
router.register(r'caracteristicas', views.ConfiguracionViewSet, basename='caracteristicas')

urlpatterns = [
    path('api/v1/', include(router.urls)),
]
    