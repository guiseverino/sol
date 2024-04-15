from .models import Cliente,Fornecedor,Item, Fornecimento, ItemJob, Job
from .serializers import ClienteSerializer,FornecedorSerializer, FornecimentoSerializer,ItemSerializer, JobSerializer
from rest_framework import viewsets

class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer

class FornecedorViewSet(viewsets.ModelViewSet):
    queryset = Fornecedor.objects.all()
    serializer_class = FornecedorSerializer

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer


class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

class ItemJobViewSet(viewsets.ModelViewSet):
    queryset = ItemJob.objects.all()
    serializer_class = JobSerializer
class FornecimentoViewSet(viewsets.ModelViewSet):
    queryset = Fornecimento.objects.all()
    serializer_class = FornecimentoSerializer



