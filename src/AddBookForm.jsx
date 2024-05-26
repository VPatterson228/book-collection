
import React, { useState } from 'react';

export function AddBookForm() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [review, setReview] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Create a new book object
        const newBook = {
            title,
            author,
            review
        };
        // Get existing books from local storage or initialize an empty array
        const existingBooks = JSON.parse(localStorage.getItem('books')) || [];
        // Add the new book to the existing array
        const updatedBooks = [...existingBooks, newBook];
        // Save the updated array back to local storage
        localStorage.setItem('books', JSON.stringify(updatedBooks));
        // Reset form fields
        setTitle('');
        setAuthor('');
        setReview('');
    }

    return (
        <div>
            <h1>Add Book</h1>
            <form onSubmit={handleSubmit}>
                <ul>
                    <li><input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} /></li>
                    <li><input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} /></li>
                    <li><textarea placeholder="Review" value={review} onChange={(e) => setReview(e.target.value)} /></li>
                    <button type="submit">Add Book</button>
                </ul>
            </form>
        </div>
    );
}

