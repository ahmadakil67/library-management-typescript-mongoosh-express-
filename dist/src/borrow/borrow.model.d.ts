import mongoose from 'mongoose';
import { IBorrow } from './borrow.interface';
declare const Borrow: mongoose.Model<IBorrow & mongoose.Document<unknown, any, any, Record<string, any>, {}>, {}, {}, {}, mongoose.Document<unknown, {}, IBorrow & mongoose.Document<unknown, any, any, Record<string, any>, {}>, {}, {}> & IBorrow & mongoose.Document<unknown, any, any, Record<string, any>, {}> & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Borrow;
//# sourceMappingURL=borrow.model.d.ts.map