.PHONY: start seed web

server:
	@echo "Starting the server..."
	uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload

seed:
	@echo "Seeding the database..."
	PYTHONPATH=$(pwd) python -m backend.app.seed

web:
	@echo "Starting the web server..."
	cd frontend && npm run dev

start:
	@echo "Starting the server and web server..."
	make server & make web