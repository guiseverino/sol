from .models import Cliente,Fornecedor
from .serializers import ClienteSerializer,FornecedorSerializer
from rest_framework import viewsets

# Criando a API de cliente
#POST
class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer

class FornecedorViewSet(viewsets.ModelViewSet):
    queryset = Fornecedor.objects.all()
    serializer_class = FornecedorSerializer
