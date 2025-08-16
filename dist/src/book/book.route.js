"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./book.controller");
const router = express_1.default.Router();
// Route to create a new book
router.post('/api/books', book_controller_1.createBook);
// Route to get all books with optional filters and sorting
router.get('/api/books', book_controller_1.getAllBooks);
// Route to get a book by its ID
router.get('/api/books/:bookId', book_controller_1.getBookById);
// Route to update a book by its ID
router.put('/api/books/:bookId', book_controller_1.updateBook);
// Route to delete a book by its ID
router.delete('/api/books/:bookId', book_controller_1.deleteBook);
exports.default = router;
//# sourceMappingURL=book.route.js.map