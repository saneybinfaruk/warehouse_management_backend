# Warehouse Management System

A mobile warehouse management prototype designed to streamline inventory tracking, manage storage operations, and optimize warehouse processes. This system enables efficient handling of warehouse tasks with the help of a robust backend architecture.

## Features
- Secure authentication using JSON Web Tokens (JWT)
- Form validation with Zod for reliable data input
- Integration with Supabase for PostgreSQL database management
- Backend powered by GraphQL for flexible API queries and mutations
- Secure password management using bcrypt

## Technologies Used
- **GraphQL**: API layer for handling queries and mutations
- **JWT (jsonwebtoken)**: Secure token-based authentication
- **Zod**: Schema validation for API requests and forms
- **bcrypt**: Password hashing for secure storage
- **PostgreSQL**: Relational database via Supabase

## Installation

### Prerequisites
Ensure that you have Node.js and npm installed on your machine.

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/warehouse-management-system.git
    ```

2. Navigate to the project directory:
    ```bash
    cd warehouse-management-system
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

## Running the Application

1. To start the server using `nodemon`, run:
    ```bash
    npm run start:nodemon
    ```

2. The server will be running at `http://localhost:4000` or the specified port in your configuration.

## Environment Variables
Make sure to configure your environment variables before running the app. Create a `.env` file in the root of your project with the following:

```plaintext
SUPABASE_URL=<your_supabase_url>
SUPABASE_KEY=<your_supabase_key>
JWT_SECRET=<your_jwt_secret>
