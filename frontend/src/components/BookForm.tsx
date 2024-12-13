import { FC, useState } from "react";
import { BookFormData, BookFormProps } from "../interfaces/interface";

const BookForm: FC<BookFormProps> = ({ book, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState<BookFormData>({
      title: book?.title || '',
      author: book?.author || '',
      publishedDate: book?.publishedDate || '',
      availableCopies: book?.availableCopies || 0
    });
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(formData);
    };

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
      setFormData({
        ...formData,
        availableCopies: isNaN(value) ? 0 : value
      });
    };
  
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Author</label>
          <input
            type="text"
            value={formData.author}
            onChange={e => setFormData({ ...formData, author: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Published Date</label>
          <input
            type="date"
            value={formData.publishedDate}
            onChange={e => setFormData({ ...formData, publishedDate: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Available Copies</label>
          <input
            type="number"
            value={formData.availableCopies}
            onChange={handleNumberChange}
            className="w-full p-2 border rounded"
            min="0"
            required
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {book ? 'Update Book' : 'Add Book'}
          </button>
        </div>
      </form>
    );
};

export default BookForm;