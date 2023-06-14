import django_filters
from .models import Product, CakeCategory
from django import forms
from django.contrib.auth.models import User, Group

class productFilter(django_filters.FilterSet):
    #name = django_filters.CharFilter(label='Name', lookup_expr='icontains')
    #description = django_filters.CharFilter(label='Description', lookup_expr='icontains')
    #price = django_filters.NumberFilter(lookup_expr='icontains')
    price__gt = django_filters.NumberFilter(label='Price greater:', field_name='price', lookup_expr='gt')
    price__lt = django_filters.NumberFilter(label='Price less:', field_name='price', lookup_expr='lt')
    
    #update_on = django_filters.DateFilter(field_name='update_on', lookup_expr='icontains')
    update_on__gt = django_filters.DateFilter(label='Date greater:', field_name='update_on',lookup_expr='gt', widget=forms.widgets.DateInput(attrs={'type': 'date'}))
    update_on__lt = django_filters.DateFilter(label='Date less:', field_name='update_on',lookup_expr='lt', widget=forms.widgets.DateInput(attrs={'type': 'date'}))
  #  cakeCategory = django_filters.ModelMultipleChoiceFilter(label='Category:', field_name='cakeCategory', queryset=CakeCategory.objects.all(),
   #     widget=forms.CheckboxSelectMultiple)

    class Meta:
        model = Product
        fields = ['price__gt', 'price__lt', 'update_on__gt', 'update_on__lt']


