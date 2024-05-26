import React from 'react';
import Book from './Book';

export function BookList({ bookList }) {
  return (
    <div>
      <h1>Book List</h1>
      {bookList.length > 0 ? (
        bookList.map((book, index) => (
          <div key={index}>
            <Book book={book} />
          </div>
        ))
      ) : (
        <p>No books on the Book list</p>
      )}
    </div>
  );
}
