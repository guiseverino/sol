# Generated by Django 5.0.3 on 2024-04-15 18:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cliente', '0009_job_documento'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='fornecimento',
            name='job',
        ),
    ]
