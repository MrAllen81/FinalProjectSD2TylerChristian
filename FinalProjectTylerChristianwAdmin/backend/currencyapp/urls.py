from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("home", views.home, name="home"),
    path("profile", views.profile, name="profile"),
    path("registration", views.registration, name="registration"),
    path("loginP", views.loginP, name="loginP"),
    path("logoutU", views.logoutU, name="logoutU"),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

