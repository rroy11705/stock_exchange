from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from core.models import LiveStocks


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin']

    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email

        return name


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
        

class LiveStocksSerializer(serializers.ModelSerializer):
    change_percent = serializers.SerializerMethodField(read_only=True)
    change_amount = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = LiveStocks
        fields = ['symbol', 'name', 'price', 'change_amount', 'change_percent', 'prev_close_value', 'open_value', 'bid_value', 'bid_quantity', 'ask_value', 'ask_quantity', 'days_high', 'days_low', 'fifty_two_week_high', 'fifty_two_week_low', 'volume', 'avg_volume', 'market_cap', 'pe_ratio', 'eps_ratio', 'forward_dividend_yield']

    def get_change_percent(self, obj):
        change_percent = round(obj.change_amount * 100 / obj.prev_close_value, 2)
        return change_percent

    def get_change_amount(self, obj):
        change_amount = round(obj.change_amount, 2)
        return change_amount