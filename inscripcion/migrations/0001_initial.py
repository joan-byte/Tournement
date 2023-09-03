# Generated by Django 4.2.2 on 2023-07-01 09:26

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Parejas',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Jugador1', models.CharField(max_length=50)),
                ('Jugador2', models.CharField(max_length=50)),
                ('Club_pertenencia', models.CharField(max_length=50)),
                ('Numero_pareja', models.IntegerField(default=0)),
                ('Nombre_pareja', models.CharField(blank=True, max_length=200)),
            ],
        ),
    ]