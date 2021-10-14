from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.core.paginator import Paginator, PageNotAnInteger
from django.db.models import Q
from core.models import LiveStocks
from core.api.serializers import LiveStocksSerializer
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
    query = request.query_params.get("keyword")
    params = {
        'keyword': query
    }
    if query == None:
        query = ''
        params = {}

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
    prev_params = dict(params)
    next_params = dict(params)
    prev_params["page"] = page - 1
    next_params["page"] = page + 1
    print('Page:', page)
    serializer = LiveStocksSerializer(stocks, many=True)


    return Response({
        'page': page,
        "prev": None if page == 1 else build_url('live-stocks', params=prev_params),
        "next": None if page == paginator.num_pages else build_url('live-stocks', params=next_params),
        'pages': paginator.num_pages,
        'stocks': serializer.data,
    }, status=status.HTTP_200_OK)