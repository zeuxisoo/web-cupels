#!/usr/bin/env python
# -*- coding: utf-8 -*-

from os.path import realpath, join, dirname, abspath
from datetime import datetime
from peewee import MySQLDatabase, Model
from peewee import CharField, IntegerField, DateTimeField, TextField
from util import string_to_datetime

db = MySQLDatabase('cupels', user='root', charset='utf8mb4')

db.connect()

class NoTZDateTimeField(DateTimeField):
    def db_value(self, value):
        return value.replace(tzinfo=None)

class BaseModel(Model):
    class Meta:
        database = db

class Flight(BaseModel):
    departure_port             = CharField(max_length=10, null=True, index=True)
    arrival_port               = CharField(max_length=10, null=True, index=True)
    company_code               = CharField(max_length=5, null=True, index=True)
    cabin                      = CharField(max_length=5, null=True)
    ticket_price               = IntegerField(null=True, index=True)
    stay_day_min               = CharField(max_length=5, null=True)
    stay_day_max               = CharField(max_length=5, null=True)
    valid_date_from            = NoTZDateTimeField(index=True)
    valid_date_to              = NoTZDateTimeField(index=True)
    valid_buy_ticket_date_from = NoTZDateTimeField(index=True)
    valid_buy_ticket_date_to   = NoTZDateTimeField(index=True)
    flight_info_link           = TextField(null=True)
    flight_info_link_cond_code = CharField(max_length=20, null=True)
    created_at                 = NoTZDateTimeField(default=lambda: string_to_datetime(datetime.now().strftime('%d/%m/%Y')))
    update_at                  = NoTZDateTimeField(default=lambda: string_to_datetime(datetime.now().strftime('%d/%m/%Y')))
