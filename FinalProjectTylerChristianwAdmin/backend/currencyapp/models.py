from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


prefChoices = (
    ("Pound", "Pound"),
    ("Euro", "Euro"),
    ("Yen", "Yen"),
    ("Yuan", "Yuan"),
)

#
class regprofile(models.Model): #This class is to hold the "phone number" and "preference" fields from the form that the user model in django does not support natively. 
    user = models.OneToOneField(User, on_delete=models.CASCADE) #OneToOneField means that there is one regprofile for each user. on_delete=models.CASCADE means that every deleted user profile also has their regprofile deleted
    pNumber = models.CharField(max_length=10, blank=True) #This holds the phone number. 
    preference = models.CharField(choices=prefChoices)


#This is a signal function. It picks up when the user model is being saved (when the user clicks submit when registering their account), and then runs the function below
@receiver(post_save, sender=User)
def createupdateProfile(sender, instance, created, **kwargs): #This function makes sure data fields from the form like "phone number" and "preference" can be saved in the regprofile database
    if created: #The if statement seems redundent, but it is not. Django sometimes calls to save the user data in the background for reason I do not know, so making sure this only fires when accounts are created is necessary
        regprofile.objects.create(user=instance)
