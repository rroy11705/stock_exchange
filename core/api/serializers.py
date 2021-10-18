from rest_framework import serializers
from core.models import LiveStocks

class LiveStocksSerializer(serializers.ModelSerializer):
    change_percent = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = LiveStocks
        fields = ['symbol', 'name', 'price', 'change_amount', 'change_percent', 'prev_close_value', 'open_value', 'bid_value', 'bid_quantity', 'ask_value', 'ask_quantity', 'days_high', 'days_low', 'fifty_two_week_high', 'fifty_two_week_low', 'volume', 'avg_volume', 'market_cap', 'pe_ratio', 'eps_ratio', 'forward_dividend_yield']

    def get_change_percent(self, obj):
        change_percent = round(obj.change_amount * 100 / obj.prev_close_value, 2)
        return change_percent