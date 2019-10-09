from django.urls import path, re_path
from .views import LandingPage, AddDonation, Login, Register, Logout, UserDetails, ConfirmationView, UserDonations

urlpatterns = [
    path('', LandingPage.as_view(), name='landing_page'),
    path('add_donation/', AddDonation.as_view(), name='add_donation'),
    path('login/', Login.as_view(), name='login'),
    path('register/', Register.as_view(), name='register'),
    path('logout/', Logout.as_view(), name='logout'),
    path('user/', UserDetails.as_view(), name='user'),
    path('confirmation/', ConfirmationView.as_view(), name='confirmation'),
    path('your_donations/', UserDonations.as_view(), name='user_donations'),
]