import { Request, Response } from "express";
import { UtilBook } from "../utils/book.utils";
import { BookError } from "../models/error";
import { BookService } from "../services/book.service";

export class BookController {
    private bookService: BookService;
    constructor() {
        this.bookService = new BookService();
    }

    public async getAllBooks(req: Request, res: Response): Promise<void> {
        try {
            const books = await this.bookService.getAllBooks();
            res.json(books);
        } catch (error) {
            console.error('Controller error in getAllBooks:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async addNewBook(req: Request, res: Response): Promise<void> {
        try {
            const bookData = req.body;
            const { author, title, availableCopies } = bookData;
            UtilBook.validateBookDetails(author, title, availableCopies);
    
            const newBook = await this.bookService.addNewBook(bookData);
            res.status(201).json(newBook);
        } catch (error) {
            if(error instanceof BookError) {
                res.status(error.statusCode).json({error: error.message});
            }
            console.error('Controller error in addBook:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async getBookDetailsById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const book = await this.bookService.getBookDetailsById(id);
            res.json(book);
        } catch (error) {
            console.error('Controller error in getBookDetailsById:', error);
            if(error !instanceof BookError) {
                error = new BookError();
            }
            res.status(error.statusCode).json({error: error.message});
        }
    }

    public async updateBookDetails(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const bookData = req.body;
            const { author, title, availableCopies } = bookData;
            UtilBook.validateBookDetails(author, title, availableCopies);
     
            const updatedBook = await this.bookService.updateBookDetails(id, bookData);
            res.json(updatedBook);
     
        } catch (error) {
            console.error('Controller error in updateBookDetails:', error);
            if(error !instanceof BookError) {
                error = new BookError();
            }
            res.status(error.statusCode).json({error: error.message});
        }
    }

    public async deleteBook(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await this.bookService.deleteBook(id);
            res.status(204).send();
        } catch (error) {
            console.error('Controller error in deleteBook:', error);
            if(error !instanceof BookError) {
                error = new BookError();
            }
            res.status(error.statusCode).json({error: error.message});
        }
    }
}