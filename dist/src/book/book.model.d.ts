import { Model } from 'mongoose';
import { IBook } from './book.interface';
interface BookModel extends Model<IBook> {
    updateAvailability(bookId: string, quantity: number): Promise<IBook>;
}
declare const Book: BookModel;
export default Book;
//# sourceMappingURL=book.model.d.ts.map