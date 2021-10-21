from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_protect
from datetime import date
from django.shortcuts import get_object_or_404
from core.models import LiveStocks, Portfolio, PortfolioRecords
from core.api.serializers import PortfolioSerializer, PortfolioRecordsSerializer


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def portfolio(request):
    if request.method == 'GET':
        try:
            portfolio = Portfolio.objects.filter(user = request.user)
            serializer = PortfolioSerializer(portfolio, many=True)
            return Response(serializer.data)
        
        except:
            message = {'detail': 'portfolio not found'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)


    if request.method == 'POST':
        data = request.data
        try:
            portfolio = Portfolio.objects.create(
                user = request.user,
                name = data['name']
            )

            serializer = PortfolioSerializer(portfolio)
            return Response(serializer.data)

        except:
            message = {'detail': 'Error creating portfolio'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'DELETE'])
@permission_classes([IsAuthenticated])
def portfolioDetails(request, id):
    if request.method == 'GET':
        try:
            portfolio = get_object_or_404(Portfolio, pk=id)
            serializer = PortfolioSerializer(portfolio, many=False)
            records = PortfolioRecords.objects.filter(portfolio=portfolio)
            record_serializer = PortfolioRecordsSerializer(records, many=True)
            response = serializer.data
            response["records"] = record_serializer.data
            return Response(response)
        
        except:
            message = {'detail': 'portfolio not found'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        try:
            portfolio = Portfolio.objects.get(pk=id)
            portfolio.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createPortfolioRecord(request, id):
    data = request.data
    try:
        symbol = LiveStocks.objects.get(pk=data['symbol'])
        trade_date = data["trade_date"] if "trade_date" in data else date.today()
        shares = float(data["shares"]) if "shares" in data else None
        cost_per_share = float(data["cost_per_share"]) if "cost_per_share" in data else symbol.prev_close_value
        notes = data["notes"] if "notes" in data else None
        
        record = PortfolioRecords.objects.create(
            portfolio = Portfolio.objects.get(pk=id),
            symbol = symbol,
            trade_date = trade_date,
            shares = shares,
            cost_per_share = cost_per_share,
            notes = notes,
        )
        serializer = PortfolioRecordsSerializer(record, many=False)
        return Response(serializer.data)

    except:
        message = {'detail': 'Error creating record'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def PortfolioRecordDetails(request, id):
    if request.method == 'DELETE':
        try:
            record = PortfolioRecords.objects.get(pk=id)
            record.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
