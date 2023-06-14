from django.db import models
from enum import *
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractUser
from django.contrib.auth import get_user_model
# Create your models here.



# Create your models here.

class Korisnici(AbstractUser):
    #email = models.EmailField(unique = True, verbose_name = _("Email Addess"))
    class roleTypes(models.TextChoices):
        mentor = 'mentor', _('mentor')
        student = 'student', _('student')
        
    role = models.CharField(max_length=255, choices=roleTypes.choices, default=roleTypes.student)
    #username = models.CharField(max_length = 255, unique = True, verbose_name = _("Username"))
    
    class statusTypes(models.TextChoices):
        none = 'none', _('none')
        mentor = 'redovni', _('redovni')
        student = 'izvanredni', _('izvanredni')
    status = models.CharField(max_length=255, choices=statusTypes.choices, default=statusTypes.student)
    
    
        
   # role = models.CharField(max_length = 255, choices = roleTypes.choices())
  
    #status = EnumField('none', 'redovni', 'izvanredni')
   # trasaction_status = models.CharField(max_length=255, choices=TransactionStatus.choices())
    def __str__(self):
        return '%s %s' % (self.role, self.status)



class Predmeti(models.Model):
    ime = models.CharField(max_length=255)
    kod = models.CharField(max_length=16)
    program = models.TextField(max_length=255)
    bodovi = models.IntegerField()
    sem_redovni = models.IntegerField()
    sem_izvanredni = models.IntegerField()
    class izborniTypes(models.TextChoices):
        da = 'da', _('da')
        ne = 'ne', _('ne')
    izborni = models.CharField(max_length=255, choices=izborniTypes.choices, default=izborniTypes.da)

    def __str__(self):
        return '%s %s ' %(self.ime, self.kod)


class Upisi(models.Model):
    student_id =  models.ForeignKey(Korisnici, on_delete=models.CASCADE, related_name = 'student')
    predmet_id = models.ForeignKey(Predmeti, on_delete=models.CASCADE, related_name = 'subject')
    class statusTypes(models.TextChoices):
        enrolled = 'enrolled', _('enrolled')
        passed = 'passed', _('passed')
    status = models.CharField(max_length=64, choices=statusTypes.choices, default=statusTypes.passed)