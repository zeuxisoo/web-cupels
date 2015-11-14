#!/usr/bin/env python
# -*- coding: utf-8 -*-

import optparse
import requests
from bs4 import BeautifulSoup

class Crawler(object):

    def __init__(self, options):
        self.dpport = options.dpport
        self.arport = options.arport
        self.dpdate = options.dpdate
        self.ardate = options.ardate
        self.cmpid  = options.cmpid
        self.b2cpin = options.b2cpin

    def fetch_html(self):
        dpdate_parts = self.dpdate.split('/')
        ardate_parts = self.ardate.split('/')

        data = {
            'DPPORT'            : self.dpport,
            'ARPORT'            : self.arport,
            'RoundTrip'         : 'RT',
            'PTP'               : 'Y',
            'DEPT_DATE_DAY'     : dpdate_parts[0],
            'DEPT_DATE_MONTH'   : dpdate_parts[1],
            'DEPT_DATE_YEAR'    : dpdate_parts[2],
            'dateboxdepart'     : self.dpdate,
            'RETURN_DATE_DAY'   : ardate_parts[0],
            'RETURN_DATE_MONTH' : ardate_parts[1],
            'RETURN_DATE_YEAR'  : ardate_parts[2],
            'dateboxarrive'     : self.ardate,
            'FLIGHT_CLASS'      : 'Y',
            'SortBy'            : 'SP',
            'pref_air'          : '',

            'cmpid'             : self.cmpid,
            'b2cpin'            : self.b2cpin,
            'lang'              : '',
            'submit.x'          : 23,
            'submit.y'          : 11,
            'submit'            : 'Search'
        }

        response = requests.post("http://www.travpulse.com/web/b2b2c_returnfares_chi.asp?query=0&page_value=ReturnFares", data=data)

        return response.text.encode("UTF-8")

    def parse_html(self, html):
        soup = BeautifulSoup(html, 'html.parser')
        company_table = soup.select('a[name=fare0] table')[0]
        company_list  = company_table.select('tr')

        row_count = 1

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

                print("{company_code:2s} {cabin:1s} {ticket_price:>8s} ({stay_day_min:>3s} ~ {stay_day_max:>3s}) ({valid_date_from:>10s} ~ {valid_date_to:>10s}) ({valid_buy_ticket_date_from:>10s} ~ {valid_buy_ticket_date_to:>10s})".format(
                    company_code=company_code,
                    cabin=cabin,
                    ticket_price=ticket_price,
                    stay_day_min=stay_day_min,
                    stay_day_max=stay_day_max,
                    valid_date_from=valid_date_from,
                    valid_date_to=valid_date_to,
                    valid_buy_ticket_date_from=valid_buy_ticket_date_from,
                    valid_buy_ticket_date_to=valid_buy_ticket_date_to
                ))

            row_count = row_count + 1

    def run(self):
        self.parse_html(self.fetch_html())

if __name__ == "__main__":
    parser = optparse.OptionParser(usage="Usage: %prog [options]")

    parser.add_option("--dpport", action="store", dest="dpport", help="from location")
    parser.add_option("--arport", action="store", dest="arport", help="to location")
    parser.add_option("--dpdate", action="store", dest="dpdate", help="from date, (format: 29/10/2015)")
    parser.add_option("--ardate", action="store", dest="ardate", help="to date, (format 31/10/2015)")
    parser.add_option("--cmpid",  action="store", dest="cmpid", help="your cmpid")
    parser.add_option("--b2cpin",  action="store", dest="b2cpin", help="your b2cpin")

    (options, args) = parser.parse_args()

    if options.dpport and options.arport and options.dpdate and options.ardate and options.cmpid and options.b2cpin:
        Crawler(options).run()
    else:
        parser.print_help()
