# Generated by Django 3.1 on 2020-08-22 11:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0002_auto_20200822_1329'),
    ]

    operations = [
        migrations.AlterField(
            model_name='korisnici',
            name='status',
            field=models.CharField(choices=[('none', 'none'), ('redovni', 'redovni'), ('izvanredni', 'izvanredni')], default='izvanredni', max_length=255),
        ),
    ]
