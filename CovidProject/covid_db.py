import csv
import pymysql
from flask import Flask

app = Flask(__name__)

from config import db
import pymysql


def insert_data(connection, file_path, table_name, column_mapping):
    print(connection,file_path,table_name,column_mapping)
    with open(file_path) as csvfile:
        reader = csv.DictReader(csvfile, delimiter=',')
        # print(reader)
        cursor = connection.cursor()
        # print(cursor)
        for row in reader:
            # print(row.keys())
            row_keys = [tuple(row[r] for r in row.keys())]
            # print(row_keys)
            col_map_tostring = ', '.join(column_mapping)
            # print(col_map_tostring)
            insert_query = f"INSERT INTO {table_name}({col_map_tostring}) VALUES ({', '.join(['%s'] * len(row_keys[0]))})"
            # print(insert_query)
            cursor.executemany(insert_query, row_keys)
            connection.commit()

# connection = pymysql.connect(host='localhost', user='root', password='1234', db='project1')
DB_URL = f"mysql+mysqlconnector://{db['user']}:{db['password']}@{db['host']}:{db['port']}/{db['database']}?charset=utf8"

connection = pymysql.connect(
    host=db['host'],
    user=db['user'],
    password=db['password'],
    db=db['database'],
    port=db['port']
)

file_table_mapping = {
    'db/covid_1.csv': ('covid_tbl_1', ['date', 'total', 'kor', 'ab', 'd_']),
    'db/covid_2.csv': ('covid_tbl_2', ['date', 'total', 'age9', 'age19', 'age29', 'age39', 'age49', 'age59', 'age69', 'age79', 'age80']),
    'db/covid_3.csv': ('covid_tbl_3', ['date', 'total', 'm', 'w']),
    'db/covid_4.csv': ('covid_tbl_4', ['date', 'total', 'seoul', 'busan', 'daegu', 'incheon', 'gwangju', 'daejeon', 'ulsan', 'sejong', 'gyeonggi', 'gangwon', 'chungbuk', 'chungnam', 'jeonbuk', 'jeonnam', 'gyeongbuk', 'gyeongnam', 'jeju']),
    'db/covid_5.csv': ('covid_tbl_5', ['date', 'total', 'seoul', 'busan', 'daegu', 'incheon', 'gwangju', 'daejeon', 'ulsan', 'sejong', 'gyeonggi', 'gangwon', 'chungbuk', 'chungnam', 'jeonbuk', 'jeonnam', 'gyeongbuk', 'gyeongnam', 'jeju']),
    'db/covid_6.csv': ('covid_tbl_6', ['sido', 'sigungu', 'cumul_confirmed', 'cumul_deaths', 'incidence_rate', 'death_rate']),
    'db/covid_7.csv': ('covid_tbl_7', ['sido', 'sigungu', 'cumul_confirmed', 'cumul_deaths', 'incidence_rate', 'death_rate']),
}

for file, (table, column_mapping) in file_table_mapping.items():
    insert_data(connection, file, table, column_mapping)

connection.close()