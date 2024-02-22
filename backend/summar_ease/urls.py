from django.urls import path
from . import views

urlpatterns = [
    path('', views.SummarEaseView.as_view(), name='summar-ease-view'),
    path('<uuid:id>/', views.SummarEaseDetailView.as_view(), name='summar-ease-view'),
]
