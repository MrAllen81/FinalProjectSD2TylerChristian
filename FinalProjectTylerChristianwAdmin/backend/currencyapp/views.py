import json
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.forms import UserCreationForm
from .forms import RegisterUserForm, PrefForm


#Each of these functions correspond to a page on the site, therefore a view. 

def loginP(request): 
    if request.method == "POST": #This if statement makes sure that all people sending a POST request (like clicking submit on a login page) are verified, while users just viewing the page 
        username = request.POST['username']                                                             # are allowed to simply view.
        password = request.POST['password']
        user = authenticate(request, username=username, password=password) #Django has their own authentication function that I am using here.
        if user is not None: #If the user exists, they are also logged in and sent to the home page
            login(request, user)
            return render(request, "currencyapp/views/home.html")
            
        else: #login error message
            messages.success(request, ("There was an error logging in, try again")) 
            return render(request, "currencyapp/views/login.html")
    else:
        return render(request, "currencyapp/views/login.html")

def logoutU(request): #THIS is the only function that does not correspond to its own view. However, it serves to log out the user from the navbar.
    logout(request)
    return render(request, "currencyapp/views/home.html")

def index(request): #Index page
    return render(request, "currencyapp/views/index.html")

def home(request): #Home page
    return render(request, "currencyapp/views/home.html")

def profile(request): #Profile page
    if request.user.is_authenticated and request.user.is_superuser == False:
        if request.method == "POST":
            form = PrefForm(request.POST, instance=request.user.regprofile) #This instance line here makes sure that it's the logged in user that can change their preference. Make sure to make this option invisible for non-logged in users
            if form.is_valid():
                form.save() 
                return render(request, "currencyapp/views/profile.html", {
                    'form': form,
                })
        else:
            form = PrefForm(instance=request.user.regprofile)
        return render(request, "currencyapp/views/profile.html", {
            'form': form,
        })
    else:
        return render(request, "currencyapp/views/profile.html")
    

def registration(request): #Registration page
    if request.method == "POST": #If someone submits a fully valid registration form, then each field is saved to the "User" model, and unsupported fields are saved to the "regprofile" model/object
        form = RegisterUserForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data['username']
            password = form.cleaned_data['password1']
            user = authenticate(username=username, password=password)
            user.regprofile.pNumber = form.cleaned_data['phone_number'] #The model regprofile is created one to one with each user profile, so it serves as a subclass for user
            user.regprofile.preference = form.cleaned_data['preference']
            user.regprofile.save()
            login(request, user)
            messages.success(request, ("Registration successful!"))
            return render(request, "currencyapp/views/registration.html")
    else:
        form = RegisterUserForm()
    return render(request, "currencyapp/views/registration.html", {
            'form': form, #This loads RegisteredUserForm, you can check that out in forms.py
        })
    

