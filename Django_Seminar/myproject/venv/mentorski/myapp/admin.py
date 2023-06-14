from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Korisnici


# Register your models here.

from .models import Korisnici, Predmeti, Upisi

#admin.site.register(Korisnici)
admin.site.register(Predmeti)
admin.site.register(Upisi)
admin.site.register(Korisnici, UserAdmin)

