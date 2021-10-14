from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.core.paginator import Paginator, PageNotAnInteger
from django.db.models import Q
from core.models import LiveStocks
from core.api.serializers import LiveStocksSerializer



@api_view(["GET"])
def getLiveStocks(request):
    query = request.query_params.get("keyword")
    if query == None:
        query = ''

    stocks = LiveStocks.objects.filter(Q(name__icontains=query) | Q(symbol__icontains=query)).order_by('-pk')
    
    page = request.query_params.get("page")
    paginator = Paginator(stocks, 25)

    try:
        stocks = paginator.page(page)

    except PageNotAnInteger:
        stocks = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)
    print('Page:', page)
    serializer = LiveStocksSerializer(stocks, many=True)

    return Response({
        'page': page,
        'pages': paginator.num_pages,
        'stocks': serializer.data,
    }, status=status.HTTP_200_OK)