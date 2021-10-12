import requests
from bs4 import BeautifulSoup

headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'}

def getData(symbol):
    url = 'https://finance.yahoo.com/quote/'+ symbol + '?p=' + symbol
    r = requests.get(url, headers=headers, timeout=5).text 

    soup = BeautifulSoup(r, 'html.parser')

    price = soup.find('div', {'class': 'D(ib) Mend(20px)'}).find_all('span')[0].text
    change = soup.find('div', {'class': 'D(ib) Mend(20px)'}).find_all('span')[1].text
    data = soup.find_all('td', {'class': 'Ta(end) Fw(600) Lh(14px)'})
    prev_close_value = data[0].text
    open_value = data[1].text
    days_range = data[4].text
    fifty_two_week_range = data[5].text
    volume = data[6].text
    avg_volume = data[7].text
    market_cap = data[8].text
    dividend = data[13].text
    prev_dividend_date = data[14].text

    print(symbol, price, change, prev_close_value, open_value, days_range)


def getMostActiveSocks():
    url = 'https://finance.yahoo.com/screener/unsaved/3f29f493-e529-4abd-852c-5a773fb8a7a4'
    r = requests.get(url, headers=headers, timeout=5).text

    soup = BeautifulSoup(r, 'html.parser')

    name = soup.find_all('td', {'class': 'Va(m) Ta(start) Px(10px) Fz(s)'})
    symbol = soup.find_all('a', {'class': 'Fw(600) C($linkColor)'})

    for i in range(0, len(name)):
        yield (name[i].text, symbol[i].text)


if __name__ == '__main__':
    # stockSymbols = ['ASPL.L', 'AAPL', 'TCS.NS']
    # for symbol in stockSymbols:
    #     getData(symbol)
    stocks = getMostActiveSocks()

    while True:
        try:
            stock = next(stocks)
            getData(stock[1])

        except StopIteration:
            break
