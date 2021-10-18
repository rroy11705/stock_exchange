import requests
from bs4 import BeautifulSoup
import re
import urllib.parse
from timeit import default_timer as timer
from datetime import timedelta
from tenacity import retry, stop_after_attempt

from utils import replace_data


headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'}

def strToFloat(num):
    num = re.sub(',', '', num)
    try:
        return float(num)
    except:
        return None


@retry(stop=stop_after_attempt(3))
def saveData(query):

    try:
        url = 'https://finance.yahoo.com/quote/' + urllib.parse.quote(query) + '?p=' + query
        r = requests.get(url, headers=headers, timeout=5).text

        soup = BeautifulSoup(r, 'html.parser')

        name = ' '.join((soup.find('h1', {'class': 'D(ib) Fz(18px)'}).text).split()[:-1])
        price = strToFloat(soup.find('div', {'class': 'D(ib) Mend(20px)'}).find_all('span')[0].text)
        change = soup.find('div', {'class': 'D(ib) Mend(20px)'}).find_all('span')[1].text
        change_amount = strToFloat(change.split(' ')[0])
        change_percent = strToFloat(re.sub('[(%)]', '', change.split()[1]))
        data = soup.find_all('td', {'class': 'Ta(end) Fw(600) Lh(14px)'})
        prev_close_value = strToFloat(data[0].text)
        open_value = strToFloat(data[1].text)
        volume = strToFloat(data[2].text)
        days_high = strToFloat((data[3].text).split()[0])
        days_low = strToFloat((data[3].text).split()[-1])
        fifty_two_week_high = strToFloat((data[4].text).split()[0])
        fifty_two_week_low = strToFloat((data[4].text).split()[-1])
        avg_volume = strToFloat(data[5].text)

        print(name, price, change_amount, change_percent, prev_close_value, open_value, days_high, days_low, fifty_two_week_high, fifty_two_week_low, volume, avg_volume)


    except Exception as e:
        print("Error", query, e)


def fetchData():
    indexes = ['^NSEI', '^BSESN', '^NSEBANK', '^CNXIT', 'BSE-SMLCAP.BO', 'BSE-MIDCAP.BO', '^CNXAUTO']
    for index in indexes:
        saveData(index)


def main():
    fetchData()

if __name__ == '__main__':
    start = timer()
    main()
    end = timer()
    print(timedelta(seconds=end-start))