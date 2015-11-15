#!/usr/bin/env python
# -*- coding: utf-8 -*-

from multiprocessing import Process, JoinableQueue, cpu_count
from consumer import FlightConsumer

class FlightProducer(Process):

    def __init__(self, options={}, date_group=[]):
        self.options    = options
        self.date_group = date_group
        self.date_queue = JoinableQueue()

    def start(self):
        consumers_list = []
        consumers_num  = cpu_count() * 2

        # Consumers
        for i in xrange(consumers_num):
            consumers_list.append(FlightConsumer(self.options, self.date_queue))

        for consumer in consumers_list:
            consumer.start()

        # Put each date group to queue
        for date_item in self.date_group:
            self.date_queue.put(date_item)

        # Tell consumers can exit
        for i in xrange(consumers_num):
            self.date_queue.put(None)

        # Wait for all of the consumers to finish
        self.date_queue.join()

        print('Done')
