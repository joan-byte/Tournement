# Generated by Django 4.2.2 on 2023-09-23 10:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mesas', '0007_remove_mesa_resultado_mesa_resultado_id'),
        ('resultados', '0005_alter_resultado_mesa'),
    ]

    operations = [
        migrations.AlterField(
            model_name='resultado',
            name='mesa',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='resultados', to='mesas.mesa'),
        ),
    ]
