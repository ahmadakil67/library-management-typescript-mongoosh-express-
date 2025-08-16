"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.getBookById = exports.getAllBooks = exports.createBook = void 0;
const book_model_1 = __importDefault(require("./book.model"));
// Create a new book
const createBook = async (req, res) => {
    try {
        const { title, author, genre, isbn, description, copies, available } = req.body;
        // Create a new book document
        const book = new book_model_1.default({
            title,
            author,
            genre,
            isbn,
            description,
            copies,
            available,
        });
        // Save the book to the database
        await book.save();
        return res.status(201).json({
            success: true,
            message: 'Book created successfully',
            data: book,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Error creating book',
            error: error,
        });
    }
};
exports.createBook = createBook;
// Get all books with optional filtering and sorting
const getAllBooks = async (req, res) => {
    try {
        const { filter, sortBy, sort = 'asc', limit = 10 } = req.query;
        // Build the query for filtering
        const filterQuery = filter ? { genre: filter } : {};
        // Build the query for sorting
        const sortQuery = sortBy ? { [sortBy]: sort === 'desc' ? -1 : 1 } : {};
        // Get the books from the database
        const books = await book_model_1.default.find(filterQuery).sort(sortQuery).limit(Number(limit));
        return res.status(200).json({
            success: true,
            message: 'Books retrieved successfully',
            data: books,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Error fetching books',
            error: error,
        });
    }
};
exports.getAllBooks = getAllBooks;
// Get a single book by ID
const getBookById = async (req, res) => {
    try {
        const { bookId } = req.params;
        const book = await book_model_1.default.findById(bookId);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found',
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Book retrieved successfully',
            data: book,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Error fetching book',
            error: error,
        });
    }
};
exports.getBookById = getBookById;
// Update a book's details
const updateBook = async (req, res) => {
    try {
        const { bookId } = req.params;
        const { copies } = req.body;
        const updatedBook = await book_model_1.default.findByIdAndUpdate(bookId, { $set: { copies } }, { new: true });
        if (!updatedBook) {
            return res.status(404).json({
                success: false,
                message: 'Book not found',
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Book updated successfully',
            data: updatedBook,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Error updating book',
            error: error,
        });
    }
};
exports.updateBook = updateBook;
// Delete a book
const deleteBook = async (req, res) => {
    try {
        const { bookId } = req.params;
        const deletedBook = await book_model_1.default.findByIdAndDelete(bookId);
        if (!deletedBook) {
            return res.status(404).json({
                success: false,
                message: 'Book not found',
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Book deleted successfully',
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Error deleting book',
            error: error,
        });
    }
};
exports.deleteBook = deleteBook;
//# sourceMappingURL=book.controller.js.map