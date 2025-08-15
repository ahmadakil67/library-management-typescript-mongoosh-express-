import { Request, Response } from 'express';
import { IBook } from './book.interface';
import Book from './book.model';


// Create a new book
export const createBook = async (req: Request, res: Response) => {
  try {
    const { title, author, genre, isbn, description, copies, available } = req.body;

    // Create a new book document
    const book = new Book({
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
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error creating book',
      error: error,
    });
  }
};

// Get all books with optional filtering and sorting
export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const { filter, sortBy, sort = 'asc', limit = 10 } = req.query;

    // Build the query for filtering
    const filterQuery: any = filter ? { genre: filter } : {};

    // Build the query for sorting
    const sortQuery: any = sortBy ? { [sortBy as string]: sort === 'desc' ? -1 : 1 } : {};

    // Get the books from the database
    const books = await Book.find(filterQuery).sort(sortQuery).limit(Number(limit));

    return res.status(200).json({
      success: true,
      message: 'Books retrieved successfully',
      data: books,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error fetching books',
      error: error,
    });
  }
};


// Get a single book by ID
export const getBookById = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;

    const book = await Book.findById(bookId);

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
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error fetching book',
      error: error,
    });
  }
};

// Update a book's details
export const updateBook = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const { copies } = req.body;

    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { $set: { copies } },
      { new: true }
    );

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
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error updating book',
      error: error,
    });
  }
};

// Delete a book
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;

    const deletedBook = await Book.findByIdAndDelete(bookId);

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
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error deleting book',
      error: error,
    });
  }
};
