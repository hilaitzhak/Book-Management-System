import fs from 'fs';
import { Book } from '../interfaces/book';

export class UtilBook {
  private static readonly DATA_FILE = './src/data/books.json';

  // Read all books from the JSON file
  public static readBooks(): Book[] {
    try {
      const data = fs.readFileSync(this.DATA_FILE, 'utf8');
      return JSON.parse(data).books;
    } catch (error) {
      console.error('Error reading books:', error);
      return [];
    }
  }

  //  Write books to the JSON file
  public static writeBooks(books: Book[]): boolean {
    try {
      fs.writeFileSync(this.DATA_FILE, JSON.stringify({ books }, null, 2));
      return true;
    } catch (error) {
      console.error('Error writing books:', error);
      return false;
    }
  }
}