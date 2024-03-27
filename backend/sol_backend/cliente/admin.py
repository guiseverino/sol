from django.contrib import admin
from cliente.models import Cliente,Fornecedor

# Register your models here.
admin.site.register(Cliente)
admin.site.register(Fornecedor)