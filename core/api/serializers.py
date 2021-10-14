from rest_framework import serializers
from core.models import LiveStocks

class LiveStocksSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = LiveStocks
        fields = ['symbol', 'name', 'price', 'change_amount', 'change_percent', 'prev_close_value', 'open_value', 'bid_value', 'bid_quantity', 'ask_value', 'ask_quantity', 'days_high', 'days_low', 'fifty_two_week_high', 'fifty_two_week_low', 'volume', 'avg_volume', 'market_cap', 'market_cap_prefix', 'beta', 'pe_ratio', 'eps_ratio', 'forward_dividend_yield', 'forward_dividend_percentage', 'prev_dividend_date', 'one_year_target']