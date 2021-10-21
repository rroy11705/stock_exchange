from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from core.models import LiveStocks, Portfolio, PortfolioRecords


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    portfolio = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'portfolio', 'isAdmin']
        depth = 1

    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email
        return name

    def get_portfolio(self, obj):
        portfolio = obj.portfolio_set.all()
        serializer = PortfolioSerializer(portfolio, many=True)
        return serializer.data


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


class PortfolioRecordsSerializer(serializers.ModelSerializer):
    symbol_price = serializers.SerializerMethodField(read_only=True)
    market_value = serializers.SerializerMethodField(read_only=True)
    change_value = serializers.SerializerMethodField(read_only=True)
    change_percent = serializers.SerializerMethodField(read_only=True)
    gain_value = serializers.SerializerMethodField(read_only=True)
    gain_percent = serializers.SerializerMethodField(read_only=True)
    total_gain = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = PortfolioRecords
        fields = ['id', 'symbol', 'trade_date', 'shares', 'cost_per_share', 'symbol_price', 'market_value', 'change_value', 'change_percent', 'gain_value', 'gain_percent', 'total_gain', 'notes']

    def get_symbol_price(self, obj):
        return round(obj.symbol.price, 2)

    def get_market_value(self, obj):
        shares = obj.shares if obj.shares else 0
        market_value = obj.symbol.price * shares
        return round(market_value, 2)

    def get_change_value(self, obj):
        change_value = obj.symbol.change_amount
        return round(change_value, 2)

    def get_change_percent(self, obj):
        change_percent = (obj.symbol.change_amount * 100 / obj.symbol.prev_close_value)
        return round(change_percent, 2)

    def get_gain_value(self, obj):
        shares = obj.shares if obj.shares else 0
        gain_value = obj.symbol.change_amount * shares
        return round(gain_value, 2)

    def get_gain_percent(self, obj):
        gain_percent = (obj.symbol.change_amount * 100 / obj.symbol.prev_close_value)
        return round(gain_percent, 2)

    def get_total_gain(self, obj):
        shares = obj.shares if obj.shares else 0
        cost_per_share = obj.cost_per_share if obj.cost_per_share else obj.symbol.prev_close_value
        total_gain = (obj.symbol.price - cost_per_share) * shares
        return round(total_gain, 2)


class PortfolioSerializer(serializers.ModelSerializer):
    symbols = serializers.SerializerMethodField(read_only=True)
    market_value = serializers.SerializerMethodField(read_only=True)
    day_change_value = serializers.SerializerMethodField(read_only=True)
    day_change_percent = serializers.SerializerMethodField(read_only=True)
    total_change = serializers.SerializerMethodField(read_only=True)
    total_change_percent = serializers.SerializerMethodField(read_only=True)
    updatedAt = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Portfolio
        fields = ['id', 'user', 'name', 'symbols', 'market_value', 'day_change_value', 'day_change_percent', 'total_change', 'total_change_percent', 'updatedAt']

    def get_symbols(self, obj):
        record = obj.portfoliorecords_set.all()
        serializer = PortfolioRecordsSerializer(record, many=True)
        return len(serializer.data)

    def get_market_value(self, obj):
        record = obj.portfoliorecords_set.all()
        market_value = 0
        for data in record:
            shares = data.shares if data.shares else 0
            market_value += data.symbol.price * shares
        return round(market_value, 2)

    def get_day_change_value(self, obj):
        record = obj.portfoliorecords_set.all()
        day_change_value = 0
        for data in record:
            shares = data.shares if data.shares else 0
            day_change_value += data.symbol.change_amount * shares
        return round(day_change_value, 2)

    def get_day_change_percent(self, obj):
        record = obj.portfoliorecords_set.all()
        if len(record) == 0:
            return 0
        day_change_amount = 0
        total_prev_close_value = 0
        for data in record:
            day_change_amount += data.symbol.change_amount
            total_prev_close_value += data.symbol.prev_close_value
        day_change_percent = day_change_amount * 100 / total_prev_close_value
        return round(day_change_percent, 2)

    def get_total_change(self, obj):
        record = obj.portfoliorecords_set.all()
        total_change = 0
        for data in record:
            shares = data.shares if data.shares else 0
            cost_per_share = data.cost_per_share if data.cost_per_share else data.symbol.prev_close_value
            total_change += (data.symbol.price - cost_per_share) * shares
        return round(total_change, 2)

    def get_total_change_percent(self, obj):
        record = obj.portfoliorecords_set.all()
        if len(record) == 0:
            return 0
        total_change_amount = 0
        total_prev_close_value = 0
        for data in record:
            cost_per_share = data.cost_per_share
            total_change_amount += (data.symbol.price - cost_per_share)
            total_prev_close_value += data.symbol.prev_close_value
        total_change_percent = total_change_amount * 100 / total_prev_close_value
        return round(total_change_percent, 2)

    def get_updatedAt(self, obj):
        updatedAt = obj.updatedAt
        return updatedAt.strftime("%m/%d/%Y, %H:%M:%S")
