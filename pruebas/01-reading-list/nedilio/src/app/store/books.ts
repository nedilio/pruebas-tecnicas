import { create } from "zustand";
import { Book } from "../lib/types";

const initialLibrary = (async function () {
  // const response = await fetch("/books.json");
  // const { library } = (await response.json()) as Library;
  // return library.map(({ book }) => book as Book);
  return [];
})();

interface BooksState {
  library: Book[];
  readingList: Book[];
  fetchBooks: () => void;
  removeBookFromLibrary: (id: string) => void;
  addBookToLibrary: (book: Book) => void;
  addBookToReadingList: (book: Book) => void;
  removeBookFromReadingList: (id: string) => void;
}

export const useBooksStore = create<BooksState>()((set) => ({
  library: [],
  readingList: [],
  fetchBooks: async () => set({ library: await initialLibrary }),
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
