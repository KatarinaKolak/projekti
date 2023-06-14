from .models import User
from django.shortcuts import redirect

def user_required(function):
    def wrap(request, *args, **kwargs):
        if request.user.role == 'user':
            return function(request, *args, **kwargs) # can access 
        else:
            return redirect('homePage')  # cannot access 
    return wrap

def admin_required(function):
    def wrap(request, *args, **kwargs):
        if request.user.role == 'admin': # can access 
            return function(request, *args, **kwargs)
        else:
            return redirect('homePage') # cannot access
    return wrap


