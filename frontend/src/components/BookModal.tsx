import Modal from './Modal';
import BookDetails from './BookDetails';
import BookForm from './BookForm';
import { BookModalProps } from '../interfaces/interface';

const BookModal = ({ modalContent, selectedBook, onClose, onUpdate, onAdd }: BookModalProps) => {
  if (!modalContent) return null;

  return (
    <Modal
      title={
        modalContent === 'add'
          ? 'Add New Book'
          : modalContent === 'edit'
          ? 'Edit Book'
          : 'Book Details'
        }
      onClose={onClose}
    >
      {modalContent === 'view' ? (
        <BookDetails book={selectedBook!} onClose={onClose} />
      ) : (
        <BookForm
          book={modalContent === 'edit' ? selectedBook : undefined}
          onSubmit={modalContent === 'edit' ? onUpdate : onAdd}
          onCancel={onClose}
        />
      )}
    </Modal>
  );
};

export default BookModal;