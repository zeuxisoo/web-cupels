#!/usr/bin/env python
# -*- coding: utf-8 -*-

import requests
from bs4 import BeautifulSoup
from urlparse import parse_qs

def fetch_html(dpport, arport, dpdate, ardate, cmpid, b2cpin):
    dpdate_parts = dpdate.split('/')
    ardate_parts = ardate.split('/')

    data = {
        'DPPORT'            : dpport,
        'ARPORT'            : arport,
        'RoundTrip'         : 'RT',
        'PTP'               : 'Y',
        'DEPT_DATE_DAY'     : dpdate_parts[0],
        'DEPT_DATE_MONTH'   : dpdate_parts[1],
        'DEPT_DATE_YEAR'    : dpdate_parts[2],
        'dateboxdepart'     : dpdate,
        'RETURN_DATE_DAY'   : ardate_parts[0],
        'RETURN_DATE_MONTH' : ardate_parts[1],
        'RETURN_DATE_YEAR'  : ardate_parts[2],
        'dateboxarrive'     : ardate,
        'FLIGHT_CLASS'      : 'Y',
        'SortBy'            : 'SP',
        'pref_air'          : '',

        'cmpid'             : cmpid,
        'b2cpin'            : b2cpin,
        'lang'              : '',
        'submit.x'          : 23,
        'submit.y'          : 11,
        'submit'            : 'Search'
    }

    response = requests.post("http://www.travpulse.com/web/b2b2c_returnfares_chi.asp?query=0&page_value=ReturnFares", data=data)

    return response.text.encode("UTF-8")

def parse_html(html):
    soup = BeautifulSoup(html, 'html.parser')
    company_table = soup.select('a[name=fare0] table')[0]
    company_list  = company_table.select('tr')

    row_count = 1
    row_list  = []

    for company in company_list:
        if row_count >= 3 and row_count % 2 != 0:
            company_code               = company.select("td")[2].getText() # 航空公司
            cabin                      = company.select("td")[3].getText() # 客艙類別
            ticket_price               = company.select("td")[5].getText() # 成人票價
            stay_day_min               = company.select("td")[6].getText() # 停留天數 - 最短
            stay_day_max               = company.select("td")[7].getText() # 停留天數 - 最長
            valid_date_from            = company.select("td")[8].getText() # 行程有效期 - 由
            valid_date_to              = company.select("td")[9].getText() # 行程有效期 - 至
            valid_buy_ticket_date_from = company.select("td")[10].getText() # 出票期限 - 由
            valid_buy_ticket_date_to   = company.select("td")[11].getText() # 出票期限 - 至
            flight_info_link           = company.select("td")[14].select("a")[0]['href'] # 出票期限 - 至

            flight_info_link_cond_code = parse_qs(flight_info_link)['cond_code'][0]

            row_list.append({
                'company_code'               : company_code,
                'cabin'                      : cabin,
                'ticket_price'               : ticket_price,
                'stay_day_min'               : stay_day_min,
                'stay_day_max'               : stay_day_max,
                'valid_date_from'            : valid_date_from,
                'valid_date_to'              : valid_date_to,
                'valid_buy_ticket_date_from' : valid_buy_ticket_date_from,
                'valid_buy_ticket_date_to'   : valid_buy_ticket_date_to,
                'flight_info_link'           : flight_info_link,
                'flight_info_link_cond_code' : flight_info_link_cond_code
            })

        row_count = row_count + 1

    return row_list
