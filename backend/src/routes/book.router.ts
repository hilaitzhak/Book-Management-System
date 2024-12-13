import { Router } from "express";
import { BookController } from "../controllers/book.controller";

export class AppRouter {
    private router: Router;
    private bookController: BookController;
    
    constructor () {
        this.init();
    }
 
    private init() {
        this.setRouter();
        this.setBookController();
        this.setRoutes();
    }

    private setRouter() {
        this.router = Router();
    }

    private setBookController() {
        this.bookController = new BookController();
    }

    private setRoutes() {
        this.router.get('/books', this.bookController.getAllBooks.bind(this.bookController));
        this.router.get('/books/:id', this.bookController.getBookDetailsById.bind(this.bookController));
        this.router.put('/books/:id', this.bookController.updateBookDetails.bind(this.bookController));
        this.router.delete('/books/:id', this.bookController.deleteBook.bind(this.bookController));
    }
    
    public getRouter(): Router {
        return this.router;
    }
}