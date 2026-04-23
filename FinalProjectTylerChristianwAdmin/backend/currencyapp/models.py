from django.db import models

class RegisteredUser(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    dob = models.DateField()
    phonenumber = models.CharField(max_length=20)
    registered_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return f"{self.firstname} {self.lastname} - {self.email}"