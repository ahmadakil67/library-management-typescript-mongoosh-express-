"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const borrow_controller_1 = require("./borrow.controller");
const borrowRouter = express_1.default.Router();
// Route for borrowing a book
borrowRouter.post('/api/borrow', borrow_controller_1.borrowBook);
// Route for retrieving the borrowed books summary
borrowRouter.get('/api/borrow', borrow_controller_1.getBorrowedBooksSummary);
exports.default = borrowRouter;
//# sourceMappingURL=borrow.route.js.map