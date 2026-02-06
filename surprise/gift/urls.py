from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('log-response/', views.log_response, name='log_response'),
]