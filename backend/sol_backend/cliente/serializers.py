from rest_framework import serializers
from .models import Cliente,Fornecedor,Item, Fornecimento,Job,ItemJob

# AQUI TRANFORMA EM JSON 
class ClienteSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)
    
    class Meta:
        model = Cliente 
        fields = ("id","cnpj","razao_social","email","cep","logradouro","complemento","municipio","uf","faturamento","site","ddd","telefone","image")

class FornecedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fornecedor
        fields = ("id","cnpj","razao_social","email","cep","logradouro","complemento","municipio","uf","ddd","telefone","nome_contato","comissao")

class ItemSerializer(serializers.ModelSerializer):
    fornecedor = serializers.PrimaryKeyRelatedField(queryset=Fornecedor.objects.all(), many=True) 
    class Meta:
        model = Item
        fields =("id","nome_item","fornecedor")

class JobSerializer(serializers.ModelSerializer):
    cliente = serializers.PrimaryKeyRelatedField(queryset=Cliente.objects.all()) 
    class Meta:
        model = Job
        fields = ("cliente","nome_job","item","data_inicio","data_termino","honorario","cep","logradouro","complemento","municipio","uf","numero","documento")

class ItemJobSerializer(serializers.ModelSerializer):
   item = ItemSerializer()
   job = JobSerializer()
   class Meta:
        model = ItemJob
        fields = ("item","job")

class FornecimentoSerializer(serializers.ModelSerializer):
    item = ItemSerializer()
    fornecedor = FornecedorSerializer()
    class Meta:
        model = Fornecimento
        fields =("item","fornecedor","quantidade_disponivel","descricao_item","valor_unitario","data_cotacao")