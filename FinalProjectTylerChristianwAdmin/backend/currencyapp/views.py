import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .models import RegisteredUser

@csrf_exempt
@require_http_methods(["POST"])
def register_user(request):
    try:
        data = json.loads(request.body)

        if RegisteredUser.objects.filter(email=data['email']).exists():
            return JsonResponse({
                'success': False,
                'field': 'EAddress',       # matches your JS field name
                'error': 'This email is already registered.'
            }, status=409)

        RegisteredUser.objects.create(
            first_name   = data['first_name'],
            last_name    = data['last_name'],
            dob          = data['dob'],
            phone_number = data['phone_number'],
            email        = data['email'],
        )

        return JsonResponse({'success': True, 'message': 'User registered successfully'})

    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)}, status=500)
