# Discord Sprint Celebrator

## Project Description

This project implements a REST API and a Discord bot that sends a celebratory message whenever a user completes a sprint. The Node.js server receives a request from another server when a user completes a sprint, fetches a random celebratory GIF and message, and posts them to a specified Discord server and channel. It also stores the congratulatory message and metadata in the database for later retrieval.

## Project Requirements

The bot is capable of:
- Being triggered by a request.
- Fetching a random GIF related to a celebration or success from an external GIF service (Giphy).
- Retrieving a random congratulatory message template from the database.
- Retrieving a sprint title from the database.
- Congratulating a user on a configured Discord server with the GIF and a message.
- Storing the congratulatory message and metadata in the database for future retrieval.

The REST API supports the following endpoints:
- **POST /messages**: Send a congratulatory message to a user on Discord.
- **GET /messages**: Get a list of all congratulatory messages.
- **GET /messages?username=johdoe**: Get a list of all congratulatory messages for a specific user.
- **GET /messages?sprint=WD-1.1**: Get a list of all congratulatory messages for a specific sprint.
- **CRUD /templates**: POST/GET/PATCH/DELETE endpoints for managing congratulatory message templates.
- **CRUD /sprints**: POST/GET/PATCH/DELETE endpoints for managing sprints.

## Setup Instructions

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. **Clone the repository:**
   ```sh
   git clone 
2. **Install dependencies:**
   ```sh
   npm install
3.  **Environment Variables**
   _Fill in your own API keys and configuration values in the .env.example file._ After doing that **rename file to .env**
4. **Run Database Migrations**
   ```sh
   npm run migrate:latest
   npm run gen:types

## Running the Application
5. **Start The Server**
   ```sh
   npm run dev
6. **Run tests**
   ```sh
   npm run test  

## Using Endpoints
To interact with the API endpoints, you can use tools like Postman or any similar API testing tool. Below are examples of how to use the endpoints.

**Sprints Endpoints**
#### GET /sprints

Retrieve information about sprints.
- **Retrieve all sprints:**

  ```http
  GET http://localhost:3000/sprints
- **Retrieve sprint by code:**

  ```http
  GET http://localhost:3000/sprints?code=WD-1.1
- **Retrieve sprint by title:**

  ```http
  GET http://localhost:3000/sprints?title=Web Development Sprint 1.2
