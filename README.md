# Earthquake App

This is an Earthquake App where users can view, add, update, and delete earthquake data. The application consists of a frontend and a backend that interact with each other using GraphQL.

### Features:

- **View Earthquakes**: Display earthquake data.
- **Add Earthquakes**: Allow users to submit new earthquake information.
- **Update Earthquakes**: Modify existing earthquake details.
- **Delete Earthquakes**: Remove earthquake records.

### Frontend

The frontend is built with:

- **Next.js** for client and server side rendering.
- **TypeScript** for static typing.
- **Tailwind CSS** for utility-first styling.
- **Apollo Client** for querying data needed on frontend.

### Backend

The backend is built with:

- **Node.js** and **Express** for the server.
- **Apollo Server** for handling GraphQL queries and mutations.
- **MySQL** as the database.

## Installation

**Add Backend Environment Variable**

```bash
# .env

DB_HOST=db
DB_PORT=3306
DB_USERNAME=root # depending on your username
DB_PASSWORD=12345678 # depending on your password
DB_NAME=earthquakes # depending on your db name
SERVER_PORT=4000
CORS_ORIGIN=http://localhost:3000
CSV_FILE_PATH=data/earthquakes1970-2014.csv
```

**Add Frontend Environment Variable**

```bash
# .env

NEXT_PUBLIC_GRAPHQL_URI=http://localhost:4000/graphql
```

Before running the application, ensure that you have created the required MySQL database:

```bash
CREATE DATABASE earthquakes;
```

To set up the application, follow these steps:

1. Build Docker image:

```bash
   pnpm docker:build
```

2. Start services defined in docker compose and start Backend:

```bash
   pnpm docker:up
```

3. Install Frontend dependencies:

```bash
   pnpm install:frontend
```

4. Start Frontend:

```bash
   pnpm dev:frontend
```

Acess application on localhost:3000
