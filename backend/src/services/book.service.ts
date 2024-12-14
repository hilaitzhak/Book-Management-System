import { Book } from "../interfaces/book";
import { BookError } from "../models/error";
import { UtilBook } from "../utils/book.utils";

export class BookService {
    private books = [  
        {
            "id": "978-0-002",
            "title": "Beyond the Horizon",
            "author": "Michael R. Thompson",
            "publishedDate": "2023-06-22",
            "availableCopies": 5
        },
        {
            "id": "978-0-003",
            "title": "Digital Dreams",
            "author": "Alexandra Chen",
            "publishedDate": "2023-01-10",
            "availableCopies": 3
        }
    ];

    constructor() {
    }

    public async getAllBooks(): Promise<Book[]> {
        try {
            return this.books;
          } catch (error) {
            console.error('Service error in getAllBooks:', error);
            throw new Error('Failed to fetch books');
        }
    }

    public async addNewBook(bookData: Book): Promise<Book> {
        try {
            const newBook = { ...bookData };
            this.books.push(newBook);
            return newBook;
        } catch (error) {
            console.error('Service error in addNewBook:', error);
            throw error;
        }
    }

    public async getBookDetailsById(id: string): Promise<Book> {
        try {
            const book = this.books.find((book) => book.id === id );
            if (!book) {
              throw new BookError({statusCode: 404, message: 'Book Not Found'});
            }
            return book;
        } catch (error) {
            console.error('Service error in getBookDetailsById:', error);
            throw error;
        }
    }

    public async updateBookDetails(id: string, bookData: Book): Promise<Book> {
        try {
            const bookIndex = this.books.findIndex(book => book.id === id);

            if (bookIndex === -1) {
                throw new Error('Book not found');
            }

            const updatedBook = { ...bookData, id };
            this.books[bookIndex] = updatedBook;

            return updatedBook;
        } catch (error) {
            if(error instanceof BookError) {
                throw error;            
            }
            console.error('Service error in updateBookDetails:', error);
            throw error;
        }
    }

    public async deleteBook(id: string): Promise<void> {
        try {
            const filteredBooks = this.books.filter(book => book.id !== id);
            
            if (filteredBooks.length === this.books.length) {
                throw new Error('Book not found');
            }

            this.books = filteredBooks;

        } catch (error) {
            if(error instanceof BookError) {
                throw error;            
            }
            console.error('Service error in deleteBook:', error);
            throw error;
        }
    }
}