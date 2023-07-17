"use client";
import Title from "@/app/components/Title";
import useBooks from "./hooks/useBooks";
import Image from "next/image";

export default function Home() {
  const {
    books,
    readingList,
    handleAddToReadingList,
    handleRemoveFromReadingList,
  } = useBooks();

  return (
    <main className="flex min-h-screen items-center justify-between">
      <div className="w-3/4 h-screen p-4 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
        {books.length === 0 ? (
          <div>No books to display</div>
        ) : (
          books.map((book) => (
            <div key={`library-${book.ISBN}`} className="relative">
              <Image
                src={book.cover}
                width={200}
                height={300}
                alt={book.title}
                className="rounded-lg object-cover"
              ></Image>
              <div
                className="absolute top-0 left-0 bg-black bg-opacity-0 w-full h-full opacity-0 hover:opacity-100 hover:bg-opacity-90 
              transition-opacity duration-300 ease-in-out 
              flex flex-col justify-center items-center gap-y-4
              "
              >
                <p className="balance text-center">{book.title}</p>
                <button
                  onClick={() => handleAddToReadingList(book.ISBN)}
                  className="bg-yellow-800 px-4 py-2 rounded placeholder-opacity-100"
                >
                  Add to Reading List
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="w-1/4 bg-slate-800 h-screen p-4">
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
