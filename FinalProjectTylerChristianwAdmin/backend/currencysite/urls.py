
from django.contrib import admin
from django.urls import include, path
from currencyapp import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('register/', views.register_user, name='register_user'),
    path('currencyapp/', include('currencyapp.urls')),
]
