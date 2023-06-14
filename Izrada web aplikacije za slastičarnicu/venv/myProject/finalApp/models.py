from django.db import models
from enum import *
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractUser
from datetime import datetime
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
import datetime


#user table 
class User(AbstractUser):
    firstName = models.CharField(max_length=30, verbose_name = _("Firstname"), blank=False)
    lastName = models.CharField(max_length=30, verbose_name = _("Lastname"), blank=False)
    address = models.CharField(max_length=30, verbose_name = _("Address"), blank=False)
    phoneNumber = models.CharField(max_length=25, verbose_name = _("Phone"), blank=False)

    class roleTypes(models.TextChoices):
        admin = 'admin', _('admin')
        user = 'user', _('user')
        
    role = models.CharField(max_length=255, choices=roleTypes.choices, default=roleTypes.user)

class CakeCategory(models.Model):
    name = models.CharField(max_length=50, unique = True, verbose_name = _("Name"))

#product table for products that will be shown on website 
class Product(models.Model):
    name = models.CharField(max_length=50, unique = True, verbose_name = _("Name"))
    price = models.DecimalField(max_digits=6, decimal_places=2, verbose_name = _("Price"), blank=False)
    description = models.TextField(verbose_name = _("Description"), blank=True)
    image = models.ImageField(upload_to='images/')
    update_on = models.DateTimeField(default=datetime.datetime.now())
    cakeCategory = models.ForeignKey(CakeCategory, on_delete=models.CASCADE)

# shopping cart table for ordering products
class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=datetime.datetime.now())

#shopping cart item table which present user order
class CartItem(models.Model):
    #user = models.ForeignKey(User, on_delete=models.CASCADE)
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    #productPrice = models.FloatField(blank=True)
    productQuantity = models.IntegerField(default=1)

    TAX_AMOUNT = 19.25

    def price_ttc(self):
        return self.productPrice * (1 + TAX_AMOUNT/100.0)


#shipping details table to ship and tracking orders
class Shipping(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    street = models.CharField(max_length=50, verbose_name = _("Street"), blank=False)
    streetNumber = models.IntegerField(verbose_name = _("Street number"), blank=False)
    city = models.CharField(max_length=50, verbose_name = _("City"), blank=False)
    country = models.CharField(max_length=50, verbose_name = _("Country"), blank=False)
    details = models.TextField(blank=True)
       
# favourites 
class FavouritesItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    added_at = models.DateTimeField(default=datetime.datetime.now())
    
# order status 
class OrderStatus(models.Model):
    shipping = models.ForeignKey(Shipping, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    class statusTypes(models.TextChoices):
        confirmed = 'confirmed', _('confirmed')
        preparation = 'preparation', _('preparation')
        delivery = 'delivery', _('delivery')
        shipped = 'shipped', _('shipped')

    update_on = models.DateTimeField(default=datetime.datetime.now())
    status = models.CharField(max_length=255, choices=statusTypes.choices, default=statusTypes.confirmed)