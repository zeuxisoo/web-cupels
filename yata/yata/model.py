#!/usr/bin/env python
# -*- coding: utf-8 -*-

from os.path import realpath, join, dirname, abspath
from datetime import datetime
from peewee import SqliteDatabase, Model
from peewee import CharField, IntegerField, DateTimeField, TextField

database_file = realpath(join(dirname(abspath(__file__)), '../storage/flight.db'))

db = SqliteDatabase(database_file)
db.connect()

class BaseModel(Model):
    class Meta:
        database = db

class Flight(BaseModel):
    company_code               = CharField(max_length=5, null=True)
    cabin                      = CharField(max_length=5, null=True)
    ticket_price               = IntegerField(null=True)
    stay_day_min               = CharField(max_length=5, null=True)
    stay_day_max               = CharField(max_length=5, null=True)
    valid_date_from            = DateTimeField()
    valid_date_to              = DateTimeField()
    valid_buy_ticket_date_from = DateTimeField()
    valid_buy_ticket_date_to   = DateTimeField()
    flight_info_link           = TextField(null=True)
    created_at                 = DateTimeField(default=datetime.now)
    update_at                  = DateTimeField(default=datetime.now)
