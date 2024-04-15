from django.urls import path
# from cliente.views import ClienteListAPIView,ClienteDetailView
from cliente.views import ClienteViewSet, FornecedorViewSet, FornecimentoViewSet, ItemJobViewSet,ItemViewSet, JobViewSet
from rest_framework.routers import DefaultRouter

router =  DefaultRouter()
router.register("cliente",ClienteViewSet,basename="cliente")
router.register("fornecedor",FornecedorViewSet,basename="fornecedor")
router.register("item",ItemViewSet,basename="item")
router.register("job",JobViewSet,basename="job")
router.register("itemjob",ItemJobViewSet,basename="itemjob")
router.register("fornecimento",FornecimentoViewSet,basename="fornecimento")
# router.register("cotacao",CotacaoViewSet,basename="cotacao")
urlpatterns = router.urls

