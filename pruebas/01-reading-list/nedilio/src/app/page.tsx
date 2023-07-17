"use client";
import Title from "@/app/components/Title";
import useBooks from "./hooks/useBooks";
import Book from "./components/Book";

export default function Home() {
  const {
    books,
    readingList,
    handleRemoveFromReadingList,
    handleAddToReadingList,
  } = useBooks();
  return (
    <main className="flex min-h-screen items-center justify-between">
      <section className="w-3/4 h-screen p-4">
        <Title text="Library" />
        <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
          {books?.length === 0 ? (
            <div>No books to display</div>
          ) : (
            books?.map((book) => (
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
