import requests
from bs4 import BeautifulSoup
import re
from multiprocessing.pool import Pool
from concurrent.futures import ThreadPoolExecutor
from timeit import default_timer as timer
from datetime import timedelta

from utils import replace_data


headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'}

def strToFloat(num):
    num = re.sub(',', '', num)
    if 'N/A' == num:
        return None
    return float(num)


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
        days_range = data[4].text
        fifty_two_week_range = data[5].text
        volume = strToFloat(data[6].text)
        avg_volume = strToFloat(data[7].text)
        market_cap = data[8].text
        dividend = data[13].text
        prev_dividend_date = data[14].text

        replace_data(stock[1], stock[0], price, change_amount, change_percent, prev_close_value,
            open_value, days_range, fifty_two_week_range, 
            volume, avg_volume, market_cap, dividend, prev_dividend_date)

    except Exception as e:
        print("Error", e)


def getMostActiveSocks(offset, count):

    url = f'https://finance.yahoo.com/screener/unsaved/3f29f493-e529-4abd-852c-5a773fb8a7a4?count={count}&offset={offset}'
    r = requests.get(url, headers=headers, timeout=5).text

    soup = BeautifulSoup(r, 'html.parser')

    name = soup.find_all('td', {'class': 'Va(m) Ta(start) Px(10px) Fz(s)'})
    symbol = soup.find_all('a', {'class': 'Fw(600) C($linkColor)'})
    
    for i in range(0, len(name)):
        yield (name[i].text, symbol[i].text)


def fetchData(offset, count):
    stocks = getMostActiveSocks(offset, count)
    c = offset
    while True:
        try:
            stock = next(stocks)
            c += 1
            print(c, "Adding data of", stock[1])
            saveData(stock)

        except StopIteration:
            break


# multiprocessing    took 18s
# def main():
#     with Pool() as pool:
#         pool.starmap(fetchData, [(x*100, 100) for x in range(0, 59)])

# multithreading     took 11s
def main():
    with ThreadPoolExecutor(max_workers=50) as executor:
        executor.map(fetchData, [x*25 for x in range(0, 240)], [100] * 240)
        executor.shutdown(wait=True)

# synchronous     took 1min 34s
# def main():
#     for i in range(0, 59):
#         fetchData(i*100, 100)


if __name__ == '__main__':
    start = timer()
    main()
    end = timer()
    print(timedelta(seconds=end-start))
