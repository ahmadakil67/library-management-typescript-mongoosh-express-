import mongoose, { Schema, Document } from 'mongoose';
import { IBorrow } from './borrow.interface';

const borrowSchema = new Schema<IBorrow & Document>({
  book: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Book',  // Reference to the Book model
    required: true
  },
  quantity: { type: Number, required: true, min: 1 },
  dueDate: { type: Date, required: true },
}, {
  timestamps: true,
});

const Borrow = mongoose.model<IBorrow & Document>('Borrow', borrowSchema);

export default Borrow;
