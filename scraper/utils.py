from re import A
import psycopg2

try:
    con = psycopg2.connect(
        host="ec2-107-22-18-26.compute-1.amazonaws.com",
        database="da89d95rl8ohhe",
        user="mvtvvtlxluxctw",
        port="5432",
        password="583116a4434894171d37c418dd73ac9b328a1b8adda853fd9f2a309464f6e7df")

except Exception as e:
    print("Error:", e)

# symbol, name, price, change, change_percent, prev_close_value,
# open_value, days_range, fifty_two_week_range,
# volume, avg_volume, market_cap, dividend, prev_dividend_date

def create_livestocks_table():
    cur = con.cursor()
    cur.execute("""
    CREATE TABLE IF NOT EXISTS core_livestocks
    (
        symbol VARCHAR PRIMARY KEY NOT NULL,
        name VARCHAR NOT NULL,
        price FLOAT NOT NULL,
        change FLOAT NOT NULL,
        change_percent FLOAT NOT NULL,
        prev_close_value FLOAT NULL,
        open_value FLOAT NULL,
        days_range VARCHAR NULL,
        fifty_two_week_range VARCHAR NULL,
        volume INT NULL,
        avg_volume INT NULL,
        market_cap VARCHAR NULL,
        dividend VARCHAR NULL,
        prev_dividend_date VARCHAR NULL
    )
    """)

    cur.close()

    con.commit()
    print("Table Live Stocks created!")


def del_table():
    cur = con.cursor()
    cur.execute("""
    DROP TABLE core_livestocks;
    """)

    cur.close()

    con.commit()
    print("Table Live Stocks deleted!")


def replace_livestocks_data(*args):
    cur = con.cursor()
    cur.execute("""
    INSERT INTO
    core_livestocks (symbol, name, price, change_amount, prev_close_value, open_value, bid_value, bid_quantity, ask_value, ask_quantity, days_high, days_low, fifty_two_week_high, fifty_two_week_low, volume, avg_volume, market_cap, pe_ratio, eps_ratio, forward_dividend_yield)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    ON CONFLICT (symbol) DO
    UPDATE SET 
    name = %s, price = %s, change_amount = %s, prev_close_value = %s, open_value = %s, bid_value = %s, bid_quantity = %s, ask_value = %s, ask_quantity = %s, days_high = %s, days_low = %s, fifty_two_week_high = %s, fifty_two_week_low = %s, volume = %s, avg_volume = %s, market_cap = %s, pe_ratio = %s, eps_ratio = %s, forward_dividend_yield = %s;
    """, (args + args[1:]))

    con.commit()

