from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.core.mail import send_mail
from django.conf import settings
import json
from datetime import datetime
import os

def home(request):
    return render(request,'home.html', {})


@require_http_methods(["POST"])
def log_response(request):
    """Log YES or NO responses with timestamp to a text file"""
    try:
        data = json.loads(request.body)
        response = data.get('response', 'UNKNOWN')
        
        # Define the logs directory and file
        logs_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'logs')
        os.makedirs(logs_dir, exist_ok=True)
        log_file = os.path.join(logs_dir, 'responses.txt')
        
        # Get current date and time
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        
        # Log the response
        with open(log_file, 'a') as f:
            f.write(f"[{timestamp}] Response: {response.upper()}\n")
        
        return JsonResponse({'status': 'success', 'message': f'{response} logged successfully'})
    
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)

