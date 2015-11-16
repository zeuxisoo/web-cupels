#!/usr/bin/env python
# -*- coding: utf-8 -*-

from os.path import realpath, join, dirname, abspath
from datetime import datetime
from peewee import SqliteDatabase, Model
from peewee import CharField, IntegerField, DateTimeField, TextField
from util import string_to_datetime

database_file = realpath(join(dirname(abspath(__file__)), '../storage/flight.db'))

db = SqliteDatabase(database_file)
db.connect()

class NoTZDateTimeField(DateTimeField):
    def db_value(self, value):
        return value.replace(tzinfo=None)

class BaseModel(Model):
    class Meta:
        database = db

class Flight(BaseModel):
    company_code               = CharField(max_length=5, null=True)
    cabin                      = CharField(max_length=5, null=True)
    ticket_price               = IntegerField(null=True)
    stay_day_min               = CharField(max_length=5, null=True)
    stay_day_max               = CharField(max_length=5, null=True)
    valid_date_from            = NoTZDateTimeField()
    valid_date_to              = NoTZDateTimeField()
    valid_buy_ticket_date_from = NoTZDateTimeField()
    valid_buy_ticket_date_to   = NoTZDateTimeField()
    flight_info_link           = TextField(null=True)
    created_at                 = NoTZDateTimeField(default=lambda: string_to_datetime(datetime.now().strftime('%d/%m/%Y')))
    update_at                  = NoTZDateTimeField(default=lambda: string_to_datetime(datetime.now().strftime('%d/%m/%Y')))
