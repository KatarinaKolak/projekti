"""myProject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from finalApp import views
from django.contrib.auth.views import LoginView, LogoutView
from finalApp.forms import UserLoginForm
from django_filters.views import FilterView
from finalApp.filters import productFilter

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', views.login_view, name='login'),
   # path('logout/', LogoutView.as_view(template_name='logout.html'), name = 'logout'),
   path('logout/<int:userId>', views.logout, name = 'logout'),
    path('register/', views.register, name='register'),
    path(
        'login/',
        views.LoginView.as_view(
            template_name="login.html",
            authentication_form=UserLoginForm
            ),
        name='login'),
    path('home/', views.orderByName, name='homePage'),
    path('addProduct/<int:cakeCategoryId>', views.addProduct, name='addProduct'),
    path('productUpdate/<int:productId>', views.productUpdate, name='productUpdate'),
    path('deleteProduct/<int:productId>', views.deleteProduct, name='deleteProduct'),
    path('userUpdate/<int:userId>', views.userUpdate, name='userUpdate'),
    path('deleteUser/<int:userId>', views.deleteUser, name='deleteUser'),
    path('addUser/', views.addUser, name='addUser'),
    path('searchResult/', views.searchProduct, name='searchResult'),
    path('search/', views.search, name='search'),
    path('addCart/', views.addCart, name='addCart'),
    path('listCart/', views.listCart, name='listCart'),
    path('cartUpdate/', views.cartUpdate, name='cartUpdate'),
    path('deleteCart/', views.deleteCart, name='deleteCart'),
    path('addCartItem/<int:cartId>/<int:productId>', views.addCartItem, name='addCartItem'),
    path('removeCartItem/<int:cartId>/<int:productId>', views.removeCartItem, name='removeCartItem'),
    path('listCartItem/<int:userId>', views.listCartItems, name='listCartItem'),
    path('cartItemUpdate/', views.cartItemUpdate, name='cartItemUpdate'),
    path('deleteCartItem/<int:cartItemId>/<int:userId>', views.deleteCartItem, name='deleteCartItem'),
    path('buy/<int:userId>', views.buy, name='buy'),
    path('cardPayment/<int:userId>', views.cardPayment, name='cardPayment'),
    path('codOrder/<int:userId>', views.codOrder, name='codOrder'),
    path('orderCompleted/<int:userId>', views.orderCompleted, name='orderCompleted'),
     path('finishOrder/<int:userId>', views.finishOrder, name='finishOrder'),
    path('addFavouriteItem/<int:userId>/<int:productId>', views.addFavouriteItem, name='addFavouriteItem'),
    path('listFavouriteItems/<int:userId>', views.listFavouriteItems, name='listFavouriteItems'),
    path('tracking/<int:userId>', views.orderByCity, name='tracking'),
    path('statusEdit/<int:orderStatusId>', views.statusEdit, name='statusEdit'),
    path('statusUpdate/', views.statusUpdate, name='statusUpdate'),
    path('removeFavouriteItems/<int:userId>/<int:productId>', views.removeFavouriteItems, name='removeFavouriteItems'),
    path('userConfirmed/<int:orderId>/<int:userId>', views.userConfirmed, name='userConfirmed'),
    path('filter/', views.filter, name='filter'),
    path('listUsers/', views.listUsers, name='listUsers'),
    path('listCategory/', views.listCategory, name='listCategory'),
    path('addCategory/', views.addCategory, name='addCategory'),
    path('deleteCategory/<int:categoryId>', views.deleteCategory, name='deleteCategory'),
    path('aboutUs/', views.aboutUs, name='aboutUs'),
    path('privacyPolicy/', views.privacyPolicy, name='privacyPolicy'),
    path('terms/', views.terms, name='terms'),
    path('help/', views.help, name='help'),
    path('filterProductsByCategory/<int:categoryId>', views.filterProductsByCategory, name='filterProductsByCategory'),
] + static(settings.MEDIA_URL, document_root= settings.MEDIA_ROOT)
