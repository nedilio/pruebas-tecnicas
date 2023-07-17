import { create } from "zustand";
import { Book, Library } from "../lib/types";

interface BooksState {
  library: Book[];
  readingList: Book[];
  fetchBooks: (books: Book[]) => void;
  removeBookFromLibrary: (id: string) => void;
  addBookToLibrary: (book: Book) => void;
  addBookToReadingList: (book: Book) => void;
  removeBookFromReadingList: (id: string) => void;
}

export const useBooksStore = create<BooksState>()((set) => ({
  library: [],
  readingList: [],
  fetchBooks: async (books) => set({ library: books }),
  removeBookFromLibrary: (id: string) =>
    set((state) => ({
      library: state.library.filter((book) => book.ISBN !== id),
    })),
  addBookToLibrary: (book: Book) =>
    set((state) => ({ library: [...state.library, book] })),
  addBookToReadingList: (book: Book) =>
    set((state) => ({ readingList: [...state.readingList, book] })),
  removeBookFromReadingList: (id: string) =>
    set((state) => ({
      readingList: state.readingList.filter((book) => book.ISBN !== id),
    })),
}));
