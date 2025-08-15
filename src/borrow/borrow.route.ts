import express from 'express';
import { borrowBook, getBorrowedBooksSummary } from './borrow.controller';


const borrowRouter = express.Router();

// Route for borrowing a book
borrowRouter.post('/api/borrow', borrowBook);

// Route for retrieving the borrowed books summary
borrowRouter.get('/api/borrow', getBorrowedBooksSummary);

export default borrowRouter;
