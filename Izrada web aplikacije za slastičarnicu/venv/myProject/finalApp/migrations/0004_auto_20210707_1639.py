# Generated by Django 3.2 on 2021-07-07 14:39

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('finalApp', '0003_auto_20210618_1634'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='shipping',
            name='address',
        ),
        migrations.RemoveField(
            model_name='shipping',
            name='product',
        ),
        migrations.AddField(
            model_name='shipping',
            name='cart',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='finalApp.cart'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='shipping',
            name='city',
            field=models.CharField(default=1, max_length=50, verbose_name='City'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='shipping',
            name='country',
            field=models.CharField(default=1, max_length=50, verbose_name='Country'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='shipping',
            name='street',
            field=models.CharField(default=1, max_length=50, verbose_name='Street'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='shipping',
            name='streetNumber',
            field=models.IntegerField(default=1, verbose_name='Street number'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='cart',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2021, 7, 7, 16, 39, 10, 422073)),
        ),
    ]
