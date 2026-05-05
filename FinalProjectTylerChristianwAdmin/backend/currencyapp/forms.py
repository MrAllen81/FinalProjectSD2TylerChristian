from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django import forms
from .models import regprofile
from django.forms import ModelForm


prefChoices = ( #choice of preference for our currency conversion site
    ("Pound", "Pound"),
    ("Euro", "Euro"),
    ("Yen", "Yen"),
    ("Yuan", "Yuan"),
)

class PrefForm(ModelForm):
    preference = forms.ChoiceField(choices=prefChoices)
    class Meta:
        model = regprofile
        fields = ['preference']


class RegisterUserForm(UserCreationForm):
    email = forms.EmailField()
    first_name = forms.CharField(max_length=50)
    last_name = forms.CharField(max_length=50)
    phone_number = forms.CharField(max_length=10)
    preference = forms.ChoiceField(choices=prefChoices)
    class Meta: # This meta field here allows me to interact with the pre-built django model/object "User." 
        model = User
        fields = ('username', 'password1', 'password2', 'email', 'first_name', 'last_name', 'preference', 'phone_number') 
        #Not all of these fields are able to be accepted by "User", and that is where the custom class "regprofile" and function "createupdateprofile" come in