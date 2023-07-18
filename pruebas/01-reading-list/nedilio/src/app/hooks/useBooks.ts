import { useEffect, useState } from "react";
import { useBooksStore, useReadingListStore } from "../store/books";
import { Book, Library } from "../lib/types";

function useBooks() {
  const [genres, setGenres] = useState<string[]>([]);
  console.log(genres);

  const library = useBooksStore((state) => state.library);
  const readingList = useReadingListStore((state) => state.readingList);
  const fetchBooks = useBooksStore((state) => state.fetchBooks);

  const removeBookFromLibrary = useBooksStore(
    (state) => state.removeBookFromLibrary
  );
  const addBookToLibrary = useBooksStore((state) => state.addBookToLibrary);
  const addBookToReadingList = useReadingListStore(
    (state) => state.addBookToReadingList
  );
  const removeBookFromReadingList = useReadingListStore(
    (state) => state.removeBookFromReadingList
  );

  const handleAddToReadingList = (id: string) => {
    const bookToAdd = library.find((book) => book.ISBN === id) as Book;
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
      const libraryLocalStorage =
        window.sessionStorage.getItem("library-storage");
      const readingListLocalStorage = window.sessionStorage.getItem(
        "readingList-storage"
      );

      if (libraryLocalStorage && readingListLocalStorage) {
        const { library } = JSON.parse(libraryLocalStorage).state;
        const { readingList } = JSON.parse(readingListLocalStorage).state;

        if (library.length === 0 && readingList.length === 0) {
          const response = await fetch(`/books.json`);
          const { library } = (await response.json()) as Library;
          const books = library.map(({ book }) => book as Book);
          fetchBooks(books);
        }
      }
    })();
    const genres = Array.from(new Set(library.map((book) => book.genre)));
    setGenres(genres);
  }, [library, fetchBooks, readingList]);

  return {
    genres,
    library,
    readingList,
    handleAddToReadingList,
    handleRemoveFromReadingList,
  };
}

export default useBooks;
