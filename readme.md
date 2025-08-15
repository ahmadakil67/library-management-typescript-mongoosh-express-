# Library Management System API

This is a **Library Management System API** built with **Express**, **TypeScript**, and **MongoDB** using **Mongoose**. The API allows you to manage books, borrow books, and view borrowed books summaries. This project includes endpoints for creating, reading, updating, deleting books, and borrowing books.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [API Endpoints](#api-endpoints)
  - [Create Book](#create-book)
  - [Get All Books](#get-all-books)
  - [Get Book by ID](#get-book-by-id)
  - [Update Book](#update-book)
  - [Delete Book](#delete-book)
  - [Borrow a Book](#borrow-a-book)
  - [Borrowed Books Summary](#borrowed-books-summary)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Steps to Install](#steps-to-install)
- [Running the Application](#running-the-application)
- [Testing the API](#testing-the-api)
- [Deployment](#deployment)
- [License](#license)

## Project Overview

The **Library Management System API** is designed to automate the management of books and borrowing transactions in a library. The API provides basic functionality for:

- Managing books (Create, Read, Update, Delete)
- Borrowing books with checks on availability
- Viewing a summary of borrowed books, including the total quantity borrowed per book

This API follows RESTful principles, uses **Mongoose** for MongoDB interaction, and is built with **TypeScript** for type safety.

## Features

- **CRUD operations** for managing books.
- **Borrow books** functionality, with availability check.
- **Borrowed books summary** with aggregation, displaying total quantity borrowed per book.
- **Sorting**, **filtering**, and **pagination** for book queries.
- **Error handling** and **validation** to ensure data integrity.
- **Schema validation** for the book and borrow models.

## Technologies Used

- **Express**: Web framework for building the API.
- **TypeScript**: Strongly typed language to ensure better maintainability.
- **MongoDB**: NoSQL database for storing books and borrow records.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB, simplifying database interactions.
- **Node.js**: JavaScript runtime for the server-side application.
- **Postman/APIDOG**: API testing tools for verifying endpoints.

## API Endpoints

## 1. Create Book (`POST /api/books`)

Create a new book in the library.

#### Request Body:
```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
```

#### Response:
```json
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 5,
    "available": true
  }
}
```

## 2. Get All Books (GET /api/books)

Retrieve all books in the library with optional filtering, sorting, and limiting.

### Query Parameters:

- `filter`: Filter books by genre (e.g., SCIENCE).
- `sortBy`: Field to sort by (e.g., title).
- `sort`: Sorting order (`asc` or `desc`).
- `limit`: Number of results to return.

### Example Request: 
```http
GET /api/books?filter=SCIENCE&sortBy=title&sort=asc&limit=5
```
### Example Response:
```json
{
  "success": true,
  "message": "Books retrieved successfully",
  "data": [
    {
      "_id": "64f123abc4567890def12345",
      "title": "The Theory of Everything",
      "author": "Stephen Hawking",
      "genre": "SCIENCE",
      "isbn": "9780553380163",
      "description": "An overview of cosmology and black holes.",
      "copies": 5,
      "available": true
    }
  ]
}
```
## 3. Get Book by ID (GET /api/books/:bookId)

Retrieve a specific book by its ID.

### Example Request:

```http
GET /api/books/64f123abc4567890def12345
```

### Example Response:
```json
{
  "success": true,
  "message": "Book retrieved successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 5,
    "available": true
  }
}
```

### 4. Update Book (PUT /api/books/:bookId)

Update details of a specific book.

#### Request Body:
```json
{
  "copies": 10
}
```

#### Example Response:
```json
{
  "success": true,
  "message": "Book updated successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 10,
    "available": true
  }
}
```
### 5. Delete Book (DELETE /api/books/:bookId)

Delete a specific book from the library.

#### Example Response:
```json
{
  "success": true,
  "message": "Book deleted successfully"
}
```
### 6. Borrow a Book (POST /api/borrow)

Borrow a book from the library.

#### Request Body:
```json
{
  "book": "64f123abc4567890def12345",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

#### Example Response:
```json
{
  "success": true,
  "message": "Book borrowed successfully",
  "data": {
    "_id": "64bc4a0f9e1c2d3f4b5a6789",
    "book": "64f123abc4567890def12345",
    "quantity": 2,
    "dueDate": "2025-07-18T00:00:00.000Z"
  }
}
```

### 7. Borrowed Books Summary (GET /api/borrow)

Retrieve a summary of borrowed books, including the total quantity borrowed per book.

#### Example Response:
```json
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    },
    {
      "book": {
        "title": "1984",
        "isbn": "9780451524935"
      },
      "totalQuantity": 3
    }
  ]
}
```

# Installation Guide

## Prerequisites

Before you begin, ensure that you have the following installed:

- **Node.js** (v14 or higher)
- **MongoDB** (or a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account)

## Steps to Install

### 1. Clone the Repository:

```bash
git clone https://github.com/your-username/library-management-system.git
cd library-management-system
```

### 2. Install Dependencies:
```bash
npm install
```

### 3. Set Up Environment Variables

Create a .env file in the root directory of the project and set up the necessary environment variables, such as:

- **MONGODB_URI** - Your MongoDB connection URI (e.g., for MongoDB Atlas or local MongoDB)

- **JWT_SECRET** - A secret key for JWT authentication

Any other environment-specific variables you need

Example .env file:

MONGODB_URI=mongodb://localhost:27017/library
JWT_SECRET=your-secret-key

Running the Application
1. Start the Server:
```bash
npm start
```


Your API will be running on http://localhost:5000.

Testing the API

You can test the API using tools like Postman or APIDOG. Refer to the API documentation section above for endpoint details and example requests.





