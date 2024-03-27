from django.urls import path
# from cliente.views import ClienteListAPIView,ClienteDetailView
from cliente.views import ClienteViewSet,FornecedorViewSet
from rest_framework.routers import DefaultRouter

router =  DefaultRouter()
router.register("cliente",ClienteViewSet,basename="cliente")
router.register("fornecedor",FornecedorViewSet,basename="fornecedor")
urlpatterns = router.urls

