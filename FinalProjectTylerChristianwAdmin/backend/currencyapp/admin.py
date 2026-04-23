from django.contrib import admin
from .models import RegisteredUser

@admin.register(RegisteredUser)
class RegisteredUserAdmin(admin.ModelAdmin):
    list_display  = ['first_name', 'last_name', 'email', 'phone_number', 'dob', 'registered_at']
    search_fields = ['first_name', 'last_name', 'email']
    list_filter   = ['registered_at']
    readonly_fields = ['registered_at']