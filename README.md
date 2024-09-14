# Phonebook API

## Description

This is a simple Express-based REST API for managing a phonebook. It allows you to view all contacts, get information about the phonebook, retrieve individual contacts by ID, and delete contacts.

## Features

- **View all contacts**: Retrieve a list of all contacts in the phonebook.
- **Get phonebook info**: Get the number of contacts and the current date.
- **Retrieve contact by ID**: Get details of a specific contact by their ID.
- **Delete contact**: Remove a contact from the phonebook by ID.

## Installation

To run this project locally, you'll need to have [Node.js](https://nodejs.org/) installed. Follow these steps:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/raohasham/backend_phonebook
    cd backend_phonebook
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Run the application:**

    ```bash
    npm start
    ```

    The application will start and listen on port `3001`.

## Usage

- **Get all contacts:**

    ```http
    GET /api/persons
    ```

    This endpoint returns a JSON array of all contacts.

- **Get phonebook info:**

    ```http
    GET /api/info
    ```

    This endpoint returns a message with the number of contacts and the current date.

- **Get a contact by ID:**

    ```http
    GET /api/persons/:id
    ```

    Replace `:id` with the contact ID you want to retrieve. This endpoint returns the contact details in JSON format.

- **Delete a contact by ID:**

    ```http
    DELETE /api/persons/:id
    ```

    Replace `:id` with the contact ID you want to delete. This endpoint removes the contact and returns a 204 No Content status.
