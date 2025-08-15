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

### Create Book (`POST /api/books`)

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
