.PHONY: start seed

start:
	@echo "Starting the server..."
	uvicorn main:app --host 0.0.0.0 --port 8000 --reload

seed:
	@echo "Seeding the database..."
	python -m app.seed
