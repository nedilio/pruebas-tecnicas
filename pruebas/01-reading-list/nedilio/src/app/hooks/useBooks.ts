import { useEffect } from "react";
import { useBooksStore } from "../store/books";
import { Book, Library } from "../lib/types";

function useBooks() {
  const books = useBooksStore((state) => state.library);
  const readingList = useBooksStore((state) => state.readingList);
  const fetchBooks = useBooksStore((state) => state.fetchBooks);

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
    (async function () {
      //   const libraryLocalStorage = window.localStorage.getItem("library");
      //   console.log(libraryLocalStorage);
      const response = await fetch(`/books.json`);
      const { library } = (await response.json()) as Library;
      const books = library.map(({ book }) => book as Book);
      fetchBooks(books);
    })();
  }, [fetchBooks]);

  return {
    books,
    readingList,
    handleAddToReadingList,
    handleRemoveFromReadingList,
  };
}

export default useBooks;
