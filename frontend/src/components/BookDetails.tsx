import { FC } from "react";
import { BookDetailsProps } from "../interfaces/interface";

const BookDetails: FC<BookDetailsProps> = ({ book, onClose }) => (
  <div className="space-y-4">
    <h3 className="text-2xl font-bold">{book.title}</h3>
    <div className="space-y-2">
      <p><span className="font-medium">Author:</span> {book.author}</p>
      <p><span className="font-medium">Published:</span> {book.publishedDate}</p>
      <p><span className="font-medium">Available Copies:</span> {book.availableCopies}</p>
      <p><span className="font-medium">ID:</span> {book.id}</p>
    </div>
    <button
      onClick={onClose}
      className="w-full px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
    >
      Close
    </button>
  </div>
);

export default BookDetails;