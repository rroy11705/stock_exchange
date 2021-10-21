   
from django.urls import path
from core.api.views import portfolio_views as views


urlpatterns = [

    path('', views.portfolio, name='portfolio'),

    path('<str:id>/', views.portfolioDetails, name='get-portfolio-details'),

    path('<str:id>/record/', views.createPortfolioRecord, name='portfolio-record'),

    path('record/<str:id>/', views.PortfolioRecordDetails, name='portfolio-record-details'),
]