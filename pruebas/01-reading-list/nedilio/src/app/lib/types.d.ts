﻿export interface Library {
  library: LibraryItem[];
}

export interface LibraryItem {
  book: Book;
}

export interface Book {
  title: string;
  pages: number;
  genre: string;
  cover: string;
  synopsis: string;
  year: number;
  ISBN: string;
  author: Author;
}

export interface Author {
  name: string;
  otherBooks: string[];
}
