.PHONY: install test lint format clean docker-build docker-run help

help:
	@echo "AgentBench Framework - Available Commands"
	@echo "=========================================="
	@echo "make install      - Install dependencies"
	@echo "make test        - Run tests"
	@echo "make lint        - Run linters"
	@echo "make format      - Format code"
	@echo "make clean       - Clean cache files"
	@echo "make docker-build - Build Docker image"
	@echo "make docker-run  - Run Docker container"
	@echo "make jupyter     - Run Jupyter notebook"

install:
	pip install -r requirements.txt
	pip install pytest pytest-cov black flake8 mypy bandit

test:
	pytest -v --cov=src --cov-report=html

test-coverage:
	pytest --cov=src --cov-report=xml
	coverage html

lint:
	black --check .
	flake8 . --count --select=E9,F63,F7,F82 --show-source --statistics
	mypy src/ --ignore-missing-imports
	bandit -r src/

format:
	black .
	isort .

clean:
	find . -type d -name "__pycache__" -exec rm -rf {} +
	find . -type f -name "*.pyc" -delete
	find . -type f -name "*.pyo" -delete
	find . -type f -name ".coverage" -delete
	rm -rf .pytest_cache
	rm -rf htmlcov/
	rm -rf .coverage.xml

docker-build:
	docker build -t agentbench:latest .

docker-run:
	docker run --rm -v $$(pwd):/app agentbench:latest python -m pytest

jupyter:
	docker-compose up jupyter

docker-clean:
	docker-compose down -v
	docker system prune -f
