import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Container } from '@mui/material';
import { SearchBookList } from './SearchBookList';
import { AddBookForm } from './AddBookForm';
import { BookList } from './BookList';
import './App.css';
import ResponsiveAppBar from './ResponsiveAppBar';

export default function App() {
  const [searchTerm, setSearchTerm] = useState(''); //Stores the current search term for books
  const [savedBooks, setSavedBooks] = useState([]); //Stores an array of saved books retieved from local storage
  const [bookList, setBookList] = useState(() => {
    // Initialize local list from localStorage or empty array if not found
    const storedBookList = JSON.parse(localStorage.getItem('bookList')) || [];
    return storedBookList;
  });

  useEffect(() => {
    // Fetch saved books from local storage
    const storedBooks = JSON.parse(localStorage.getItem('books')) || [];
    setSavedBooks(storedBooks);
    // Fetch local list from local storage
    const storedBookList = JSON.parse(localStorage.getItem('bookList')) || [];
    setBookList(storedBookList);
  }, []);

    //function for saved books with new book
  const updateSavedBooks = (newBook) => {
    setSavedBooks([...savedBooks, newBook]);
  };

  return (
    <Router >
      <ResponsiveAppBar />
      <Container maxWidth="lg">
        <Routes>
          <Route
            path="/search-books"
            element={<SearchBookList searchTerm={searchTerm} setSearchTerm={setSearchTerm} setBookList={setBookList} />}
          />
          <Route path="/add" element={<AddBookForm onAddBook={updateSavedBooks} />} />
          <Route path="/book-list" element={<BookList bookList={bookList} />} />
        </Routes>
      </Container>
    </Router>
  );
}
