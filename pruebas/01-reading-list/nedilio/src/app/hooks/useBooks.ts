import { useEffect } from "react";
import { useBooksStore } from "../store/books";
import { Book } from "../lib/types";

function useBooks() {
  const books = useBooksStore((state) => state.library);
  const readingList = useBooksStore((state) => state.readingList);
  const initialState = useBooksStore((state) => state.fetchBooks);

  const removeBookFromLibrary = useBooksStore(
    (state) => state.removeBookFromLibrary
  );
  const addBookToLibrary = useBooksStore((state) => state.addBookToLibrary);
  const addBookToReadingList = useBooksStore(
    (state) => state.addBookToReadingList
  );
  const removeBookFromReadingList = useBooksStore(
    (state) => state.removeBookFromReadingList
  );

  const handleAddToReadingList = (id: string) => {
    const bookToAdd = books.find((book) => book.ISBN === id) as Book;
    addBookToReadingList(bookToAdd);
    removeBookFromLibrary(id);
  };

  const handleRemoveFromReadingList = (id: string) => {
    const bookToRemove = readingList.find((book) => book.ISBN === id) as Book;
    removeBookFromReadingList(id);
    addBookToLibrary(bookToRemove);
  };
  useEffect(() => {
    initialState();
  }, [initialState]);

  return {
    books,
    readingList,
    handleAddToReadingList,
    handleRemoveFromReadingList,
  };
}

export default useBooks;
