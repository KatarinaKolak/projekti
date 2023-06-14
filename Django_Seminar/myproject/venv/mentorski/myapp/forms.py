from django.forms import ModelForm
from .models import Korisnici, Predmeti, Upisi
from django.contrib.auth.forms import AuthenticationForm
from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.forms import Form


from django.contrib.auth import get_user_model
ser = get_user_model()

#model za registraciju
class korisniciForm(UserCreationForm):
    email = forms.EmailField()
    class Meta:
        model = Korisnici
        fields = [
            'username',
            'role', 
            'status'
      ]


#forma za upis predmeta
class upisiForm(ModelForm):
    class Meta:
        model = Upisi
        fields = ['status', 'predmet_id', 'student_id']

#forma za dodavanje predmeta
class addSubjectForm(ModelForm):
    class Meta:
        model = Upisi
        fields = ['status']
 
# forma za promjenu predmeta
class SubjectForm(ModelForm):
    class Meta:
        model = Predmeti
        fields = ['ime', 'kod', 'program', 'bodovi', 'sem_redovni', 'sem_izvanredni', 'izborni']

#login forma       
class UserLoginForm(AuthenticationForm):
    def __init__(self, *args, **kwargs):
        super(UserLoginForm, self).__init__(*args, **kwargs)

    username = forms.EmailField(widget=forms.TextInput(
        attrs={'class': 'form-control', 'placeholder': '', 'id': 'hello'}))
    password = forms.CharField(widget=forms.PasswordInput(
        attrs={
            'class': 'form-control',
            'placeholder': '',
            'id': 'hi',
        }
))
       

