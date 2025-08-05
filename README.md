# Post API

The API built with NestJS for posts display.

## Prerequisites

- Node.js (version 18 or higher)
- npm or pnpm
- Docker (for PostgreSQL database)

## Tech Stack

- **NestJS** - Progressive Node.js framework
- **TypeORM** - Database ORM for TypeScript

## How to Run

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Set up Database

We recommend using Docker to run PostgreSQL. Run this command:

```bash
docker run --name my-postgres -e POSTGRES_USER=your_username -e POSTGRES_PASSWORD=your_password -e POSTGRES_DB=your_database -p your_port:5432 -d postgres
```

**Command flags explanation:**

- `--name my-postgres` - Sets container name to "my-postgres"
- `-e POSTGRES_USER=your_username` - Sets PostgreSQL username (matches `DB_USER` in .env)
- `-e POSTGRES_PASSWORD=your_password` - Sets PostgreSQL password (matches `DB_PASS` in .env)
- `-e POSTGRES_DB=your_database` - Creates database (matches `DB_NAME` in .env)
- `-p your_port:5432` - Maps container port 5432 to host port (matches `DB_PORT` in .env)
- `-d` - Runs container in detached mode (background)
- `postgres` - Uses PostgreSQL latest version image

**Note:** The values in this Docker command should match the corresponding values in your `.env` file.

### 3. Set up Environment Variables

Create a `.env` file in the root directory:

```env
PORT=4000
# Database
DB_HOST=localhost
DB_USER=your_username
DB_PASS=your_password
DB_NAME=your_database
DB_PORT=your_port
DB_SYNC=true
DB_LOG=false
SECRET_KEY=your_secret_key
# Initial Username
USER_USERNAME=admin
USER_PASSWORD=your_admin_password
```

Replace the placeholder values with your actual configuration.

### 4. Start the Application

```bash
pnpm run start:dev
```

The API will be available at `http://localhost:4000`

## API Documentation

Swagger UI is available at:

```bash
http://localhost:4000/docs
```

You can explore available endpoints, including request/response body samples.
