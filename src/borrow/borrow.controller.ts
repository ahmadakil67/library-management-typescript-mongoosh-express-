import { Request, Response } from 'express';
import Book from '../book/book.model'; // Make sure the path is correct
import Borrow from './borrow.model';

export const borrowBook = async (req: Request, res: Response) => {
  const { book, quantity, dueDate } = req.body;

  try {
    // Check if the book exists
    const bookDoc = await Book.findById(book);
    if (!bookDoc) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    // Check if enough copies are available
    if (bookDoc.copies < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Not enough copies available',
      });
    }

    // Update the book availability
    await Book.updateAvailability(book, quantity); // This should work now

    // Create a new borrow record
    const borrowRecord = new Borrow({
      book,
      quantity,
      dueDate,
    });

    // Save the borrow record
    await borrowRecord.save();

    return res.status(201).json({
      success: true,
      message: 'Book borrowed successfully',
      data: borrowRecord,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error borrowing book',
      error: error, // Only send error message to avoid sending the entire error object
    });
  }
};

// Get the borrowed books summary (total quantity borrowed per book)
export const getBorrowedBooksSummary = async (req: Request, res: Response) => {
  try {
    // MongoDB Aggregation pipeline to get the total quantity borrowed per book
    const borrowedBooksSummary = await Borrow.aggregate([
      {
        $group: {
          _id: '$book',  // Group by the book (bookId)
          totalQuantity: { $sum: '$quantity' },  // Sum the quantity borrowed for each book
        },
      },
      {
        $lookup: {
          from: 'books',  // Join the books collection
          localField: '_id',  // The bookId in the Borrow collection
          foreignField: '_id',  // The _id field in the Book collection
          as: 'bookDetails',  // Alias for the book details in the result
        },
      },
      {
        $unwind: '$bookDetails',  // Unwind the array to merge book details into the result
      },
      {
        $project: {
          _id: 0,  // Exclude the _id field
          book: {
            title: '$bookDetails.title',  // Return the book's title
            isbn: '$bookDetails.isbn',  // Return the book's ISBN
          },
          totalQuantity: 1,  // Return the total borrowed quantity
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      message: 'Borrowed books summary retrieved successfully',
      data: borrowedBooksSummary,  // Return the aggregated data
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error retrieving borrowed books summary',
      error: error,
    });
  }
};
