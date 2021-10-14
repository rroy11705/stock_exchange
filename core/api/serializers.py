from rest_framework import serializers
from core.models import LiveStocks

class LiveStocksSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = LiveStocks