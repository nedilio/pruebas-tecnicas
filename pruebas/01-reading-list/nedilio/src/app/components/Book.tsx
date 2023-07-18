"use client";

import Image from "next/image";
import { Book } from "../lib/types";
import { useState } from "react";
interface BookProps {
  book: Book;
  type: "library" | "readingList";
  action: (id: string) => void;
}
const Book = ({ book, type, action }: BookProps) => {
  const [isButtonDisabled, setButtonDisabled] = useState<boolean>(false);
  return (
    <>
      <div
        key={`${type}-${book.ISBN}`}
        id={`${type}-${book.ISBN}`}
        className="relative animate-jump-in animate-ease-in-out max-h-80"
      >
        <p>{book.genre}</p>
        <Image
          src={book.cover}
          width={200}
          height={300}
          alt={book.title}
          className="rounded-lg object-cover"
        />
        <div
          className="absolute top-0 left-0 bg-black bg-opacity-0 w-full h-full opacity-0 hover:opacity-100 hover:bg-opacity-90 
    transition-opacity duration-300 ease-in-out 
    flex flex-col justify-center items-center gap-y-4
    "
        >
          <p className="balance text-center">{book.title}</p>
          <button
            disabled={isButtonDisabled}
            onClick={() => {
              setButtonDisabled(true);

              const el = document.querySelector(`#${type}-${book.ISBN}`);
              el?.classList.add(
                "animate-jump-out",
                // "animate-duration-300",
                "animate-ease-in-out"
              );

              setTimeout(() => {
                action(book.ISBN);
              }, 300);
            }}
            className="bg-yellow-800 px-4 py-2 rounded placeholder-opacity-100"
          >
            {type === "library"
              ? "Add to Reading List 📚"
              : "Remove from Reading List↩️"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Book;
