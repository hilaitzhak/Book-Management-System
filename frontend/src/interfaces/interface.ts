import { ReactNode } from "react";

export interface Book {
    id: string;
    title: string;
    author: string;
    publishedDate: string;
    availableCopies: number;
}

export interface BookFormData {
    title: string;
    author: string;
    publishedDate: string;
    availableCopies: number;
}

export interface BookDetailsProps {
    book: Book;
    onClose: () => void;
}

export interface BookFormProps {
    book: Book | null | undefined;
    onSubmit: (data: BookFormData) => void;
    onCancel: () => void;
}

export interface ModalProps {
    title: string;
    children: ReactNode;
    onClose: () => void;
}

export interface BookListProps {
    books: Book[];
    onEdit: (book: Book) => void;
    onDelete: (id: string) => void;
    onView: (book: Book) => void;
}

export interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

export interface BookModalProps {
    modalContent: 'add' | 'edit' | 'view' | null;
    selectedBook: Book | null;
    onClose: () => void;
    onUpdate: (bookData: BookFormData) => Promise<void>;
    onAdd: (bookData: BookFormData) => Promise<void>;
}