"use client";
import Title from "@/app/components/Title";
import useBooks from "./hooks/useBooks";
import Book from "./components/Book";
import FilterSelector from "./components/FilterSelector";
import { useState } from "react";

export default function Home() {
  const {
    genres,
    library,
    readingList,
    handleRemoveFromReadingList,
    handleAddToReadingList,
  } = useBooks();

  const [filter, setFilter] = useState<string>("");

  const filteredLibrary =
    filter !== "" ? library.filter((book) => book.genre === filter) : library;

  return (
    <main className="flex min-h-screen items-center justify-between">
      <section className="w-3/4 h-screen p-4">
        <Title text="Library" />
        <FilterSelector setFilter={setFilter} genres={genres} />
        {filter !== ""
          ? ` Mostrando ${filteredLibrary.length} ${
              filteredLibrary.length === 1 ? "libro" : "libros"
            } con el genero ${filter}`
          : "no hay filtro de genero"}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
          {filteredLibrary?.length === 0 ? (
            <div>No books to display</div>
          ) : (
            filteredLibrary?.map((book) => (
              <Book
                key={`library-${book.ISBN}`}
                book={book}
                type="library"
                action={handleAddToReadingList}
              />
            ))
          )}
        </div>
      </section>
      <section className="w-1/4 bg-slate-800 h-screen p-4">
        <Title text="Reading List" />
        {readingList.length}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-2">
          {readingList.length === 0 ? (
            <div>No books in reading list</div>
          ) : (
            readingList.map((book) => (
              <Book
                key={`readingList-${book.ISBN}`}
                book={book}
                type="readingList"
                action={handleRemoveFromReadingList}
              />
            ))
          )}
        </div>
      </section>
    </main>
  );
}
