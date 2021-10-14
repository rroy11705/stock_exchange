import requests
from bs4 import BeautifulSoup
import re
from multiprocessing.pool import Pool
import threading
from concurrent.futures import ThreadPoolExecutor
from timeit import default_timer as timer
from datetime import timedelta
from tenacity import retry, stop_after_attempt

from utils import replace_data


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

def strToFloat(num):
    num = re.sub(',', '', num)
    try:
        return float(num)
    except:
        return None


@retry(stop=stop_after_attempt(3))
def saveData(stock):

    try:
        url = 'https://finance.yahoo.com/quote/' + stock[1] + '?p=' + stock[1]
        r = requests.get(url, headers=headers, timeout=5).text 

        soup = BeautifulSoup(r, 'html.parser')

        price = strToFloat(soup.find('div', {'class': 'D(ib) Mend(20px)'}).find_all('span')[0].text)
        change = soup.find('div', {'class': 'D(ib) Mend(20px)'}).find_all('span')[1].text
        change_amount = strToFloat(change.split(' ')[0])
        change_percent = strToFloat(re.sub('[(%)]', '', change.split(' ')[1]))
        data = soup.find_all('td', {'class': 'Ta(end) Fw(600) Lh(14px)'})
        prev_close_value = strToFloat(data[0].text)
        open_value = strToFloat(data[1].text)
        bid_value = strToFloat((data[2].text).split(' ')[0])
        bid_quantity = strToFloat((data[2].text).split(' ')[-1])
        ask_value = strToFloat((data[3].text).split(' ')[0])
        ask_quantity = strToFloat((data[3].text).split(' ')[-1])
        days_high = strToFloat((data[4].text).split(' ')[0])
        days_low = strToFloat((data[4].text).split(' ')[-1])
        fifty_two_week_high = strToFloat((data[5].text).split(' ')[0])
        fifty_two_week_low = strToFloat((data[5].text).split(' ')[-1])
        volume = strToFloat(data[6].text)
        avg_volume = strToFloat(data[7].text)
        market_cap = strToFloat((data[8].text)[:-1])
        market_cap_prefix = (data[8].text)[-1]
        beta = strToFloat(data[9].text)
        pe_ratio = strToFloat(data[10].text)
        eps_ratio = strToFloat(data[11].text)
        forward_dividend_yield = strToFloat((data[13].text).split(' ')[0])
        forward_dividend_percentage = strToFloat(re.sub('[(%)]', '', (data[13].text).split(' ')[1]))
        prev_dividend_date = data[14].text
        one_year_target = strToFloat(data[15].text)

        replace_data(stock[1], stock[0], price, change_amount, change_percent, prev_close_value, open_value, bid_value, bid_quantity, ask_value, ask_quantity, days_high, days_low, fifty_two_week_high, fifty_two_week_low, volume, avg_volume, market_cap, market_cap_prefix, beta, pe_ratio, eps_ratio, forward_dividend_yield, forward_dividend_percentage, prev_dividend_date, one_year_target)

    except Exception as e:
        print("Error", stock[1], e)


@retry(stop=stop_after_attempt(3))
def getMostActiveSocks(offset, count):

    url = f'https://finance.yahoo.com/screener/unsaved/3f29f493-e529-4abd-852c-5a773fb8a7a4?count={count}&offset={offset}'
    r = requests.get(url, headers=headers, timeout=5).text

    soup = BeautifulSoup(r, 'html.parser')

    name = soup.find_all('td', {'class': 'Va(m) Ta(start) Px(10px) Fz(s)'})
    symbol = soup.find_all('a', {'class': 'Fw(600) C($linkColor)'})
    
    for i in range(0, len(name)):
        yield (name[i].text, symbol[i].text)


def fetchData(offset, count):
    stocks = LockedIterator(getMostActiveSocks(offset, count))
    while True:
        try:
            stock = next(stocks)
            saveData(stock)

        except StopIteration:
            break


# multiprocessing
# def main():
#     with Pool() as pool:
#         pool.starmap(fetchData, [(x*100, 100) for x in range(0, 59)])

# multithreading
def main():
    with ThreadPoolExecutor(max_workers=50) as executor:
        executor.map(fetchData, [x*25 for x in range(0, 240)], [100] * 240)
        executor.shutdown(wait=True)

# synchronous
# def main():
#     for i in range(0, 59):
#         fetchData(i*100, 100)


if __name__ == '__main__':
    start = timer()
    # main()
    saveData(('Indoco Remedies Limited', 'INDOCO.BO'))
    end = timer()
    print(timedelta(seconds=end-start))
