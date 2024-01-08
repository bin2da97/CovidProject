import pymysql
from flask import Flask, render_template
import json
import pandas as pd
import numpy as np
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

# sql_db 연결 및 데이터가져오기
covid_db = pymysql.Connect(host='localhost', user='root', password='1234', db='project1')


def db_select_tbl(i):
    return "SELECT * FROM " + str(i)


def execute_(x, y):
    return x.execute(y)


def fetchall_(t):
    return t.fetchall()


def mapping(list1):
    dict_mapping_name = {}
    for idx, i in enumerate(list1):
        if str(idx) not in dict_mapping_name.keys():
            dict_mapping_name[str(idx)] = ''
            dict_mapping_name[str(idx)] = i
        else:
            dict_mapping_name[str(idx)] = i
    return dict_mapping_name


def to_json2(df, orient='split'):
    df_json = df.to_json(orient=orient, force_ascii=False)
    return json.loads(df_json)


def number_handling(v):
    v = v.replace({',': ''}, regex=True)
    v = v.apply(pd.to_numeric, errors='coerce').dropna().astype(int)
    return v


def df_year_month(dict_):
    df = pd.DataFrame(dict_)
    df['Date'] = pd.to_datetime(df['date'], errors='coerce')
    df['year'] = df['Date'].dt.year
    df['month'] = df['Date'].dt.month
    df[list(dict_.keys())[2:]] = df[list(dict_.keys())[2:]].apply(lambda x: number_handling(x), axis=1)
    title = list(dict_.keys())[2:]
    list_month_sum = [df.groupby(['year', 'month'])[str(i)].sum() for i in title]
    # print(list_month_sum)
    list_json = [to_json2(j) for j in list_month_sum]
    # print(list_json)
    return list_json


db_tbl = ["covid_tbl_1", "covid_tbl_2", "covid_tbl_3", "covid_tbl_4", "covid_tbl_5", "covid_tbl_6", "covid_tbl_7"]
db_select_table = [db_select_tbl(z) for z in db_tbl]
cursor_list = [covid_db.cursor() for j in ['cursor_' + str(i) for i in range(7)]]
cursor_execute_ = [execute_(i, j) for i, j in zip(cursor_list, db_select_table)]
data_list = [fetchall_(w) for w in cursor_list]
group_list = [['mno', 'date', 'total', 'korea', 'broad', 'death'],
              ['mno', 'date', 'total', '0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70-79', '80'],
              ['mno', 'date', 'total', 'm', 'w'],
              ['mno', 'date', 'total', 'seoul', 'busan', 'daegu', 'incheon', 'gwangju', 'daejeon', 'ulsan',
               'sejong', 'gyeonggi', 'gangwon', 'chungbuk', 'chungnam', 'jeonbuk', 'jeonnam', 'gyeongbuk',
               'gyeongnam', 'jeju'],
              ['mno', 'date', 'total', 'seoul', 'busan', 'daegu', 'incheon', 'gwangju', 'daejeon', 'ulsan',
               'sejong', 'gyeonggi', 'gangwon', 'chungbuk', 'chungnam', 'jeonbuk', 'jeonnam', 'gyeongbuk',
               'gyeongnam', 'jeju'],
              ['mno', 'sido', 'sigungu', 'cumul_confirmed', 'cumul_deaths', 'incidence_rate', 'death_rate'],
              ['mno', 'sido', 'sigungu', 'cumul_confirmed', 'cumul_deaths', 'incidence_rate', 'death_rate']]


@app.route('/index')
def index():
    dict_mapping_list = []
    for i in group_list:
        dict_mapping_list.append(mapping(i))


    dict_list = []
    for i in dict_mapping_list:
        dict1 = {}
        for v in i.values():
            dict1[v] = []
        dict_list.append(dict1)
    # print(dict_list)

    for idx in range(7):
        for i in data_list[idx]:
            for idx2, data in enumerate(i):
                dict_list[idx][dict_mapping_list[idx][str(idx2)]].append(data)
    # print(dict_list)

    json2_df_year_month_list = []
    for i in dict_list[:-2]:
        json2_df_year_month_list.append(df_year_month(i))
    # print(json2_df_year_month_list[0])
    # print(json2_df_year_month_list[1])
    # print(json2_df_year_month_list[2])
    # print(json2_df_year_month_list[3])
    # print(json2_df_year_month_list[4])

    df2 = pd.DataFrame(dict_list[-2])
    df3 = pd.DataFrame(dict_list[-1])
    # print(df)
    # 타입 변경
    df2[group_list[-2][3:]] = df2[group_list[-2][3:]].apply(lambda x: number_handling(x), axis=1)
    df3[group_list[-1][3:]] = df3[group_list[-1][3:]].apply(lambda x: number_handling(x), axis=1)
    # print(df)

    df2 = df2.set_index(['sido', 'sigungu'])
    df3 = df3.set_index(['sido', 'sigungu'])
    # print(df)
    json2 = to_json2(df2)
    json3 = to_json2(df3)
    # print(json2)
    sido_total = np.array(json2['data']).T.tolist()
    sigungu_total = np.array(json3['data']).T.tolist()
    # print(datas)
    # print(json2_df_year_month_list)

    url = 'https://news.search.naver.com/search.naver?query=%EC%BD%94%EB%A1%9C%EB%82%98&where=news&ie=utf8&sm=nws_hty'

    response = requests.get(url)

    news_link_list = {'link': []}
    titles_list = []
    data_link = []

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')

        news_articles = soup.select('.news_area')

        for idx, article in enumerate(news_articles, 1):
            news_title = article.select_one('a.news_tit')['title']
            news_link = article.select_one('a.news_tit')['href']
            titles_list.append(news_title)
            news_link_list['link'].append(news_link)
        df = pd.DataFrame(news_link_list)
        data_link = df.to_json()
    else:
        print(f"Failed to retrieve the page. Status code: {response.status_code}")
    return render_template('main.html',
                           data_0_5_list=json2_df_year_month_list,
                           sido_total_data=sido_total,
                           sigungu_data=sigungu_total,
                           sido_total_label=json2['index'],
                           sigungu_label=json3['index'],
                           linklist=data_link,
                           titlelist=titles_list)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
