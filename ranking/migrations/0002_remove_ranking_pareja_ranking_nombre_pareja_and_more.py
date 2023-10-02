# Generated by Django 4.2.2 on 2023-09-23 15:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('inscripcion', '0004_remove_parejas_numero_pareja'),
        ('ranking', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ranking',
            name='pareja',
        ),
        migrations.AddField(
            model_name='ranking',
            name='Nombre_pareja',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='ranking',
            name='Numero_pareja',
            field=models.OneToOneField(default=0, on_delete=django.db.models.deletion.DO_NOTHING, to='inscripcion.parejas'),
        ),
    ]