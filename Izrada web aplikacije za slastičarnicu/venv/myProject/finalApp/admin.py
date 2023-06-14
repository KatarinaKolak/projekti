from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User


from .models import Product, Cart, Shipping

admin.site.register(Product)
admin.site.register(Cart)
admin.site.register(Shipping)
admin.site.register(User, UserAdmin)

