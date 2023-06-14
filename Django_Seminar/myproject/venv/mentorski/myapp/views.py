from django.shortcuts import render
from .forms import korisniciForm, SubjectForm, upisiForm, addSubjectForm
from .models import Korisnici, Upisi, Predmeti
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect
from django.contrib.auth import authenticate, login
from django.contrib import messages
from django.contrib.auth.views import LoginView, LogoutView
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model
from .mydecorators import mentor_required, student_required
User = get_user_model()

#za home_page stranicu
def home_view(request):
    return render(request, 'home_page.html')

#view za login stranicu
def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)
        if user is not None and user.is_active and user.is_authenticated:
            login(request, user)
            if user.role == 'mentor':  # ako je login uspjesan ide se na mentor_home 
                 students = Korisnici.objects.filter(role='student')  # svi studenti
                 return render(request, 'user_home.html', {'students':students}) 
            else:
                return render(request, 'user_home.html', {'student':user})  # student_home
    return render(request, 'login.html')  # neuspjesan login ostaje se na istoj stranici

# dodavanje novoga korisnika
@mentor_required #samo mentor moze dodati korisnika
def korisnici_view(request):
    if request.method == 'GET':
        korisnici_form = korisniciForm()
        return render(request, 'add_user.html', {'form':korisnici_form})
    elif request.method == 'POST':
        korisnici_form = korisniciForm(request.POST)
        if korisnici_form.is_valid():
            korisnici_form.save()
            return redirect('all_students')
        else:
            return HttpResponseNotAllowed()

#view za dodavanje novoga predmeta
@login_required
@mentor_required
def add_subject(request):
    if request.method == 'GET':
        subject_form = SubjectForm()
        return render(request, 'add_subject.html', {'form':subject_form})
    elif request.method == 'POST':
        subject_form = SubjectForm(request.POST)
        if subject_form.is_valid():
            subject_form.save()
            return redirect('all_subjects')
        else:
            return HttpResponseNotAllowed()

# view za registraciju
def register(request):
    if request.method == 'GET':
        userForm = korisniciForm()
        return render(request, 'register.html', {'form':userForm})
    elif request.method == 'POST':
        userForm = korisniciForm(request.POST)
        if userForm.is_valid():
            userForm.save()
            return redirect('login')
        else:
            return render(request, 'register.html', {'form':userForm})
    else:
        return HttpResonseNotAllowed()

# view za ispis svih studenta
@login_required
@mentor_required
def all_students(request):
    student = Korisnici.objects.filter(role='student') # samo studenti
    return render(request, 'all_students.html', {'students':student})

#view za prikaz svih predmeta
@login_required
@mentor_required
def all_subjects(request):
    all_subjects = Predmeti.objects.all()   # svi predmeti 
    return render(request, 'all_subjects.html', {'subjects':all_subjects})

#view za promjenu polja iz predmeta
@login_required
@mentor_required
def subject_update(request, predmet_id):
    subject = Predmeti.objects.get(id=predmet_id) #dohvaca se odabrani predmet po predmet_id
    if request.method == 'GET':
        subject_data = SubjectForm(instance=subject)
        return render(request, 'subject_update.html', {'form':subject_data}) 
    elif request.method == 'POST':
        subject_data = SubjectForm(request.POST, instance=subject)
        if subject_data.is_valid():
            subject_data.save()
            return redirect("all_subjects")

#view za prikaz detalja predmeta
@login_required
@mentor_required
def subject_detail(request, predmet_id):
    subject = Predmeti.objects.get(id=predmet_id) #dohvaca se odabrani predmet
    return render(request, 'subject_detail.html', {'subject': subject})

#view za upisni list 
@login_required
def enrollment_form(request, student_id):
    student = Korisnici.objects.get(id = student_id)  # student - da se zna ciji upisni list se treba otvoriti
    form = Upisi.objects.filter(student_id_id=student_id) # upisni list kako bi se izbacio spisak upisanih predmeta
    #sub = Predmeti.objects.all() # svi predmeti
    enroll_subjects = Predmeti.objects.filter(id__in=form.values('predmet_id_id'))
    #enroll =Predmeti.objects.filter(id__in=form.values('predmet_id_id'))
    subject=Predmeti.objects.exclude(id__in=form.values('predmet_id_id'))
    return render(request, 'enrollment_form.html', {'form': form, 'student': student, 'subjects': subject, 'enroll_subjects':enroll_subjects})

def student_detail(request, student_id):
    student = Korisnici.objects.get(id = student_id)  # student - da se zna ciji upisni list se treba otvoriti
    return render(request, 'student_detail.html', {'student': student})

#view za brisanje upisanog predmeta
@login_required
def delete_subject(request, student_id, predmet_id):
    subject = Upisi.objects.get(predmet_id_id=predmet_id, student_id_id = student_id)
    subject.delete()
    return redirect ('enrollment_form', student_id)

@login_required
@mentor_required
#brisanje predmeta iz Predmeti
def deleteSubject(request, predmet_id):
    subject = Predmeti.objects.get(id=predmet_id)
    subject.delete()
    return redirect ('all_subjects')  

#view za promjenu statusa predmeta 
@login_required
def edit_status(request, student_id, predmet_id):
    subject = Upisi.objects.get(predmet_id_id=predmet_id, student_id_id = student_id)
    if request.method == 'GET':
        subject_data = addSubjectForm(instance=subject)
        return render(request, 'edit_status.html', {'form':subject_data})
    elif request.method == 'POST':
        subject_data = addSubjectForm(request.POST, instance=subject)
        if subject_data.is_valid():
            subject_data.save()
            return redirect("enrollment_form", student_id)

#dodavanje upisanog predmeta
@login_required
def add_new_subject(request, student_id, predmet_id):
    subject = Predmeti.objects.get(id=predmet_id)
    student = Korisnici.objects.get(id=student_id)
    if request.method == 'GET':
        return render(request, 'add_new_subject.html', {'status': 'enrolled', 'subject':subject, 'student':student})
    elif request.method == 'POST':
            f = Upisi(status='enrolled', predmet_id_id=subject.id, student_id_id=student.id)
            f.save()
            return redirect("enrollment_form", student_id)
    return redirect ("enrollment_form", student_id)
