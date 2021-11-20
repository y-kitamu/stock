.PHONY: clean clean-test clean-pyc clean-build test

clean: clean-build clean-pyc clean-test ## remove all build, test, coverage and Python artifacts

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
	dvc remote modify gdr --local gdrive_service_account_json_file_path cert/stockdata-332410-704571e36294.json
	dvc pull

lint/flake8: build-test ## check style with flake8
	flake8 stock tests

lint: lint/flake8 ## check style

test: build-test ## run tests quickly with the default Python
	pytest ./tests

coverage: build-test ## check code coverage quickly with the default Python
	coverage run --source stock -m pytest
	coverage report -m

build:
	pip install -r requirements.txt
	dvc remote modify gdr --local gdrive_service_account_json_file_path cert/stockdata-332410-704571e36294.json
	dvc pull

collect_data: build # collect stock data from api
	python stock/downloader.py
	dvc add .
	dvc push
