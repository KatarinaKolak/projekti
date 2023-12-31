# Generated by Django 3.2 on 2021-06-18 14:34

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('finalApp', '0002_alter_product_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cart',
            name='product',
        ),
        migrations.RemoveField(
            model_name='cart',
            name='productPrice',
        ),
        migrations.RemoveField(
            model_name='cart',
            name='productQuantities',
        ),
        migrations.AddField(
            model_name='cart',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2021, 6, 18, 16, 34, 17, 504151)),
        ),
        migrations.CreateModel(
            name='CartItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('productPrice', models.FloatField(blank=True)),
                ('productQuantity', models.IntegerField(default=1)),
                ('cart', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='finalApp.cart')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='finalApp.product')),
            ],
        ),
    ]
