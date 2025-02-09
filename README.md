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

DB_HOST=localhost
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

**Database Setup**
Before running the application, ensure that you have created the required MySQL database.

```bash
CREATE DATABASE earthquakes;
```

To set up the application, follow these steps:

1. **Install `pnpm` globally**:

```bash
   npm install -g pnpm
```

2. Install dependencies for both frontend and backend:

```bash
   pnpm install:all
```

4. To apply the generated migrations to your database, use the following command:

```bash
   pnpm --filter backend migration:run
```

5. To seed your database with initial data, run:

```bash
   pnpm --filter backend seed

```

6. To run both the frontend and backend in development mode simultaneously, use the following command:

```bash
   pnpm dev
```

Before running the application, ensure that you have created the required MySQL database.

Create the database:
bash
Copy
Edit
CREATE DATABASE earthquakes;
