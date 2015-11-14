all:
	@echo "make env"

env:
	virtualenv --no-site-package venv
	source venv/bin/activate && pip install -r requirements.txt
