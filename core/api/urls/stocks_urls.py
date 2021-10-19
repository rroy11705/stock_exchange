from django.urls import path
from core.api.views import stocks_views as views

urlpatterns = [
    path('', views.getLiveStocks, name="live-stocks"),
    path('top-gainers/', views.getTopGainers, name="top-gainers"),
    path('top-losers/', views.getTopLosers, name="top-losers"),

    path('<str:pk>/', views.getLiveStock, name="single-stock"),
]