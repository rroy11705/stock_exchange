from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.core.paginator import Paginator, PageNotAnInteger
from django.db.models import Q
from core.models import LiveStocks
from core.api.serializers import LiveStocksSerializer
from django.db.models import F
from django.urls import reverse
from django.http import QueryDict


def build_url(*args, **kwargs):
    params = kwargs.pop('params', {})
    url = reverse(*args, **kwargs)
    if not params: return url

    qdict = QueryDict('', mutable=True)
    for k, v in params.items():
        if type(v) is list: qdict.setlist(k, v)
        else: qdict[k] = v

    return url + '?' + qdict.urlencode()



@api_view(["GET"])
def getLiveStocks(request):
    try:
        query = request.query_params.get("keyword")

        if query == None:
            query = ''

        stocks = LiveStocks.objects.filter(Q(name__icontains=query) | Q(symbol__icontains=query)).order_by('pk')

        total = len(stocks)
        
        page = request.query_params.get("page")
        paginator = Paginator(stocks, 25)

        if page == None:
            page = 1

        try:
            stocks = paginator.page(page)

        except PageNotAnInteger:
            stocks = paginator.page(paginator.num_pages)

        page = int(page)

        serializer = LiveStocksSerializer(stocks, many=True)


        return Response({
            "total": total,
            "page": page,
            "pages": paginator.num_pages,
            "stocks": serializer.data,
        }, status=status.HTTP_200_OK)

    except:
        return Response({
            "stocks": [],
        }, status=status.HTTP_404_NOT_FOUND)



@api_view(['GET'])
def getTopGainers(request):
    try:
        query = request.query_params.get("keyword")

        if query == None:
            query = ''

        stocks = LiveStocks.objects.filter(prev_close_value__gt=0).annotate(ordering=F('change_amount') / F('prev_close_value')).order_by('-ordering')[0:100]

        total = len(stocks)
        
        page = request.query_params.get("page")
        paginator = Paginator(stocks, 25)

        if page == None:
            page = 1

        try:
            stocks = paginator.page(page)

        except PageNotAnInteger:
            stocks = paginator.page(paginator.num_pages)

        page = int(page)

        serializer = LiveStocksSerializer(stocks, many=True)


        return Response({
            "total": total,
            "page": page,
            "pages": paginator.num_pages,
            "stocks": serializer.data,
        }, status=status.HTTP_200_OK)

    except:
        return Response({
            "stocks": [],
        }, status=status.HTTP_404_NOT_FOUND)



@api_view(['GET'])
def getTopLosers(request):
    try:
        query = request.query_params.get("keyword")

        if query == None:
            query = ''

        stocks = LiveStocks.objects.filter(prev_close_value__gt=0).annotate(ordering=F('change_amount') / F('prev_close_value')).order_by('ordering')[0:100]

        total = len(stocks)
        
        page = request.query_params.get("page")
        paginator = Paginator(stocks, 25)

        if page == None:
            page = 1

        try:
            stocks = paginator.page(page)

        except PageNotAnInteger:
            stocks = paginator.page(paginator.num_pages)

        page = int(page)

        serializer = LiveStocksSerializer(stocks, many=True)


        return Response({
            "total": total,
            "page": page,
            "pages": paginator.num_pages,
            "stocks": serializer.data,
        }, status=status.HTTP_200_OK)

    except:
        return Response({
            "stocks": [],
        }, status=status.HTTP_404_NOT_FOUND)


@api_view(["GET"])
def getLiveStock(request, pk):
    stock = LiveStocks.objects.get(symbol=pk)
    serializer = LiveStocksSerializer(stock, many=False)
    return Response(serializer.data)