from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.models import User
from django.db.models import Count
from django.shortcuts import render, redirect, get_object_or_404
from django.views import View
from .models import Donation, Institution, Category


class LandingPage(View):
    def get(self, request):
        donations = Donation.objects.all()
        quantity = 0
        for donation in donations:
            quantity += donation.quantity
        supported_institutions = Donation.objects.all().values('institution').annotate(total=Count('institution')).order_by('total')

        foundations = Institution.objects.filter(type=0)
        NGOs = Institution.objects.filter(type=1)
        local_collections = Institution.objects.filter(type=2)

        return render(request, 'index.html', {'quantity': quantity,
                                              'supported_institutions': supported_institutions,
                                              'foundations': foundations,
                                              'NGOs': NGOs,
                                              'local_collections': local_collections})


class AddDonation(LoginRequiredMixin, View):
    login_url = '/login/'

    def get(self, request):
        categories = Category.objects.all()
        institutions = Institution.objects.all()
        return render(request, 'form.html', {'categories': categories,
                                             'institutions': institutions})

    def post(self, request):
        quantity = request.POST['bags']
        organization = request.POST['organization']
        institution = get_object_or_404(Institution, name=organization)
        address = request.POST['address']
        phone_number = request.POST['phone']
        city = request.POST['city']
        zip_code = request.POST['postcode']
        pick_up_date = request.POST['data']
        pick_up_time = request.POST['time']
        pick_up_comment = request.POST['more_info']
        donation = Donation.objects.create(quantity=quantity, institution=institution, address=address,
                                           phone_number=phone_number, city=city, zip_code=zip_code,
                                           pick_up_date=pick_up_date, pick_up_time=pick_up_time,
                                           pick_up_comment=pick_up_comment, user=request.user)
        for category in request.POST['categories']:
            c = Category.objects.get(id=category)
            donation.categories.add(c)
        return redirect('confirmation')


class ConfirmationView(View):
    def get(self, request):
        return render(request, 'form-confirmation.html')


class Login(View):
    def get(self, request):
        return render(request, 'login.html')

    def post(self, request):
        email = request.POST['email']
        password = request.POST['password']
        user = authenticate(request, username=email, password=password)
        if user is not None:
            login(request, user)
            return redirect('landing_page')
        return redirect('register')


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
        return redirect('login')


class Logout(View):
    def get(self, request):
        logout(request)
        return redirect('landing_page')


class UserDetails(LoginRequiredMixin, View):
    login_url = '/login/'

    def get(self, request):
        return render(request, 'user.html', {'user': request.user})


class UserDonations(LoginRequiredMixin, View):
    login_url = '/login/'

    def get(self, request):
        return render(request, 'user_donations.html', {'user': request.user})

