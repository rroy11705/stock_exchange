from rest_framework import serializers
from core.models import LiveStocks

class LiveStocksSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = LiveStocks
        fields = ['symbol', 'name', 'price', 'change', 'change_percent', 'prev_close_value',
                'open_value', 'days_range', 'fifty_two_week_range',
                'volume', 'avg_volume', 'market_cap', 'dividend', 'prev_dividend_date']