
from django.contrib import admin
from django.urls import include, path
from currencyapp import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('currencyapp/', include('django.contrib.auth.urls')),
    path('currencyapp/', include('currencyapp.urls')),
]
