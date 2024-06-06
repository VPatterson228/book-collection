import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Book from './Book';

export function BookList({ bookList }) { 

  const [currentBooks, setCurrentBooks] = useState(bookList); // Maintain state for books
  const navigate = useNavigate();

  const handleDeleteBook = (book) => {
    const filteredBooks = currentBooks.filter((item) => item.id !== book.id); // Filter based on ID
    setCurrentBooks(filteredBooks);

    // Also remove the book from localStorage
    const existingBookList = JSON.parse(localStorage.getItem('bookList')) || [];
    const updatedBookList = existingBookList.filter(item => item.id !== book.id);
    localStorage.setItem('bookList', JSON.stringify(updatedBookList));
  };
  const handleAddReview = (book) => {
    const { title, authors } = book.volumeInfo || {}; // Extract title and authors
    navigate(`/book-review`, { state: { title, authors } }); // Pass title and authors as state
  };
  return (
    <div>
      <h1>Book List</h1>
      {currentBooks.length > 0 ? (
        currentBooks.map((book, index) => (
          <div key={index}>
            <Book book={book} />
            <button onClick={() => handleAddReview(book)}>Write Review</button>
            <button onClick={() => handleDeleteBook(book)}>Delete</button>
          </div>
        ))
      ) : (
        <p>No books on the Book list</p>
      )}
    </div>
  );
}
