import React, { useState, useEffect } from 'react';
import Book from './Book';

export function SearchBookList({ searchTerm, setSearchTerm, setBookList }) {
  const [books, setBooks] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        if (searchTerm.trim() !== '') {
          const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`);
          const data = await response.json();
          setBooks(data.items);
        }
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, [searchTerm]);

  const handleSearch = () => {
    setSearchTerm(searchInput);
  };

  const addToBookList = (book) => {
    console.log('Adding book to local list:', book);
    // Retrieve the existing local list from localStorage
    const existingBookList = JSON.parse(localStorage.getItem('bookList')) || [];
    // Add the new book to the existing local list
    const updatedBookList = [...existingBookList, book];
    // Save the updated local list back to localStorage
    localStorage.setItem('bookList', JSON.stringify(updatedBookList));
    setBookList(updatedBookList);
  };



  return (
    <div >
      <h1>Search Books</h1>
      <input
        type="text"
        placeholder="Search for a book"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {books && books.map((book, index) => (
        <div key={`${book.id}-${index}`}>
          <Book book={book} />
          <button onClick={() => addToBookList(book)}>Add TBR List</button>

        </div>
      ))}
    </div>
  );
};

