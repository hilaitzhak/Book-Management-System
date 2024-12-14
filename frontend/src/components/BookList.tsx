import { FC } from "react";
import { Book, BookListProps } from "../interfaces/interface";

const BookList: FC<BookListProps> = ({ books, onEdit, onDelete, onView }) => (
  <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
    {books.map((book: Book) => (
      <div key={book.id} className="p-4 border rounded-lg shadow hover:shadow-md">
        <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
        <p className="text-gray-600">By {book.author}</p>
        <p className="text-gray-500 text-sm mb-4">Copies: {book.availableCopies}</p>
        <div className="flex gap-2">
          <button
            onClick={() => onView(book)}
            className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded"
          >
            View
          </button>
          <button
            onClick={() => onEdit(book)}
            className="px-3 py-1 text-gray-600 hover:bg-gray-50 rounded"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(book.id)}
            className="px-3 py-1 text-red-600 hover:bg-red-50 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
);

export default BookList;