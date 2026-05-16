# Full Stack Serverless React Application
## Frontend - My App

A modern React-based frontend application built with **Vite** and **TypeScript**. This application serves as the client interface for a full-stack serverless web application.

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Configuration](#configuration)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)

## 🎯 Overview

This is a full-stack application frontend that communicates with AWS serverless backend services. The application provides user authentication, gallery management, and user profile features with a responsive React-based interface.

## 🛠️ Tech Stack

- **React** 19.2.0 - UI library
- **TypeScript** 5.9.3 - Type-safe JavaScript
- **Vite** 7.2.4 - Lightning-fast build tool and dev server
- **React Router DOM** 7.11.0 - Client-side routing
- **dotenv** 17.4.2 - Environment variable management
- **ESLint** 9.39.1 - Code quality and linting

## 📁 Project Structure

```
frontend/my-app/
├── src/
│   ├── Components/          # Reusable React components
│   ├── Shared/              # Shared utilities and constants
│   ├── app/                 # App-level configuration and setup
│   ├── context/             # React Context API for state management
│   ├── features/            # Feature-specific modules and logic
│   ├── hooks/               # Custom React hooks
│   ├── pages/               # Page components for routes
│   ├── services/            # API services and external integrations
│   ├── utils/               # Utility functions
│   ├── index.css            # Global styles
│   └── main.tsx             # Application entry point
├── public/                  # Static assets
├── .env                     # Environment variables (local)
├── .env.example             # Example environment variables
├── eslint.config.js         # ESLint configuration
├── index.html               # HTML template
├── package.json             # Project dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── tsconfig.app.json        # App-specific TypeScript config
├── tsconfig.node.json       # Node-specific TypeScript config
├── vite.config.ts           # Vite configuration
└── package-lock.json        # Dependency lock file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend/my-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables:**
   Update `.env` with your backend API endpoint and other required configuration.

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (default Vite port).

## 📝 Available Scripts

### `npm run dev`
Starts the development server with hot module replacement (HMR).

### `npm run build`
Builds the TypeScript files and creates an optimized production build using Vite.

### `npm run lint`
Runs ESLint to check code quality and formatting issues.

### `npm run preview`
Previews the production build locally before deployment.

## ⚙️ Configuration

### Environment Variables

Create a `.env` file based on `.env.example`. Required variables:

```env
VITE_API_BASE_URL=<your-backend-api-url>
VITE_JWT_TOKEN_KEY=authToken
# Add other required variables
```

### TypeScript

The project uses TypeScript for type safety. Configuration files:
- `tsconfig.json` - Main TypeScript configuration
- `tsconfig.app.json` - Application-specific settings
- `tsconfig.node.json` - Node.js tooling settings

### Vite

Configuration in `vite.config.ts` includes:
- React plugin with Babel refresh
- Port and proxy settings
- Build optimization options

## ✨ Features

- **User Authentication** - Sign up and login functionality
- **User Profiles** - View and manage user information
- **Gallery Management** - Upload and browse user galleries
- **Responsive Design** - Mobile-friendly interface
- **Type Safety** - Full TypeScript support
- **Fast Development** - Hot module replacement with Vite
- **Code Quality** - ESLint integration for code standards

## 📂 Folder Structure Details

### `src/Components/`
Reusable UI components used across the application (buttons, cards, modals, etc.).

### `src/pages/`
Page components corresponding to different routes (Home, Login, Gallery, Profile, etc.).

### `src/services/`
API service layer for communicating with the backend. Handles HTTP requests and data fetching.

### `src/context/`
React Context API setup for global state management (authentication state, user data, etc.).

### `src/hooks/`
Custom React hooks for reusable component logic (useAuth, useFetch, etc.).

### `src/utils/`
Utility functions and helpers (formatters, validators, storage helpers, etc.).

### `src/features/.`
Feature-specific modules that bundle components, services, and logic related to a specific feature.

## 🧪 Code Quality

The project uses ESLint with React-specific rules:
- React Hooks rules
- React Refresh compatibility
- Modern JavaScript standards

Run linting before committing:
```bash
npm run lint
```

## 📦 Building for Production

Create an optimized production build:
```bash
npm run build
```

The build output will be in the `dist/` directory, ready for deployment.

Preview the production build locally:
```bash
npm run preview
```

## 🔗 Integration with Backend

This frontend communicates with the serverless backend API. Ensure the backend is deployed and configure the `VITE_API_BASE_URL` environment variable to point to your backend API endpoint.

### Key API Endpoints:
- `POST /signup` - User registration
- `POST /login` - User login
- `GET /users/{id}` - Get user profile
- `GET /users` - Get all users
- `POST /gallery/upload` - Upload image to gallery
- `GET /gallery/{email}` - Get the user's gallery


## Backend - Serverless API

A serverless backend application built with **Node.js** and **AWS Lambda** using the **Serverless Framework**. This application provides authentication, user management, and image gallery services powered by DynamoDB and S3.

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [AWS Resources](#aws-resources)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)

## 🎯 Overview

This serverless backend provides RESTful API endpoints for user authentication, user management, and image gallery operations. It's built on AWS Lambda and integrates with DynamoDB for data storage and S3 for image uploads. The application uses JWT for authentication and bcryptjs for password hashing.

## 🛠️ Tech Stack

- **Node.js** 22.x - JavaScript runtime
- **Serverless Framework** - Infrastructure as Code for AWS Lambda
- **AWS Lambda** - Serverless compute service
- **AWS DynamoDB** - NoSQL database
- **AWS S3** - Object storage for images
- **AWS HTTP API** - RESTful API gateway
- **jsonwebtoken** 9.0.3 - JWT token generation and validation
- **bcryptjs** 3.0.3 - Password hashing
- **AWS SDK v3** - AWS service integration
- **serverless-dotenv-plugin** 6.0.0 - Environment variable management

## 🏗️ Architecture

```
┌─────────────────────────────────────────────┐
│         Frontend Application (React)        │
└──────────────────┬──────────────────────────┘
                   │ HTTP Requests
                   ▼
┌─────────────────────────────────────────────┐
│         AWS HTTP API Gateway                │
└──────────────────┬──────────────────────────┘
                   │
        ┌──────────┼──────────┐
        ▼          ▼          ▼
    ┌────────┐ ┌────────┐ ┌────────┐
    │ Auth   │ │ Users  │ │Gallery │
    │ Lambda │ │ Lambda │ │ Lambda │
    └────────┘ └────────┘ └────────┘
        │          │          │
        └──────────┼──────────┘
                   │
        ┌──────────┼──────────┐
        ▼                     ▼
    ┌──────────┐        ┌──────────┐
    │DynamoDB  │        │   S3     │
    │  Table   │        │  Bucket  │
    └──────────┘        └──────────┘
```

## 📁 Project Structure

```
serverless/
├── src/
│   ├── handlers/                 # Lambda function handlers
│   │   ├── auth/                 # Authentication handlers
│   │   │   ├── signup.ts         # User registration
│   │   │   └── login.ts          # User login
│   │   ├── users/                # User management handlers
│   │   │   ├── getOne.ts         # Fetch, single user
│   │   │   ├── getAll.ts         # Fetch all users
│   │   └── gallery/              # Gallery handlers
│   │       ├── uploadImage.ts    # Image upload
│   │       └── getGallery.ts     # Fetch gallery
│   ├── middleware/               # Middleware functions
│   ├── services/                 # Business logic services
│   ├── utils/                    # Utility functions
│   └── config/                   # Configuration files
├── serverless.yml               # Serverless configuration
├── package.json                 # Dependencies and scripts
├── package-lock.json            # Dependency lock file
├── .gitignore                   # Git ignore rules
└── .env.example                 # Example environment variables
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v22.x or higher)
- npm (v7 or higher)
- AWS Account with appropriate IAM permissions
- Serverless Framework CLI (`npm install -g serverless`)
- AWS CLI configured with credentials

### Installation

1. **Navigate to the backend directory:**
   ```bash
   cd serverless
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables:**
   ```env
   JWT_SECRET=your_jwt_secret_key_here
   ```

### Local Development

To run the application locally for testing:

```bash
serverless offline
```

This starts a local HTTP API gateway on `http://localhost:3000`.

## ⚙️ Configuration

### Serverless Configuration (`serverless.yml`)

The serverless.yml file defines:

- **Service**: `my-service`
- **Provider**: AWS with Node.js 22.x runtime
- **Region**: us-east-1 (configurable)
- **HTTP API**: With CORS enabled
- **IAM Roles**: DynamoDB and S3 permissions
- **Resources**: DynamoDB table and S3 bucket

### Environment Variables

Create a `.env` file:

```env
# JWT Configuration
JWT_SECRET=your_secure_jwt_secret_key

# AWS Configuration (optional, uses AWS CLI credentials by default)
AWS_REGION=us-east-1
```

## 🔌 API Endpoints

### Authentication

#### **Sign Up** - `POST /signup`
Register a new user.

```bash
curl -X POST http://localhost:3000/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }'
```

**Response:**
```json
{
  "id": "user-uuid",
  "email": "user@example.com",
  "name": "John Doe",
  "token": "jwt-token"
}
```

#### **Login** - `POST /login.`
Authenticate the user and obtain a JWT.

```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "id": "user-uuid",
  "email": "user@example.com",
  "token": "jwt-token"
}
```

### Users

#### **Get User** - `GET /users/{id}`
Fetch a specific user by ID.

```bash
curl -X GET http://localhost:3000/users/user-uuid \
  -H "Authorization: Bearer jwt-token."
```

#### **Get All Users** - `GET /users`
Fetch all users.

```bash
curl -X GET http://localhost:3000/users \
  -H "Authorization: Bearer jwt-token."
```

#### **Delete User** - `DELETE /users/{id}`
Delete a user account.

```bash
curl -X DELETE http://localhost:3000/users/user-uuid \
  -H "Authorization: Bearer jwt-token."
```

### Gallery

#### **Upload Image** - `POST /gallery/upload.`
Upload an image to the user's gallery.

```bash
curl -X POST http://localhost:3000/gallery/upload \
  -H "Authorization: Bearer jwt-token" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "imageBase64": "base64-encoded-image",
    "filename": "photo.jpg"
  }'
```

#### **Get Gallery** - `GET /gallery/{email}`
Retrieve all images for a specific email.

```bash
curl -X GET http://localhost:3000/gallery/user@example.com \
  -H "Authorization: Bearer jwt-token."
```

## 💾 Database Schema

### DynamoDB Table: `users.`

**Primary Key:** `id` (String)

**Global Secondary Index (GSI):** `EmailIndex` on `email` attribute

**Attributes:**
```typescript
{
  id: string;                // Unique user ID
  email: string;             // User email address
  name: string;              // User display name
  password: string;          // Hashed password (bcryptjs)
  createdAt: number;         // Timestamp
  updatedAt: number;         // Timestamp
}
```

## ☁️ AWS Resources

### DynamoDB Table
- **Name:** `users`
- **Billing Mode:** PAY_PER_REQUEST (on-demand)
- **Partition Key:** `id`
- **Sort Key:** None
- **GSI:** `EmailIndex` (for email-based queries)

### S3 Bucket
- **Name:** `my-user-uploads-unique-gallaries-2025`
- **Public Access:** Allowed (configurable for security)
- **CORS:** Enabled for cross-origin requests
- **Ownership:** Bucket owner preferred

### Lambda Functions
- `signup` - Handles user registration
- `login` - Handles user authentication
- `getOne` - Retrieves a single user
- `getAll` - Retrieves all users
- `deleteUser` - Deletes a user
- `uploadImage` - Handles image uploads to S3
- `getGallery` - Retrieves the user's gallery

## 🚢 Deployment

### Deploy to AWS

```bash
# Deploy to development stage
serverless deploy --stage dev

# Deploy to production stage
serverless deploy --stage prod
```

### View Logs

```bash
# View logs for a specific function
serverless logs -f <function-name> --stage dev
```

### Remove Stack

```bash
# Remove all AWS resources
serverless remove --stage dev
```

## 🔐 Security Considerations

- **Password Security**: Passwords are hashed using bcryptjs before storage
- **JWT Authentication**: All protected endpoints require valid JWT tokens
- **CORS**: Configure allowed origins in production
- **IAM Roles**: Functions have minimal required permissions
- **Environment Variables**: Sensitive data stored in environment variables, never in code

## 📝 Development Guidelines
### Adding a New Lambda Function

1. Create a new handler file in `src/handlers/{feature}/.`
2. Export a handler function: `export const handler = async (event) => {...}`
3. Add the function definition to `serverless.yml`
4. Define appropriate IAM permissions if needed
5. Test locally with `serverless offline.`

### Error Handling

Standard error response format:
```json
{
  "statusCode": 400,
  "body": {
    "message": "Error description"
  }
}
```

### Response Format

Standard success response format:
```json
{
  "statusCode": 200,
  "body": {
    "data": {}
  }
}
```

## 📦 Dependencies

### Production
- `@aws-sdk/client-dynamodb` - AWS DynamoDB client
- `@aws-sdk/lib-dynamodb` - DynamoDB document client
- `jsonwebtoken` - JWT token handling
- `bcryptjs` - Password hashing

### Development
- `serverless-dotenv-plugin` - Environment variable management

## 🤝 Contributing

1. Create a feature branch from `main.`
2. Make your changes following the project structure
3. Test with `serverless offline.`
4. Submit a pull request with a description

## 📄 License
This project is part of a full-stack serverless web application.

**API Deployment Ready! 🚀**
