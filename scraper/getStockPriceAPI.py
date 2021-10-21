import requests
import re
import threading
from concurrent.futures import ThreadPoolExecutor
from timeit import default_timer as timer
from datetime import timedelta
from tenacity import retry, stop_after_attempt

from utils import replace_livestocks_data


class LockedIterator(object):
    def __init__(self, it):
        self._lock = threading.Lock()
        self._it = iter(it)

    def __iter__(self):
        return self

    def __next__(self):
        with self._lock:
            return next(self._it)


headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'}
success_count = 0
fail_count = 0


@retry(stop=stop_after_attempt(3))
def saveData(stock):

    try:
        symbol = stock["symbol"]
        name = stock["longName"] if "longName" in stock else stock["shortName"] if "shortName" in stock else None
        price = stock["regularMarketPrice"] if "regularMarketPrice" in stock else None
        change_amount = stock["regularMarketChange"] if "regularMarketChange" in stock else None
        prev_close_value = stock["regularMarketPreviousClose"] if "regularMarketPreviousClose" in stock else None
        open_value = stock["regularMarketOpen"] if "regularMarketOpen" in stock else None
        bid_value = stock["bid"] if "bid" in stock else None
        bid_quantity = stock["bidSize"] if "bidSize" in stock else None
        ask_value = stock["ask"] if "ask" in stock else None
        ask_quantity = stock["askSize"] if "askSize" in stock else None
        days_high = stock["regularMarketDayHigh"] if "regularMarketDayHigh" in stock else None
        days_low = stock["regularMarketDayLow"] if "regularMarketDayLow" in stock else None
        fifty_two_week_high = stock["fiftyTwoWeekHigh"] if "fiftyTwoWeekHigh" in stock else None
        fifty_two_week_low = stock["fiftyTwoWeekLow"] if "fiftyTwoWeekLow" in stock else None
        volume = stock["regularMarketVolume"] if "regularMarketVolume" in stock else None
        avg_volume = stock["averageDailyVolume3Month"] if "averageDailyVolume3Month" in stock else None
        market_cap = stock["marketCap"] if "marketCap" in stock else None
        pe_ratio = stock["trailingPE"] if "trailingPE" in stock else None
        eps_ratio = stock["epsTrailingTwelveMonths"] if "epsTrailingTwelveMonths" in stock else None
        forward_dividend_yield = stock["trailingAnnualDividendYield"] if "trailingAnnualDividendYield" in stock else None

        replace_livestocks_data(symbol, name, price, change_amount, prev_close_value, open_value, bid_value, bid_quantity, ask_value, ask_quantity, days_high, days_low, fifty_two_week_high, fifty_two_week_low, volume, avg_volume, market_cap, pe_ratio, eps_ratio, forward_dividend_yield)

        global success_count
        success_count += 1

    except Exception as e:
        print("Error", stock["symbol"], e)
        global fail_count
        fail_count += 1


@retry(stop=stop_after_attempt(3))
def getMostActiveSocks(offset, count):

    url = f'https://query1.finance.yahoo.com/v1/finance/screener/public/saved?start={offset}&count={count}&scrId=92850596-8041-4eee-b190-cf85c7713f5e'
    res = requests.get(url, headers=headers, timeout=5).json()

    stocks = res["finance"]["result"][0]["quotes"]

    return stocks


def fetchData(offset, count):
    stocks = LockedIterator(getMostActiveSocks(offset, count))
    for stock in stocks:
        saveData(stock)
    return


def main():
    with ThreadPoolExecutor(max_workers=50) as executor:
        executor.map(fetchData, [x*100 for x in range(0, 60)], [100] * 60)
        executor.shutdown(wait=True)


if __name__ == '__main__':
    start = timer()
    main()
    end = timer()
    print(timedelta(seconds=end-start))
    print("Successful Data Replacement Count:", success_count)
    print("Failed Data Replacement Count:", fail_count)
