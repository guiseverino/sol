# Generated by Django 5.0.3 on 2024-04-16 12:26

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cliente', '0002_fornecedor_cliente_ddd_cliente_image_cliente_site_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='fornecedor_principal',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='itens', to='cliente.fornecedor', verbose_name='Fornecedor Principal'),
        ),
    ]
