from django.contrib import admin
from .models import LiveStocks, Portfolio, PortfolioRecords


admin.site.register(LiveStocks)
admin.site.register(Portfolio)
admin.site.register(PortfolioRecords)