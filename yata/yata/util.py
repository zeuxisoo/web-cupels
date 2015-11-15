#!/usr/bin/env python
# -*- coding: utf-8 -*-

import re
from datetime import datetime

def price_to_intenger(value):
    return re.compile("(\d+.\d+)").search(value.replace(',','')).group(1)

def string_to_datetime(value):
    return datetime.strptime(value, '%d/%m/%Y')
