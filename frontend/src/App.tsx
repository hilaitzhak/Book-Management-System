import { useEffect, useState } from 'react'
import { Book, BookFormData } from './interfaces/interface';
import BookList from './components/BookList';
import SearchBar from './components/SearchBar';
import BookModal from './components/BookModal';

const App = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [modalContent, setModalContent] = useState<'add' | 'edit' | 'view' | null>(null); // Determines which modal is open

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await fetch('http://localhost:3000/books');
      const data = await res.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleAddBook = async (bookData: BookFormData) => {
    try {
      await fetch('http://localhost:3000/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...bookData,
          id: `978-0-${Math.random().toString().slice(2, 5)}`,
        }),
      });

      await fetchBooks();
      setModalContent(null);
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const handleUpdateBook = async (bookData: BookFormData) => {
    if (!selectedBook) return;
    try {
      await fetch(`http://localhost:3000/books/${selectedBook.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...bookData, id: selectedBook.id }),
      });
      fetchBooks();
      setModalContent(null);
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const handleDeleteBook = async (id: string) => {
    if (!confirm('Are you sure you want to delete this book?')) return;
    try {
      await fetch(`http://localhost:3000/books/${id}`, { method: 'DELETE' });
      await fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Book Management System</h1>
        <button
          onClick={() => {
            setSelectedBook(null);
            setModalContent('add');
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Book
        </button>
      </div>

      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <div className='w-full'>
        <BookList
          books={filteredBooks}
          onEdit={(book: Book) => {
            setSelectedBook(book);
            setModalContent('edit');
          }}
          onDelete={handleDeleteBook}
          onView={(book: Book) => {
            setSelectedBook(book);
            setModalContent('view');
          }}
        />
      </div>

      <BookModal
        modalContent={modalContent}
        selectedBook={selectedBook}
        onClose={() => setModalContent(null)}
        onUpdate={handleUpdateBook}
        onAdd={handleAddBook}
      />
    </div>
  );
};

export default App;