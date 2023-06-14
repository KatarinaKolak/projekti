from .models import Korisnici
from django.shortcuts import redirect

def student_required(function):
    def wrap(request, *args, **kwargs):
        if request.user.role == 'student':
            return function(request, *args, **kwargs) # ako zadovoljava ulogu moze pristupiti
        else:
            return redirect('home_page')  # ako nije ide na pocetnu stranicu
    return wrap

def mentor_required(function):
    def wrap(request, *args, **kwargs):
        if request.user.role == 'mentor':
            return function(request, *args, **kwargs)
        else:
            return redirect('home_page')
    return wrap

