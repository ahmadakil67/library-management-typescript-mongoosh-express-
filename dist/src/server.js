"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config"));
const book_route_1 = __importDefault(require("./book/book.route"));
const borrow_route_1 = __importDefault(require("./borrow/borrow.route"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(book_route_1.default);
app.use(borrow_route_1.default);
app.get('/', (req, res) => {
    res.json({ success: true, message: "Library Management" });
});
app.listen(config_1.default.port, () => {
    console.log("Server Running !!!!!! ");
});
async function server() {
    try {
        // console.log(config)
        await mongoose_1.default.connect(config_1.default.database_url);
        console.log(`Connected to database`);
    }
    catch (err) {
        console.log("Server Error ", err);
    }
}
server();
//# sourceMappingURL=server.js.map