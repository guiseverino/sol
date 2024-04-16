# Generated by Django 5.0.3 on 2024-04-16 12:20

import datetime
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cliente', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Fornecedor',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cnpj', models.CharField(max_length=18, unique=True)),
                ('razao_social', models.TextField(max_length=255)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('cep', models.CharField(max_length=8)),
                ('logradouro', models.TextField(max_length=88)),
                ('complemento', models.TextField(max_length=88)),
                ('municipio', models.TextField(max_length=88)),
                ('uf', models.TextField(max_length=88)),
                ('numero', models.TextField(max_length=6)),
                ('ddd', models.CharField(default='XX', max_length=2)),
                ('telefone', models.CharField(default='telefone', max_length=9)),
                ('nome_contato', models.TextField(default='nome contato', max_length=55)),
                ('comissao', models.DecimalField(decimal_places=2, max_digits=10)),
            ],
        ),
        migrations.AddField(
            model_name='cliente',
            name='ddd',
            field=models.CharField(default='XX', max_length=2),
        ),
        migrations.AddField(
            model_name='cliente',
            name='image',
            field=models.ImageField(default='none', upload_to='images/'),
        ),
        migrations.AddField(
            model_name='cliente',
            name='site',
            field=models.TextField(default='www.teste.com', max_length=58),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='cliente',
            name='telefone',
            field=models.CharField(default='telefone', max_length=9),
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
            ],
        ),
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome_item', models.CharField(max_length=33, unique=True)),
                ('fornecedor', models.ManyToManyField(through='cliente.Fornecimento', to='cliente.fornecedor')),
            ],
        ),
        migrations.AddField(
            model_name='fornecimento',
            name='item',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cliente.item'),
        ),
        migrations.CreateModel(
            name='ItemJob',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cliente.item')),
            ],
        ),
        migrations.CreateModel(
            name='Job',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome_job', models.TextField(max_length=200)),
                ('quantidade_item', models.IntegerField()),
                ('data_inicio', models.DateField(default=datetime.datetime.now)),
                ('data_termino', models.DateField(default=datetime.datetime.now)),
                ('honorario', models.FloatField()),
                ('cep', models.CharField(max_length=8)),
                ('logradouro', models.TextField(max_length=88)),
                ('complemento', models.TextField(max_length=88)),
                ('municipio', models.TextField(max_length=88)),
                ('uf', models.TextField(max_length=88)),
                ('numero', models.TextField(max_length=6)),
                ('documento', models.FileField(default='none', upload_to='documentos/')),
                ('cliente', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cliente.cliente')),
                ('item', models.ManyToManyField(through='cliente.ItemJob', to='cliente.item')),
            ],
        ),
        migrations.AddField(
            model_name='itemjob',
            name='job',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cliente.job'),
        ),
    ]
