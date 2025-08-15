import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config';
import router from './book/book.route';
import borrowRouter from './borrow/borrow.route';


const app = express();


app.use(cors());
app.use(express.json());
app.use(router);
app.use(borrowRouter);

app.get('/', (req: Request, res: Response)=>{
    res.json({success:true, message: "Library Management"});
})

app.listen(config.port, ()=>{
    console.log("Server Running !!!!!! ")
})


async function server() {
    try{
        // console.log(config)
        await mongoose.connect(config.database_url!)
        console.log(`Connected to database`);
    }catch(err){
        console.log("Server Error ", err)
    }
}

server();