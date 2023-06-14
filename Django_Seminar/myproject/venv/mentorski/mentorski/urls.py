"""myproject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
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
from myapp import views
from django.contrib.auth.views import LoginView, LogoutView
from myapp.forms import UserLoginForm

urlpatterns = [
    path('', views.home_view),
    path('admin/', admin.site.urls),
    path('add_user/', views.korisnici_view, name='add_user'),
    path('home_page/', views.home_view, name='home_page'),
    path('add_subject/', views.add_subject, name='add_subject'),
    path('add_new_subject/<int:student_id>/<int:predmet_id>', views.add_new_subject, name='add_new_subject'),
    path('all_subjects/', views.all_subjects, name='all_subjects'),
    path('edit_status/<int:student_id>/<int:predmet_id>', views.edit_status, name='edit_status'),
    path('enrollment_form/<int:student_id>', views.enrollment_form, name='enrollment_form'),
    path('subject_detail/<int:predmet_id>', views.subject_detail, name='subject_detail'),
    path('student_detail/<int:student_id>', views.student_detail, name='student_detail'),
    path('subject_update/<int:predmet_id>', views.subject_update, name='subject_update'),
    path('delete_subject/<int:student_id>/<int:predmet_id>', views.delete_subject, name='delete_subject'),
    path('all_students/', views.all_students, name='all_students'),
    path('user_home/', views.login_view, name='user_home'),
    path('deleteSubject/<int:predmet_id>', views.deleteSubject, name='deleteSubject'),
    path('login/', views.login_view, name='login'),
    path('logout/', LogoutView.as_view(template_name='logout.html'), name = 'logout'),
    path('register/', views.register, name='register'),
    path(
        'login/',
        views.LoginView.as_view(
            template_name="login.html",
            authentication_form=UserLoginForm
            ),
        name='login'),
]
