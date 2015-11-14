#!/usr/bin/env python
# -*- coding: utf-8 -*-

import signal
from multiprocessing import Process
from time import sleep
from page import fetch_html, parse_html

class FlightConsumer(Process):
    def __init__(self, options, date_queue):
        super(FlightConsumer, self).__init__()

        signal.signal(signal.SIGTERM, self.handler_sigterm)
        signal.signal(signal.SIGQUIT, self.handler_sigquit)

        self.is_stop    = False
        self.options    = options
        self.date_queue = date_queue

    def handler_sigterm(self):
        self.is_stop = True

    def handler_sigquit(self):
        self.is_stop = True

    def fetch_html(self, date_item):
        dpport = self.options['dpport']
        arport = self.options['arport']
        dpdate = date_item[0].strftime("%d/%m/%Y")
        ardate = date_item[1].strftime("%d/%m/%Y")
        cmpid  = self.options['cmpid']
        b2cpin = self.options['b2cpin']

        html = fetch_html(dpport, arport, dpdate, ardate, cmpid, b2cpin)
        rows = parse_html(html)

        print("{0} ~ {1}".format(dpdate, ardate))
        print("=========" * 5)

        for row in rows:
            print("{company_code:2s} {cabin:1s} {ticket_price:>8s} ({stay_day_min:>3s} ~ {stay_day_max:>3s}) ({valid_date_from:>10s} ~ {valid_date_to:>10s}) ({valid_buy_ticket_date_from:>10s} ~ {valid_buy_ticket_date_to:>10s})".format(
                company_code=row['company_code'],
                cabin=row['cabin'],
                ticket_price=row['ticket_price'],
                stay_day_min=row['stay_day_min'],
                stay_day_max=row['stay_day_max'],
                valid_date_from=row['valid_date_from'],
                valid_date_to=row['valid_date_to'],
                valid_buy_ticket_date_from=row['valid_buy_ticket_date_from'],
                valid_buy_ticket_date_to=row['valid_buy_ticket_date_to']
            ))

        self.date_queue.task_done()

    def run(self):
        try:
            while not self.is_stop:
                date_item = self.date_queue.get()

                if date_item is None:
                    self.date_queue.task_done()
                    break

                self.fetch_html(date_item)

                sleep(1)
        except KeyboardInterrupt:
            pass
