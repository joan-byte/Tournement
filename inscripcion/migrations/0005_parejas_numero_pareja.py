# Generated by Django 4.2.2 on 2023-09-27 14:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inscripcion', '0004_remove_parejas_numero_pareja'),
    ]

    operations = [
        migrations.AddField(
            model_name='parejas',
            name='Numero_pareja',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
    ]
