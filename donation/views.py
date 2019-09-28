from django.db.models import Count
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
        return render(request, 'index.html', {'quantity': quantity,
                                              'institutions': supported_institutions})


class AddDonation(View):
    def get(self, request):
        return render(request, 'form.html')


class Login(View):
    def get(self, request):
        return render(request, 'login.html')


class Register(View):
    def get(self, request):
        return render(request, 'register.html')
