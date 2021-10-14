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

def create_table():
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


def replace_data(*args):
    cur = con.cursor()
    cur.execute("""
    INSERT INTO
    core_livestocks (symbol, name, price, change, change_percent, prev_close_value, open_value, days_range, fifty_two_week_range, volume, avg_volume, market_cap, dividend, prev_dividend_date)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    ON CONFLICT (symbol) DO
    UPDATE SET 
    name = %s, price = %s, change = %s, change_percent = %s, prev_close_value = %s, open_value = %s, days_range = %s, fifty_two_week_range = %s, volume = %s, avg_volume = %s, market_cap = %s, dividend = %s, prev_dividend_date = %s;
    """, (args + args[1:]))

    con.commit()
    print(f"data of {args[0]} saved in Live Stocks!")


if __name__ == "__main__":
    create_table()
