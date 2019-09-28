from django.contrib import messages
from django.contrib.auth.models import User
from django.shortcuts import render
from django.views import View
from .models import Donation, Institution, Category


class LandingPage(View):
    def get(self, request):
        donations = Donation.objects.all()
        quantity = 0
        for donation in donations:
            quantity += donation.quantity
        supported_institutions = len(list(set([d.institution for d in donations])))
        foundations = Institution.objects.filter(type=0)
        NGOs = Institution.objects.filter(type=1)
        local_collections = Institution.objects.filter(type=2)
        return render(request, 'index.html', {'quantity': quantity,
                                              'supported_institutions': supported_institutions,
                                              'foundations': foundations,
                                              'NGOs': NGOs,
                                              'local_collections': local_collections})


class AddDonation(View):
    def get(self, request):
        return render(request, 'form.html')


class Login(View):
    def get(self, request):
        return render(request, 'login.html')


class Register(View):
    def get(self, request):
        return render(request, 'register.html')

    def post(self, request):
        name = request.POST['name']
        surname = request.POST['surname']
        email = request.POST['email']
        password = request.POST['password']
        password2 = request.POST['password2']
        users = [user.email for user in User.objects.all()]
        if password != password2:
            messages.warning(request, 'Podane hasła nie są identyczne! Spróbuj jeszcze raz')
            return render(request, 'register.html')
        elif email in users:
            messages.warning(request, 'Wprawadzony adres e-mail już istnieje!')
            return render(request, 'register.html')
        User.objects.create_user(username=email, first_name=name, last_name=surname, email=email, password=password)
        return render(request, 'login.html')

