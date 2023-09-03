from django.urls import path, include
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from mesas import views

router = routers.DefaultRouter()
router.register(r'mesas', views.MesasViewSet, basename='mesas')

urlpatterns = [ 
    path('api/v1/', include(router.urls)),
]