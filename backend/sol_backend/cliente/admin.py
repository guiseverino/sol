from django.contrib import admin
from cliente.models import Cliente,Fornecedor,Item, Fornecimento,Job,ItemJob
# Register your models here.
admin.site.register(Cliente)
admin.site.register(Fornecedor)
admin.site.register(Item)
admin.site.register(Job)
admin.site.register(ItemJob)
admin.site.register(Fornecimento)
# admin.site.register(ItemDoJob)
# admin.site.register(Cotacao)