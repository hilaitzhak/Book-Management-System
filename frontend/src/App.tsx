import { useEffect, useState } from 'react'
import { Book, BookFormData } from './interfaces/interface';
import BookList from './components/BookList';
import Modal from './components/Modal';
import BookDetails from './components/BookDetails';
import BookForm from './components/BookForm';
import SearchBar from './components/SearchBar';

const App = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [modalContent, setModalContent] = useState<'add' | 'edit' | 'view' | null>(null);

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
      fetchBooks();
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
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Book Management</h1>
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

      {modalContent && (
        <Modal
          title={
            modalContent === 'add' ? 'Add New Book' :
            modalContent === 'edit' ? 'Edit Book' :
            'Book Details'
          }
          onClose={() => setModalContent(null)}
        >
          {modalContent === 'view' ? (
            <BookDetails
              book={selectedBook!}
              onClose={() => setModalContent(null)}
            />
          ) : (
            <BookForm
              book={modalContent === 'edit' ? selectedBook : undefined}
              onSubmit={modalContent === 'edit' ? handleUpdateBook : handleAddBook}
              onCancel={() => setModalContent(null)}
            />
          )}
        </Modal>
      )}
    </div>
  );
};

export default App;
