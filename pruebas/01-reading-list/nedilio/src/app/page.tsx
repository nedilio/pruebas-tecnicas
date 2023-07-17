"use client";
import Title from "@/app/components/Title";
import useBooks from "./hooks/useBooks";

export default function Home() {
  const {
    books,
    readingList,
    handleAddToReadingList,
    handleRemoveFromReadingList,
  } = useBooks();

  return (
    <main className="flex min-h-screen items-center justify-between p-24">
      <div>
        {books.length === 0 ? (
          <div>No books to display</div>
        ) : (
          books.map((book) => (
            <div key={`library-${book.ISBN}`} className="flex gap-x-4">
              {" "}
              <p>{book.title}</p>
              <button
                onClick={() => handleAddToReadingList(book.ISBN)}
                className="bg-yellow-800 px-4 py-2 rounded"
              >
                Add to Reading List
              </button>
            </div>
          ))
        )}
      </div>
      <div>
        <Title text="Reading List" />
        {readingList.length === 0 ? (
          <div>No books in reading list</div>
        ) : (
          readingList.map((book) => (
            <div key={`reading-${book.ISBN}`} className="flex gap-x-4">
              {" "}
              <p>{book.title}</p>
              <button onClick={() => handleRemoveFromReadingList(book.ISBN)}>
                ✖️
              </button>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
