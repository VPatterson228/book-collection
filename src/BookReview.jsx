import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function BookReview( ) {
    const location = useLocation();
    const { title, authors, book = {} } = location.state || {}; // Safely access book from state

    console.log('Book object in BookReview:', book);

    const [submittedReview, setSubmittedReview] = useState(null);
    const [reviews, setReviews] = useState([]); // State to store all reviews

    console.log('Review object in BookReview:', reviews);

    useEffect(() => {
        const existingReviews = JSON.parse(localStorage.getItem('reviews')) || [];
        setReviews(existingReviews);
    }, []);

    // Handles form submission for reviews
    const handleSubmitReview = (e) => {
        e.preventDefault();
        const reviewText = e.target.elements["textarea"].value; // Retrieves the review text
        const combinedData = { title, authors, review: reviewText };

        const updatedReviews = [...reviews, combinedData];
        setReviews(updatedReviews);
        localStorage.setItem('reviews', JSON.stringify(updatedReviews));

        console.log('Saving review:', combinedData);
    };

    const handleSaveEditedReview = (e) => {
        e.preventDefault();
        const reviewText = e.target.elements["textarea"].value;

        const reviewIndex = reviews.findIndex((review) => review === submittedReview);

        if (reviewIndex !== -1) {
            const updatedReview = { ...submittedReview, review: reviewText };
            const updatedReviews = [...reviews];
            updatedReviews[reviewIndex] = updatedReview;
            setReviews(updatedReviews);

            localStorage.setItem('reviews', JSON.stringify(updatedReviews));

            console.log('Saving edited review:', updatedReview);
            setSubmittedReview(null);
        }
    };

    const handleEditReview = (reviewToEdit) => {
        setSubmittedReview(reviewToEdit);
    };

    const handleDeleteReview = (reviewToDelete) => {
        const updatedReviews = reviews.filter((review) => review !== reviewToDelete);
        setReviews(updatedReviews);
        localStorage.setItem('reviews', JSON.stringify(updatedReviews));
    };

    if (!book) {
        return <div>Book information is not available.</div>;
    }

    return (
        <div>
            <h2>Write Review for: </h2>
            <h3>{title}</h3>
            <p>Author(s): {authors && authors.join(', ')}</p>
            <form onSubmit={submittedReview ? handleSaveEditedReview : handleSubmitReview}>
                <textarea
                    name="textarea"
                    placeholder="Write your review here..."
                    defaultValue={submittedReview ? submittedReview.review : ''} // Set default value for editing
                />
                <button type="submit">
                    {submittedReview ? 'Save Edit' : 'Save Review'}
                </button>
            </form>

            {submittedReview && (
                <p>Editing review for: {submittedReview.title}</p>
            )}

            {reviews.length > 0 && (
                <div>
                    <h2>Existing Reviews</h2>
                    <ul>
                        {reviews.map((review, index) => (
                            <li key={index}>
                                <h3>{review.title}</h3> {/* Display title from stored review */}
                                <p>By: {review.authors && review.authors.join(', ')}</p> {/* Display authors from stored review */}
                                <p>{review.review}</p>
                                <button onClick={() => handleEditReview(review)}>Edit</button>
                                <button onClick={() => handleDeleteReview(review)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
