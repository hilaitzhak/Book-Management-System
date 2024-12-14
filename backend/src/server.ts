import express, { Express } from "express";
import cors from "cors";
import { BookRouter } from "./routes/book.router";

export class AppServer {
    public app: Express;
    constructor () {}

    public async init() {
        this.setApp();
        this.setMiddlewares();
        this.setRouter();
    }

    private setApp() {
        this.app = express();
    }

    private setMiddlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }
    
    private setRouter() {
        const app_router = new BookRouter();
        this.app.use('/books', app_router.getRouter());
    }
    
    public listen() {
        this.app.listen(3000, () => {
            console.log('Server is running on port 3000');
        })
    }
}