import express from 'express';
import { createBook, deleteBook, getAllBooks, getBookById, updateBook } from './book.controller';


const router = express.Router();

// Route to create a new book
router.post('/api/books', createBook);

// Route to get all books with optional filters and sorting
router.get('/api/books', getAllBooks);

// Route to get a book by its ID
router.get('/api/books/:bookId', getBookById);

// Route to update a book by its ID
router.put('/api/books/:bookId', updateBook);

// Route to delete a book by its ID
router.delete('/api/books/:bookId', deleteBook);

export default router;
