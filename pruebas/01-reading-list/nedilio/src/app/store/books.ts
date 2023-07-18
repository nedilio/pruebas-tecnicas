import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Book } from "../lib/types";

interface BooksState {
  library: Book[];
  fetchBooks: (books: Book[]) => void;
  removeBookFromLibrary: (id: string) => void;
  addBookToLibrary: (book: Book) => void;
}

interface ReadingListState {
  readingList: Book[];
  addBookToReadingList: (book: Book) => void;
  removeBookFromReadingList: (id: string) => void;
}

export const useBooksStore = create<BooksState>()(
  persist(
    (set, get) => ({
      library: [],
      fetchBooks: async (books) => set({ library: books }),
      removeBookFromLibrary: (id: string) =>
        set((state) => ({
          library: state.library.filter((book) => book.ISBN !== id),
        })),
      addBookToLibrary: (book: Book) =>
        set((state) => ({ library: [...state.library, book] })),
    }),
    {
      name: "library-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export const useReadingListStore = create<ReadingListState>()(
  persist(
    (set, get) => ({
      readingList: [],
      addBookToReadingList: (book: Book) =>
        set((state) => ({ readingList: [...state.readingList, book] })),
      removeBookFromReadingList: (id: string) =>
        set((state) => ({
          readingList: state.readingList.filter((book) => book.ISBN !== id),
        })),
    }),
    {
      name: "readingList-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
