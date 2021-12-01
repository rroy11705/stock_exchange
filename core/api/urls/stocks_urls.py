from django.urls import path
from core.api.views import stocks_views as views

urlpatterns = [
    path('', views.getLiveStocks, name="live-stocks"),
    path('top/<str:orientation>/', views.getTop, name="top-gainers"),

    path('<str:pk>/', views.getLiveStock, name="single-stock"),
]