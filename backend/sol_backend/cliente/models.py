from django.db import models

class Cliente(models.Model):
    cnpj = models.CharField(max_length=18, unique=True)
    razao_social = models.TextField(max_length=255)
    email = models.EmailField(unique=True)
    cep = models.CharField(max_length=8)
    logradouro = models.TextField(max_length=88)
    complemento = models.TextField(max_length=88)
    municipio = models.TextField(max_length=88)
    uf = models.TextField(max_length=88)
    faturamento = models.DecimalField(max_digits=10, decimal_places=2)
    site=models.TextField(max_length=58)
    ddd = models.CharField(max_length=2, default='XX')
    telefone = models.CharField(max_length=9)
    image = models.ImageField(upload_to='images/',default='none')

    def __str__(self):
        return self.cnpj
    
class Fornecedor(models.Model):
    cnpj = models.CharField(max_length=18, unique=True)
    razao_social = models.TextField(max_length=255)
    email = models.EmailField(unique=True)
    cep = models.CharField(max_length=8)
    logradouro = models.TextField(max_length=88)
    complemento = models.TextField(max_length=88)
    municipio = models.TextField(max_length=88)
    uf = models.TextField(max_length=88)
    ddd = models.CharField(max_length=2, default='XX')
    telefone = models.CharField(max_length=9)

