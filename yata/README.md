# Yata

## Installation

Create the environment and install requirements

    make env

Enable environment

    source venv/bin/activate

Create the database

    python index.py --init

## Usage

Fetch target flight info into flight table

    python index.py --dpport=HKG --arport=TPE --dpdate=30/11/2015 --ardate=15/12/2015 --cmpid=[CMPID] --b2cpin=[B2CPIN]
