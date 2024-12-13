import { Request, Response } from "express";
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

    public async getBookDetailsById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const book = await this.bookService.getBookDetailsById(id);
            res.json(book);
        } catch (error) {
            console.error('Controller error in getBookDetailsById:', error);
            if (error.message === 'Book not found') {
                res.status(404).json({ error: 'Book not found' });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    public async updateBookDetails(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const bookData = req.body;
            const updatedBook = await this.bookService.updateBookDetails(id, bookData);
            res.json(updatedBook);
        } catch (error) {
            console.error('Controller error in updateBookDetails:', error);
            if (error.message === 'Book not found') {
                res.status(404).json({ error: 'Book not found' });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    public async deleteBook(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await this.bookService.deleteBook(id);
            res.status(204).send();
        } catch (error) {
            console.error('Controller error in deleteBook:', error);
            if (error.message === 'Book not found') {
                res.status(404).json({ error: 'Book not found' });
            } else {
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }

    
}