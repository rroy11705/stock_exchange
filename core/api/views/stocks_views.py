from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db import connection
from core.models import LiveStocks
from core.api.serializers import LiveStocksSerializer
from django.db.models import F
import math


fields = "symbol, name, price, ROUND(change_amount::numeric, 2) as change_amount, round(((change_amount * 100) / prev_close_value)::numeric, 2) as change_percent, prev_close_value, open_value, bid_value, bid_quantity, ask_value, ask_quantity, days_high, days_low, fifty_two_week_high, fifty_two_week_low, volume, avg_volume, market_cap, pe_ratio, eps_ratio, forward_dividend_yield"

def dictfetchall(cursor):
    "Return all rows from a cursor as a dict"
    columns = [col[0] for col in cursor.description]
    return dict(zip(columns, cursor.fetchone()))

def dictfetchall(cursor):
    "Return all rows from a cursor as a dict"
    columns = [col[0] for col in cursor.description]
    return [
        dict(zip(columns, row))
        for row in cursor.fetchall()
    ]
    

@api_view(["GET"])
def getLiveStocks(request):
    try:
        keyword = request.query_params.get("keyword")

        if keyword == None:
            keyword = ''

        page = request.query_params.get("page")
        if page == None:
            page = 1
            
        count = request.query_params.get("count")
        if count == None:
            count = 25
        
        page = int(page)
        count = int(count)
            
        order_by = request.query_params.get("orderby")
        if order_by == None:
            order_by = "symbol"
            
        sub_query_one = f"ORDER BY {order_by} OFFSET {count * (page - 1)} ROWS FETCH NEXT {count} ROWS ONLY;"
        
        query = f"SELECT {fields} FROM core_livestocks WHERE name ~* '{keyword}' OR symbol ~* '{keyword}'"
        
        with connection.cursor() as cursor:
            cursor.execute(query)
            total = cursor.rowcount
            
            cursor.execute(f"{query} {sub_query_one}")
            stocks = dictfetchall(cursor)

        return Response({
            "total": total,
            "page": page,
            "count": count,
            "pages": math.ceil(total / count),
            "stocks": stocks,
        }, status=status.HTTP_200_OK)

    except:
        return Response({
            "stocks": [],
        }, status=status.HTTP_404_NOT_FOUND)



@api_view(['GET'])
def getTop(request, orientation):
    try:
        if orientation == "gainers":
            order = "DESC"
        elif orientation == "losers":
            order = "ASC"
        
        page = request.query_params.get("page")
        if page == None:
            page = 1
            
        count = request.query_params.get("count")
        if count == None:
            count = 25
        
        page = int(page)
        count = 100 if int(count) > 100 else int(count)
        total = 100
        stocks = []
        
        if page * count <= total:
            sub_query_one = f"ORDER BY change_percent {order}, symbol ASC OFFSET {count * (page - 1)} ROWS FETCH NEXT {count} ROWS ONLY"
            query = f"SELECT {fields} FROM core_livestocks WHERE prev_close_value > 0"
            
            with connection.cursor() as cursor:                
                cursor.execute(f"{query} {sub_query_one}")
                stocks = dictfetchall(cursor)


        return Response({
            "total": total,
            "page": page,
            "pages": math.ceil(total / count),
            "stocks": stocks,
        }, status=status.HTTP_200_OK)
        
    except:
        return Response({
            "stocks": [],
        }, status=status.HTTP_404_NOT_FOUND)



@api_view(["GET"])
def getLiveStock(request, pk):
    try:
        with connection.cursor() as cursor:
            cursor.execute(f"SELECT {fields} FROM core_livestocks WHERE symbol = '{pk}'")
            stock = dictfetchall(cursor)
            
        return Response(stock)
    
    except:
        return Response({
            "stocks": [],
        }, status=status.HTTP_404_NOT_FOUND)