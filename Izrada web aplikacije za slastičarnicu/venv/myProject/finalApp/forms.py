from django.forms import ModelForm
from .models import Product, Cart, Shipping, User, CartItem, FavouritesItem, OrderStatus, CakeCategory
from django.contrib.auth.forms import AuthenticationForm
from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.forms import Form

import datetime


from django.contrib.auth import get_user_model
ser = get_user_model()

# registration form
class userForm(UserCreationForm):
    class Meta:
        model = User
        fields = [
            'username',
            'firstName',
            'lastName',
           # 'role', 
            'address',
            'phoneNumber'
      ]
    def __init__(self, *args, **kwargs):
      super(userForm, self).__init__(*args, **kwargs)
      for field in self.fields:
         self.fields[field].widget.attrs['class'] = 'updateForm'
         self.fields[field].help_text = ''
      

# product Form
class cakeCategoryForm(ModelForm):
    class Meta:
        model = CakeCategory
        fields = ['name']

    def __init__(self, *args, **kwargs):
      super(cakeCategoryForm, self).__init__(*args, **kwargs)
      for field in self.fields:
         self.fields[field].widget.attrs['class'] = 'updateForm'

# product Form
class productForm(ModelForm):
    class Meta:
        model = Product
        fields = ['name', 'price', 'description', 'image', 'update_on']

    def __init__(self, *args, **kwargs):
      super(productForm, self).__init__(*args, **kwargs)
      for field in self.fields:
         self.fields[field].widget.attrs['class'] = 'updateForm'

# cart form
class cartForm(ModelForm):
    class Meta:
        model = Cart
        fields = ['user','created_at']

    def __init__(self, *args, **kwargs):
      super(carForm, self).__init__(*args, **kwargs)
      for field in self.fields:
         self.fields[field].widget.attrs['class'] = 'updateForm'

# cartItem form
class cartItemForm(ModelForm):
    class Meta:
        model = CartItem
        fields = ['productQuantity']

    def __init__(self, *args, **kwargs):
      super(cartItemForm, self).__init__(*args, **kwargs)
      for field in self.fields:
         self.fields[field].widget.attrs['class'] = 'updateForm'


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
       
# payment options 
class PaymentOptions(forms.Form):
    choices = [('cod', 'cod'), ('card', 'card')]

    paymentOptions = forms.ChoiceField(choices=choices, widget=forms.RadioSelect)




#card details      
class cardDetails(forms.Form):
    cardNumber = forms.IntegerField(label='Card number', required=True, error_messages={'required': 'Please enter your card number'}, min_value=1000000000000000, max_value=10000000000000000)
    expirationDate = forms.DateField(label='Expiration Date', widget=forms.widgets.DateInput(attrs={'type': 'date'}), required=True, error_messages={'required': 'Please enter your card expiration date'})
    securityCode = forms.IntegerField(label='Security code', required=True, error_messages={'required': 'Please enter your card security code'}, min_value=100, max_value=1000)
    
    def __init__(self, *args, **kwargs):
      super(cardDetails, self).__init__(*args, **kwargs)
      for field in self.fields:
         self.fields[field].widget.attrs['class'] = 'updateFormCard'

#shipping form 
class shippingForm(ModelForm):
     class Meta:
        model = Shipping
        fields = ['city', 'country', 'street', 'streetNumber', 'details']

     def __init__(self, *args, **kwargs):
      super(shippingForm, self).__init__(*args, **kwargs)
      for field in self.fields:
         self.fields[field].widget.attrs['class'] = 'updateForm'
   # street = forms.CharField(max_length=50, label = "Street", required=True, error_messages={'required': 'Please enter your street'})
    #streetNumber = forms.IntegerField(label = "Street number", required=True, error_messages={'required': 'Please enter your street number'})
    #city = forms.CharField(max_length=50, label = "City", required=True, error_messages={'required': 'Please enter your city'})
    #country = forms.CharField(max_length=50, label = "Country", required=True, error_messages={'required': 'Please enter your country'})
    #details = forms.CharField(max_length=200, error_messages={'required': 'Please enter some extra details for your shipping'})


# favourites form
class favouritesForm(ModelForm):
    class Meta:
        model = FavouritesItem
        fields = ['user', 'product', 'added_at']

    def __init__(self, *args, **kwargs):
      super(favouritesForm, self).__init__(*args, **kwargs)
      for field in self.fields:
         self.fields[field].widget.attrs['class'] = 'updateForm'

# order status form
class orderStatusForm(ModelForm):
    class Meta:
        model = OrderStatus
        fields = ['status', 'update_on']

    def __init__(self, *args, **kwargs):
      super(orderStatusForm, self).__init__(*args, **kwargs)
      for field in self.fields:
         self.fields[field].widget.attrs['class'] = 'updateForm'

# taken order  
class takenOrderForm(forms.Form):
    choices = [('yes', 'yes'), ('no', 'no')]

    paymentOptions = forms.ChoiceField(choices=choices, widget=forms.RadioSelect)

    def __init__(self, *args, **kwargs):
      super(takenOrderForm, self).__init__(*args, **kwargs)
      for field in self.fields:
         self.fields[field].widget.attrs['class'] = 'updateForm'

class sort(forms.Form):
    choices = [('nameASC', 'by name(A-Z)'), ('nameDESC', 'by name(Z-A)'), ('cityASC', 'by city(A-Z)'), ('cityDESC', 'by city(Z-A)'), ('update', 'by date')]
    sort = forms.ChoiceField(choices=choices)


class sortUser(forms.Form):
    choices = [('firstnameASC', 'by firstname(A-Z)'), ('firstnameDESC', 'by firstname(Z-A)'), ('lastnameASC', 'by lastname(A-Z)'), ('lastnameDESC', 'by lastname(Z-A)'),('addressASC', 'by address(A-Z)'), ('addressDESC', 'by address(Z-A)')]
    sort = forms.ChoiceField(choices=choices)