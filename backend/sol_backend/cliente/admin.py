from django.contrib import admin
from .models import Cliente, Fornecedor, Item, Fornecimento, Job, ItemJob
admin.site.register(Cliente)
admin.site.register(Fornecedor)
admin.site.register(Item)
admin.site.register(Job)
admin.site.register(ItemJob)
admin.site.register(Fornecimento)
