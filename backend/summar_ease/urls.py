from django.urls import path
from . import views

urlpatterns = [
    path('', views.SummarEaseView.as_view(), name='summar-ease-view'),
]
