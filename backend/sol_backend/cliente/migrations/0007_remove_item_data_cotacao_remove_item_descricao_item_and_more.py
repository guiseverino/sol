# Generated by Django 5.0.3 on 2024-04-15 17:24

import datetime
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cliente', '0006_itemfornecedor_quantidade_disponivel_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='item',
            name='data_cotacao',
        ),
        migrations.RemoveField(
            model_name='item',
            name='descricao_item',
        ),
        migrations.RemoveField(
            model_name='item',
            name='locado',
        ),
        migrations.RemoveField(
            model_name='item',
            name='prazo_intalacao',
        ),
        migrations.RemoveField(
            model_name='item',
            name='valor_fornecedor',
        ),
        migrations.RemoveField(
            model_name='item',
            name='valor_locacao',
        ),
        migrations.RemoveField(
            model_name='item',
            name='fornecedor',
        ),
        migrations.CreateModel(
            name='Fornecimento',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantidade_disponivel', models.IntegerField()),
                ('descricao_item', models.CharField(max_length=256)),
                ('valor_unitario', models.FloatField()),
                ('data_cotacao', models.DateField(default=datetime.datetime.now)),
                ('fornecedor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cliente.fornecedor')),
                ('item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cliente.item')),
            ],
        ),
        migrations.DeleteModel(
            name='ItemFornecedor',
        ),
        migrations.AddField(
            model_name='item',
            name='fornecedor',
            field=models.ManyToManyField(through='cliente.Fornecimento', to='cliente.fornecedor'),
        ),
    ]