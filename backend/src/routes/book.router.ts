import { Router } from "express";
import { BookController } from "../controllers/book.controller";

export class BookRouter {
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
        this.router.post('/', this.bookController.addNewBook.bind(this.bookController));
        this.router.get('/', this.bookController.getAllBooks.bind(this.bookController));
        this.router.get('/:id', this.bookController.getBookDetailsById.bind(this.bookController));
        this.router.put('/:id', this.bookController.updateBookDetails.bind(this.bookController));
        this.router.delete('/:id', this.bookController.deleteBook.bind(this.bookController));
    }
    
    public getRouter(): Router {
        return this.router;
    }
}