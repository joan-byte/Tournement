# Generated by Django 4.2.2 on 2023-07-03 13:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resultados', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='resultado',
            name='partida',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
