import { IBook } from "../book/book.interface";

export interface IBorrow {
  book: IBook;   // Book's ObjectId
  quantity: number;
  dueDate: Date;
}