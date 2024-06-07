import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import { SearchBookList } from './SearchBookList';
import { BookList } from './BookList';
import { BookReview } from './BookReview';
import './App.css';
import ResponsiveAppBar from './ResponsiveAppBar';

export default function App() {
  const [searchTerm, setSearchTerm] = useState(''); //Stores the current search term for books
  const [bookList, setBookList] = useState(() => {
    // Initialize local list from localStorage or empty array if not found
    const storedBookList = JSON.parse(localStorage.getItem('bookList')) || [];
    return storedBookList;
  });

  useEffect(() => {
    const storedBookList = JSON.parse(localStorage.getItem('bookList')) || [];
    setBookList(storedBookList);
  }, []);

  return (
    <Router>
      <ResponsiveAppBar />
      <Container maxWidth="lg">
        <Routes>
          <Route
            path="/search-books"
            element={<SearchBookList searchTerm={searchTerm} setSearchTerm={setSearchTerm} setBookList={setBookList} />}
          />
          <Route path="/book-review" element={<BookReview />} />
          <Route path="/tbr-list" element={<BookList bookList={bookList} />} />
        </Routes>
      </Container>
    </Router>
  );
}
