from django.db import models
from django.contrib.auth.models import User
from datetime import date


class LiveStocks(models.Model):
    symbol = models.CharField(max_length=50, primary_key=True, editable=False)
    name = models.CharField(max_length=500, null=True, blank=True)
    price = models.FloatField(max_length=50, null=True, blank=True)
    change_amount = models.FloatField(max_length=50, null=True, blank=True)
    prev_close_value = models.FloatField(max_length=50, null=True, blank=True)
    open_value = models.FloatField(max_length=50, null=True, blank=True)
    bid_value = models.FloatField(max_length=50, null=True, blank=True)
    bid_quantity = models.FloatField(max_length=50, null=True, blank=True)
    ask_value = models.FloatField(max_length=50, null=True, blank=True)
    ask_quantity = models.FloatField(max_length=50, null=True, blank=True)
    days_high = models.FloatField(max_length=50, null=True, blank=True)
    days_low = models.FloatField(max_length=50, null=True, blank=True)
    fifty_two_week_high = models.FloatField(max_length=50, null=True, blank=True)
    fifty_two_week_low = models.FloatField(max_length=50, null=True, blank=True)
    volume = models.FloatField(max_length=50, null=True, blank=True)
    avg_volume = models.FloatField(max_length=50, null=True, blank=True)
    market_cap = models.BigIntegerField(null=True, blank=True)
    pe_ratio = models.FloatField(max_length=50, null=True, blank=True)
    eps_ratio = models.FloatField(max_length=50, null=True, blank=True)
    forward_dividend_yield = models.FloatField(max_length=50, null=True, blank=True)

    def __str__(self):
        return f"{self.name} ({self.symbol})"


class Portfolio(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    name = models.CharField(max_length=500, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.user})"


class PortfolioRecords(models.Model):
    portfolio = models.ForeignKey(Portfolio, on_delete=models.SET_NULL, null=True, blank=True)
    symbol = models.ForeignKey(LiveStocks, on_delete=models.SET_NULL, null=True, blank=True)
    trade_date = models.DateField(default=date.today)
    shares = models.FloatField(max_length=50, null=True, blank=True)
    cost_per_share = models.FloatField(max_length=50, null=True, blank=True)
    notes = models.TextField(blank=True, null=True)
    createdAt = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updatedAt = models.DateTimeField(auto_now=True, null=True, blank=True)

    class Meta:
        verbose_name_plural = 'Portfolio Records'

    def __str__(self):
        return f"{self.symbol} - {self.portfolio}"