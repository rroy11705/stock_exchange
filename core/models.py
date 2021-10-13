from django.db import models
from django.contrib.auth.models import User


class LiveStocks(models.Model):
    symbol = models.CharField(max_length=20, primary_key=True, editable=False)
    name = models.CharField(max_length=200, null=True, blank=True)
    price = models.CharField(max_length=200, null=True, blank=True)
    change = models.CharField(max_length=200, null=True, blank=True)
    change_percent = models.CharField(max_length=200, null=True, blank=True)
    prev_close_value = models.CharField(max_length=200, null=True, blank=True)
    open_value = models.CharField(max_length=200, null=True, blank=True)
    days_range = models.CharField(max_length=200, null=True, blank=True)
    fifty_two_week_range = models.CharField(max_length=200, null=True, blank=True)
    volume = models.CharField(max_length=200, null=True, blank=True)
    avg_volume = models.CharField(max_length=200, null=True, blank=True)
    dividend = models.CharField(max_length=200, null=True, blank=True)
    prev_dividend_date = models.CharField(max_length=200, null=True, blank=True)