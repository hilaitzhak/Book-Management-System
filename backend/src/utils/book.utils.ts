import { BookError } from "../models/error"

export class UtilBook {
  public static validateBookDetails(author, title, availableCopies) {
    if (!author) {
      throw new BookError({statusCode: 400, message: 'Author is required field'});
    }
    if (!title) {
      throw new BookError({statusCode: 400, message: 'Title is required field'});
    }
    if (typeof author !== 'string') {
      throw new BookError({statusCode: 400, message: 'Author must be string'});
    }
    if (typeof title !== 'string') {
      throw new BookError({statusCode: 400, message: 'Title must be string'});
    }
    if (typeof availableCopies !== 'number' || availableCopies <= 0 || !Number.isInteger(availableCopies)) {
      throw new BookError({statusCode: 400, message: 'Available copies must be a positive integer'});
    }
  }
}