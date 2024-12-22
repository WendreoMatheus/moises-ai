.PHONY: start seed

start:
	@echo "Starting the server..."
	uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload

seed:
	@echo "Seeding the database..."
	PYTHONPATH=$(pwd) python -m backend.app.seed
