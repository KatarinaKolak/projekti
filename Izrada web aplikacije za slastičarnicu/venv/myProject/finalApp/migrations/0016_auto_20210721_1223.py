# Generated by Django 3.2 on 2021-07-21 10:23

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('finalApp', '0015_auto_20210721_1222'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cart',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2021, 7, 21, 12, 23, 19, 563739)),
        ),
        migrations.AlterField(
            model_name='favouritesitem',
            name='added_at',
            field=models.DateTimeField(default=datetime.datetime(2021, 7, 21, 12, 23, 19, 575741)),
        ),
        migrations.AlterField(
            model_name='orderstatus',
            name='update_on',
            field=models.DateTimeField(default=datetime.datetime(2021, 7, 21, 12, 23, 19, 581741)),
        ),
    ]
