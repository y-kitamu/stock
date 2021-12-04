.PHONY: clean clean-test clean-pyc clean-build test

clean: clean-build clean-pyc clean-test ## remove all build, test, coverage and Python artifacts

root_dir := $(dir $(realpath $(firstword $(MAKEFILE_LIST))))

clean-build: ## remove build artifacts
	rm -fr build/
	rm -fr dist/
	rm -fr .eggs/
	find . -name '*.egg-info' -exec rm -fr {} +
	find . -name '*.egg' -exec rm -f {} +

clean-pyc: ## remove Python file artifacts
	find . -name '*.pyc' -exec rm -f {} +
	find . -name '*.pyo' -exec rm -f {} +
	find . -name '*~' -exec rm -f {} +
	find . -name '__pycache__' -exec rm -fr {} +

clean-test: ## remove test and coverage artifacts
	rm -f .coverage
	rm -fr htmlcov/
	rm -fr .pytest_cache

build-test:
	pip install -r requirements.txt
	pip install -r requirements_dev.txt
	pip install -e .
	python stock/zip.py -s ${root_dir}/data/stock

lint/flake8: build-test ## check style with flake8
	flake8 stock tests

lint: lint/flake8 ## check style

test: build-test ## run tests quickly with the default Python
	pytest ./tests

coverage: build-test ## check code coverage quickly with the default Python
	coverage run --source stock -m pytest
	coverage report -m
	coverage xml

build:
	pip install -r requirements.txt
	pip install .

collect_data: build # collect stock data from api
	python stock/downloader.py -s ${root_dir}/data/stock -t ${root_dir}/data/code.csv

build-docker:
	./docker/build_docker.sh
