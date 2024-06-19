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
3. **Environment Variables**

   ## IMPORTANT: Before running the application, ensure you have set up your API keys and configuration values.
   Or you can contact @plasticcalves on discord to provide with API keys.

   - Rename the `.env.example` file to `.env`.
   - Fill in your own API keys and configuration details in the `.env` file.

5. **Run Database Migrations**
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

### Messages  Endpoints
#### GET /messages

Retrieve information about the messages.
- **Retrieve ALL messages:**

  ```http
  GET http://localhost:3000/messages
- **Retrieve messages by sprintCode:**

  ```http
  GET http://localhost:3000/messages?sprintCode=WD-3.4
- **Retrieve messages by username:**

  ```http
  GET http://localhost:3000/messages?username=charlie

#### POST /messages (send message via discord bot). In order to send message using discord bot, be sure to start the server (_npm run dev_)
- **Endpoint URL:**

  ```http
  POST http://localhost:3000/messages
- **Provide the following JSON payload in the request body** Adjust the text value accordingly.

  ```sh
  {
  "username": "foo",
  "sprintCode": "bar"
  }

### Sprints Endpoints
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

#### POST /sprints
- **Endpoint URL:**

  ```http
  POST http://localhost:3000/sprints
- **Provide the following JSON payload in the request body** Adjust the code and title values according to the sprint you want to create.

  ```sh
  {
  "code": "foo",
  "title": "Bar"
  }

#### PATCH /sprints
- **Endpoint URL:**

  ```http
  PATCH http://localhost:3000/sprints

- **Provide the following JSON payload in the request body** Adjust the code or title value accordingly.

  ```sh
  {
    "title": "Updated sprint text"
  }

#### DELETE /sprints
To delete a sprint using the `/sprints/:sprintId` endpoint, follow these steps:
- **Endpoint URL:**

   Replace `:sprintId` with the actual ID of the sprint you want to delete.
   
  ```http
  DELETE http://localhost:3000/sprints/20


### Message Templates Endpoints
#### GET /templates

Retrieve information about message templates.
- **Retrieve template by id:**

  ```http
  GET http://localhost:3000/templates?id=1
- **Retrieve template by text:**

  ```http
  GET http://localhost:3000/templates?text=You nailed it!

#### POST /templates
- **Endpoint URL:**

  ```http
  POST http://localhost:3000/templates
- **Provide the following JSON payload in the request body** Adjust the text value accordingly.

  ```sh
  {
  "text": "foo"
  }

#### PATCH /templates
- **Endpoint URL:**

  ```http
  PATCH http://localhost:3000/templates/:templateId

  Replace `:templateId` with the actual ID of the message template you want to update.

- **Provide the following JSON payload in the request body** Adjust the text value accordingly.

  ```sh
  {
    "text": "Updated template text"
  }

#### DELETE /templates
To delete a message template using the `/templates/:templateId` endpoint, follow these steps:
- **Endpoint URL:**

   Replace `:templateId` with the actual ID of the message template you want to delete.
   
  ```http
  DELETE http://localhost:3000/templates/20
