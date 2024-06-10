import psycopg2
import csv

connection = psycopg2.connect(
    dbname="gasstation",
    user="postgres",
    password="HYosOTWK",
    host="localhost",
    port="5432"
)

cursor = connection.cursor()

csv_file_path = "./data.csv"

with open(csv_file_path, 'r') as file:
    reader = csv.reader(file)
    next(reader)  
    for row in reader:
        cursor.execute("INSERT INTO station (name, lat, lon) VALUES (%s, %s, %s)", (row[0], row[1], row[2]))

connection.commit()

cursor.close()
connection.close()

print("Данные успешно загружены в базу данных.")