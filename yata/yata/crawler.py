#!/usr/bin/env python
# -*- coding: utf-8 -*-

from datetime import date, timedelta
from producer import FlightProducer

class Crawler(object):

    def __init__(self, options):
        self.dpport = options.dpport
        self.arport = options.arport
        self.dpdate = options.dpdate
        self.ardate = options.ardate
        self.cmpid  = options.cmpid
        self.b2cpin = options.b2cpin

    def chunks(self, array, n):
        array_size = len(array)

        for i in xrange(0, array_size):
            if i + 1 < array_size:
                start = array[i]
                end   = array[i+1]

                yield [start, end]

    def start(self):
        dpdate_parts = self.dpdate.split('/')
        ardate_parts = self.ardate.split('/')

        date_start = date(int(dpdate_parts[2]), int(dpdate_parts[1]), int(dpdate_parts[0]))
        date_end   = date(int(ardate_parts[2]), int(ardate_parts[1]), int(ardate_parts[0]))

        date_diff  = date_end - date_start
        date_list  = [date_start + timedelta(days=i) for i in range(date_diff.days + 1)]
        date_group = list(self.chunks(date_list, 2))

        options = dict(
            dpport=self.dpport,
            arport=self.arport,
            dpdate=self.dpdate,
            ardate=self.ardate,
            cmpid=self.cmpid,
            b2cpin=self.b2cpin,
        )

        FlightProducer(options, date_group).start()
