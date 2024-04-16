import datetime
from django.db import models

class Cliente(models.Model):
    cnpj = models.CharField(max_length=18, unique=True)
    razao_social = models.TextField(max_length=255)
    email = models.EmailField(unique=True)
    cep = models.CharField(max_length=8)
    logradouro = models.TextField(max_length=88)
    complemento = models.TextField(max_length=88)
    municipio = models.TextField(max_length=88)
    uf = models.TextField(max_length=2)
    faturamento = models.DecimalField(max_digits=10, decimal_places=2)
    site=models.TextField(max_length=58)
    ddd = models.CharField(max_length=2, default='XX')
    telefone = models.CharField(max_length=9, default='telefone')
    image = models.ImageField(upload_to='images/',default='none')

    def __str__(self):
        return f"{self.cnpj} - {self.razao_social}"
    
class Fornecedor(models.Model):
    cnpj = models.CharField(max_length=18, unique=True)
    razao_social = models.TextField(max_length=255)
    email = models.EmailField(unique=True)
    cep = models.CharField(max_length=8)
    logradouro = models.TextField(max_length=88)
    complemento = models.TextField(max_length=88)
    municipio = models.TextField(max_length=88)
    uf = models.TextField(max_length=2)
    numero = models.TextField(max_length=6)
    ddd = models.CharField(max_length=2, default='XX')
    telefone = models.CharField(max_length=9, default='telefone')
    nome_contato = models.TextField(max_length=55,default='nome contato')
    comissao = models.DecimalField(max_digits=10, decimal_places=2)
    def __str__(self):
        return f"{self.cnpj} - {self.razao_social}"


class Item(models.Model):
    nome_item = models.CharField(max_length=33,  unique=True)
    fornecedor = models.ManyToManyField(Fornecedor,through="Fornecimento")

    def __str__(self):
        return self.nome_item

class Job(models.Model):
    cliente = models.ForeignKey(Cliente,on_delete=models.CASCADE)
    nome_job = models.TextField(max_length=200)
    item = models.ManyToManyField(Item, through='ItemJob') 
    itens = models.ForeignKey(Item, on_delete=models.SET_NULL, null=True, related_name='itens', verbose_name='Itens')
    quantidade_item = models.IntegerField()
    data_inicio = models.DateField(default=datetime.datetime.now)
    data_termino = models.DateField(default=datetime.datetime.now)
    honorario = models.FloatField()
    cep = models.CharField(max_length=8)
    logradouro = models.TextField(max_length=88)
    complemento = models.TextField(max_length=88)
    municipio = models.TextField(max_length=88)
    uf = models.TextField(max_length=2)
    numero = models.TextField(max_length=6)
    documento = models.FileField(upload_to='documentos/',default='none')

    def __str__(self):
        return self.nome_job

class ItemJob(models.Model):
    item = models.ForeignKey(Item,on_delete=models.CASCADE)
    job = models.ForeignKey(Job,on_delete=models.CASCADE)
    def __str__(self):
        return f"{self.item.nome_item} - {self.job.nome_job}"

class Fornecimento(models.Model):
    item = models.ForeignKey(Item,on_delete=models.CASCADE)
    fornecedor = models.ForeignKey(Fornecedor,on_delete=models.CASCADE)
    quantidade_disponivel = models.IntegerField()
    descricao_item = models.CharField(max_length=256)
    # locado = models.BooleanField(default=False)
    # valor_locacao = models.FloatField()
    valor_unitario = models.FloatField()
    # prazo_intalacao = models.DateField(default=datetime.datetime.now)
    data_cotacao = models.DateField(default=datetime.datetime.now)
    def __str__(self):
        return f"{self.item.nome_item} - {self.fornecedor.razao_social}"



    
    

