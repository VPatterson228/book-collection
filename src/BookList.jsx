import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Book from './Book';


export function BookList({ bookList }) {
  const [currentBooks, setCurrentBooks] = useState(bookList);
  const navigate = useNavigate();

  const handleDeleteBook = (book) => {
    const filteredBooks = currentBooks.filter((item) => item.id !== book.id);
    setCurrentBooks(filteredBooks);

    const existingBookList = JSON.parse(localStorage.getItem('bookList')) || [];
    const updatedBookList = existingBookList.filter((item) => item.id !== book.id);
    localStorage.setItem('bookList', JSON.stringify(updatedBookList));
  };

  const handleAddReview = (book) => {
    navigate('/book-review', { state: { book } }); // Pass entire book object
  };

  return (
    <div>
      <h1>Book List</h1>
      {currentBooks.length > 0 ? (
        currentBooks.map((book, index) => (
          <div key={`${book.id}-${index}`}>
            <Book book={book} onAddReview={handleAddReview} />
            <button onClick={() => handleDeleteBook(book)}>Delete</button>
            <button onClick={() => handleAddReview(book)}>Write Review</button>
          </div>
        ))
      ) : (
        <p>No books on the Book list</p>
      )}
    </div>
  );
}