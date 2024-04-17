from rest_framework import viewsets
from .models import Cliente, Fornecedor, Item, Fornecimento, ItemJob, Job
from .serializers import ClienteSerializer, FornecedorSerializer, FornecimentoSerializer, ItemSerializer, JobSerializer, ItemJobSerializer
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status


class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
   

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
   
    
class ItemJobViewSet(viewsets.ModelViewSet):
    queryset = ItemJob.objects.all()
    serializer_class = ItemJobSerializer
    def add_item_to_job(self, request, pk=None):
        # Recupera o ID do Job da URL
        job_id = pk
        # Obtém o ID do item do corpo da solicitação
        item_id = request.data.get('item')
        try:
            # Recupera o objeto Job com base no ID fornecido na URL
            job = Job.objects.get(pk=job_id)            
            # Verifica se já existe um ItemJob com a mesma combinação de item e job
            if ItemJob.objects.filter(job=job, item_id=item_id).exists():
                return Response({'error': 'This item is already assigned to this job.'}, status=status.HTTP_400_BAD_REQUEST)
            # Cria uma nova associação entre o item e o job utilizando o modelo ItemJob
            item_job = ItemJob.objects.create(job=job, item_id=item_id)
            serializer = self.get_serializer(item_job)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        except Job.DoesNotExist:
            return Response({'error': 'Job not found.'}, status=status.HTTP_404_NOT_FOUND)

class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer

class FornecedorViewSet(viewsets.ModelViewSet):
    queryset = Fornecedor.objects.all()
    serializer_class = FornecedorSerializer

class FornecimentoViewSet(viewsets.ModelViewSet):
    queryset = Fornecimento.objects.all()
    serializer_class = FornecimentoSerializer
