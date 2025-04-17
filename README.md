# URL Shortener

A modern URL shortener application built with **NestJS**, **GraphQL**, **Apollo Server**, and **MongoDB** (via Mongoose). This application allows users to create, retrieve, and redirect short URLs, with automatic short code generation when no custom code is provided. The project uses a **code-first approach** for defining the GraphQL schema, leveraging TypeScript decorators to generate the schema automatically.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Code-First Approach](#code-first-approach)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [GraphQL API](#graphql-api)
- [Testing with Apollo Sandbox](#testing-with-apollo-sandbox)
- [Project Structure](#project-structure)
- [Future Enhancements](#future-enhancements)
- [License](#license)

## Features
- **Create Short URLs**: Generate short URLs from long URLs using a custom short code or an auto-generated 6-character code if none is provided.
- **Retrieve URLs**: Fetch a single URL by its short code or list all URLs stored in the database.
- **Redirect URLs**: Increment a click counter and retrieve URL details when accessing a short code.
- **Validation**: Ensure valid URLs and short codes (3–10 characters) using `class-validator`.
- **Apollo Sandbox UI**: Explore and test all GraphQL queries and mutations interactively without manually writing queries.
- **MongoDB Storage**: Persist URLs with fields for `originalUrl`, `shortCode`, `clicks`, `createdAt`, and `updatedAt`.
- **Type-Safe**: Built with TypeScript for robust type checking and schema generation.

## Tech Stack
- **NestJS**: A progressive Node.js framework for building server-side applications.
- **GraphQL**: A query language for the API, using `@nestjs/graphql` with Apollo Server.
- **MongoDB**: A NoSQL database for storing URL data, accessed via Mongoose.
- **TypeScript**: For type safety and code-first schema definition.
- **Apollo Server**: Provides the GraphQL server and Apollo Sandbox UI.
- **Mongoose**: An ODM for MongoDB to manage database operations.

## Code-First Approach
This project uses a **code-first approach** to define the GraphQL schema:
- The schema is defined using TypeScript classes and decorators (e.g., `@ObjectType`, `@Field`, `@Query`, `@Mutation`) in files like `url.model.ts`, `create-url.input.ts`, and `urls.resolver.ts`.
- The `@nestjs/graphql` module automatically generates the GraphQL schema (`schema.gql`) from the TypeScript code, eliminating the need for manual Schema Definition Language (SDL) files.
- Benefits include:
  - Type safety with TypeScript, ensuring consistency between resolvers and schema.
  - Simplified maintenance, as schema changes are made in code.
  - Seamless integration with Apollo Sandbox, which displays all queries and mutations via schema introspection.

The generated `schema.gql` includes types for `Url`, `CreateUrlInput`, and operations like `getUrl`, `getAllUrls`, `createUrl`, and `redirectUrl`.

## Prerequisites
- **Node.js**: Version 18.x or later.
- **MongoDB**: A running MongoDB instance (local or cloud, e.g., MongoDB Atlas).
- **npm**: For installing dependencies.

## Installation
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd url-shortener
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment**:
   - Ensure MongoDB is running locally (`mongod`) or update the connection string in `app.module.ts` for a cloud instance (e.g., `mongodb://<user>:<password>@<host>/url-shortener`).
   - Set `NODE_ENV` to `development` for Apollo Sandbox:
     ```bash
     export NODE_ENV=development
     ```

## Running the Application
1. **Start the Server**:
   ```bash
   npm run start:dev
   ```
   - The server runs at `http://localhost:3000`.
   - The GraphQL endpoint is available at `http://localhost:3000/graphql`.

2. **Access Apollo Sandbox**:
   - Open `http://localhost:3000/graphql` in your browser to use the Apollo Sandbox UI.
   - Explore queries (`getUrl`, `getAllUrls`) and mutations (`createUrl`, `redirectUrl`) interactively.

## GraphQL API
The application exposes a GraphQL API with the following operations:

### Queries
- **`getUrl(shortCode: String!): Url`**: Retrieve a URL by its short code.
  ```graphql
  query {
    getUrl(shortCode: "exmpl") {
      id
      originalUrl
      shortCode
      clicks
      createdAt
    }
  }
  ```

- **`getAllUrls: [Url!]!`**: List all URLs in the database.
  ```graphql
  query {
    getAllUrls {
      id
      originalUrl
      shortCode
      clicks
      createdAt
    }
  }
  ```

### Mutations
- **`createUrl(input: CreateUrlInput!): Url`**: Create a short URL with an optional custom short code. If no `customShortCode` is provided, a random 6-character code is generated.
  ```graphql
  mutation {
    createUrl(input: { originalUrl: "https://example.com", customShortCode: "exmpl" }) {
      id
      originalUrl
      shortCode
      clicks
      createdAt
    }
  }
  ```

- **`redirectUrl(shortCode: String!): Url`**: Increment the click counter for a short code and return the URL details.
  ```graphql
  mutation {
    redirectUrl(shortCode: "exmpl") {
      id
      originalUrl
      shortCode
      clicks
      createdAt
    }
  }
  ```

### Types
- **`Url`**:
  - `id: String!`
  - `originalUrl: String!`
  - `shortCode: String!`
  - `clicks: Int!`
  - `createdAt: DateTime!`
- **`CreateUrlInput`**:
  - `originalUrl: String!`
  - `customShortCode: String`

## Testing with Apollo Sandbox
Apollo Sandbox is enabled via the `ApolloServerPluginLandingPageLocalDefault` plugin, providing an interactive UI to explore and test the GraphQL API.

1. **Access Sandbox**:
   - Navigate to `http://localhost:3000/graphql`.
   - The Schema Explorer lists all queries (`getUrl`, `getAllUrls`) and mutations (`createUrl`, `redirectUrl`).

2. **Test Queries/Mutations**:
   - Click a query (e.g., `getAllUrls`) in the Schema Explorer to generate:
     ```graphql
     query GetAllUrls {
       getAllUrls {
         id
         originalUrl
         shortCode
         clicks
         createdAt
       }
     }
     ```
   - Click a mutation (e.g., `createUrl`) to generate:
     ```graphql
     mutation CreateUrl {
       createUrl(input: { originalUrl: "https://example.com" }) {
         id
         originalUrl
         shortCode
         clicks
         createdAt
       }
     }
     ```
   - Click the **Play** button to execute and view results.

3. **Verify Auto-Generated Short Codes**:
   - Run the `createUrl` mutation without `customShortCode` to confirm a random 6-character code is generated.

## Project Structure
```
url-shortener/
├── src/
│   ├── urls/
│   │   ├── dto/
│   │   │   └── create-url.input.ts    # GraphQL input type for creating URLs
│   │   ├── models/
│   │   │   └── url.model.ts          # GraphQL type definition for Url
│   │   ├── schemas/
│   │   │   └── url.schema.ts         # Mongoose schema for MongoDB
│   │   ├── urls.module.ts            # Feature module for URLs
│   │   ├── urls.resolver.ts          # GraphQL queries and mutations
│   │   └── urls.service.ts           # Business logic for URL operations
│   ├── app.module.ts                 # Root module
│   ├── main.ts                      # Application entry point
├── schema.gql                       # Generated GraphQL schema
├── package.json
└── README.md
```

## Future Enhancements
- **REST Endpoint**: Add a `GET /:shortCode` endpoint for browser-based redirection.
- **Pagination**: Support `limit` and `offset` for `getAllUrls` to handle large datasets.
- **Authentication**: Restrict `getAllUrls` and `createUrl` to authenticated users using JWT.
- **Rate Limiting**: Prevent abuse of the API.
- **Deployment**: Deploy to Heroku or Vercel with MongoDB Atlas.

## License
This project is licensed under the MIT License.