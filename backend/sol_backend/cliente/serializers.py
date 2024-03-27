from rest_framework import serializers
from .models import Cliente,Fornecedor

#Convertendo para Json
class ClienteSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)
    
    class Meta:
        model = Cliente 
        fields = ("id","cnpj","razao_social","email","cep","logradouro","complemento","municipio","uf","faturamento","site","ddd","telefone","image")

class FornecedorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Fornecedor
        fields = ("id","cnpj","razao_social","email","cep","logradouro","complemento","municipio","uf","ddd","telefone")