# Moises AI Project

Welcome to the Moises AI Project! This project is a full-stack application that includes a frontend, backend, and database.

## Technologies Used

- **Frontend**: React, Vite, TypeScript, Bulma, Axios
- **Backend**: FastAPI, SQLAlchemy, PostgreSQL
- **Database**: PostgreSQL
- **Containerization**: Docker, Docker Compose

### Running the Project with Docker Compose

1. Create a `.env` file in the root directory with the following content:

```
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
```

2. Build and start the services using Docker Compose:

```sh
docker-compose up --build
```

3. Access the frontend application at `http://localhost` and the backend API at `http://localhost:8000`.

4. To seed the database, you can use the `/seed` endpoint:

```sh
curl http://localhost:8000/seed
```

This will populate the database with initial data.

### API Documentation

You can access the API documentation at the following paths:

- Swagger UI: [http://localhost:8000/docs](http://localhost:8000/docs)
- ReDoc: [http://localhost:8000/redoc](http://localhost:8000/redoc)
