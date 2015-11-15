#!/usr/bin/env python
# -*- coding: utf-8 -*-

import optparse
from yata.crawler import Crawler
from yata.model import Flight

if __name__ == "__main__":
    parser = optparse.OptionParser(usage="Usage: %prog [options]")

    parser.add_option("--init", action="store_true", dest="init", help="init crawler")

    parser.add_option("--dpport", action="store", dest="dpport", help="from location")
    parser.add_option("--arport", action="store", dest="arport", help="to location")
    parser.add_option("--dpdate", action="store", dest="dpdate", help="from date, (format: 29/10/2015)")
    parser.add_option("--ardate", action="store", dest="ardate", help="to date, (format 31/10/2015)")
    parser.add_option("--cmpid",  action="store", dest="cmpid", help="your cmpid")
    parser.add_option("--b2cpin",  action="store", dest="b2cpin", help="your b2cpin")

    (options, args) = parser.parse_args()

    if options.dpport and options.arport and options.dpdate and options.ardate and options.cmpid and options.b2cpin:
        Crawler(options).start()
    elif options.init:
        Flight.create_table()
    else:
        parser.print_help()
