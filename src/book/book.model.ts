import mongoose, { Document, Schema, Model } from 'mongoose';
import { IBook } from './book.interface';

// Add static method typing
interface BookModel extends Model<IBook> {
  updateAvailability(bookId: string, quantity: number): Promise<IBook>;
}

const bookSchema = new Schema<IBook & Document>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: {
    type: String,
    required: true,
    enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
  },
  isbn: { type: String, required: true, unique: true },
  description: { type: String, default: '' },
  copies: { type: Number, required: true, min: 0 },
  available: { type: Boolean, default: true },
}, {
  timestamps: true,
});

// Static method to handle book availability after borrowing
bookSchema.statics.updateAvailability = async function(bookId: string, quantity: number) {
  const book = await this.findById(bookId);
  if (!book) throw new Error('Book not found');
  
  book.copies -= quantity;
  if (book.copies <= 0) {
    book.available = false;
  }
  return await book.save();
};

// Exporting the model with the proper type for static methods
const Book = mongoose.model<IBook & Document, BookModel>('Book', bookSchema);

export default Book;
