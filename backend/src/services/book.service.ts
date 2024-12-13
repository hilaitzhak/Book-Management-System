import { Book } from "../interfaces/book";
import { UtilBook } from "../utils/UtilBook";

export class BookService {
    constructor() {

    }

    public async getAllBooks(): Promise<Book[]> {
        try {
            return UtilBook.readBooks();
          } catch (error) {
            console.error('Service error in getAllBooks:', error);
            throw new Error('Failed to fetch books');
        }
    }

    public async getBookDetailsById(id: string): Promise<Book> {
        try {
            const books = UtilBook.readBooks();
            const book = books.find((book) => book.id === id );
            if (!book) {
              throw new Error('Book not found');
            }
            return book;
        } catch (error) {
            console.error('Service error in getBookDetailsById:', error);
            throw error;
        }
    }

    public async updateBookDetails(id: string, bookData: Book): Promise<Book> {
        try {
            const books = UtilBook.readBooks();
            const bookIndex = books.findIndex(book => book.id === id);
            
            if (bookIndex === -1) {
                throw new Error('Book not found');
            }

            const updatedBook = { ...bookData, id }; // Ensure ID remains unchanged
            books[bookIndex] = updatedBook;
            
            const success = UtilBook.writeBooks(books);
            if (!success) {
                throw new Error('Failed to update book details');
            }

            return updatedBook;
        } catch (error) {
            console.error('Service error in updateBookDetails:', error);
            throw error;
        }
    }

    public async deleteBook(id: string): Promise<void> {
        try {
            const books = UtilBook.readBooks();
            const filteredBooks = books.filter(book => book.id !== id);
            
            if (filteredBooks.length === books.length) {
                throw new Error('Book not found');
            }

            const success = UtilBook.writeBooks(filteredBooks);
            if (!success) {
                throw new Error('Failed to delete book');
            }
        } catch (error) {
            console.error('Service error in deleteBook:', error);
            throw error;
        }
    }
    
}