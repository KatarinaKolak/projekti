# Generated by Django 3.1 on 2020-08-23 09:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0004_auto_20200822_1504'),
    ]

    operations = [
        migrations.AlterField(
            model_name='upisi',
            name='status',
            field=models.CharField(choices=[('upisan', 'upisan'), ('polozeno', 'polozeno'), ('nepolozeno', 'nepolozeno')], default='nepolozeno', max_length=64),
        ),
    ]
