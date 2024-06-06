import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function BookReview() {
    const location = useLocation();
    const { title, authors } = location.state || {};

    const [submittedReview, setSubmittedReview] = useState(null);
    const [reviews, setReviews] = useState([]); // State to store the array of reviews

    if (!title || !authors) {
        return <p>No book selected for review.</p>;
    }

    useEffect(() => {
        // Retrieve existing reviews from localStorage on component mount
        const existingReviews = JSON.parse(localStorage.getItem('reviews')) || [];
        const filteredReviews = existingReviews.filter(
          (review) => review.title === title && review.authors.join(', ') === authors.join(', ')
        );
        setReviews(filteredReviews);
      }, []); // Empty dependency array for initial render
      

    const handleSubmitReview = (e) => {
        e.preventDefault();
        const reviewText = e.target.elements["textarea"].value; // retrieves the review text
        const combinedData = { title, authors, review: reviewText };
        // Update logic for reviews state and localStorage (replace with your implementation)
        setReviews([...reviews, combinedData]);

        // Update localStorage with the new review
        const allReviews = JSON.parse(localStorage.getItem('reviews')) || [];
        const newAllReviews = [...allReviews, combinedData];
        localStorage.setItem('reviews', JSON.stringify(newAllReviews));

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

            // Update localStorage with the edited review
            const allReviews = JSON.parse(localStorage.getItem('reviews')) || [];
            const allReviewIndex = allReviews.findIndex(
                (review) => review.title === submittedReview.title && review.authors.join(', ') === submittedReview.authors.join(', ')
            );
            if (allReviewIndex !== -1) {
                allReviews[allReviewIndex] = updatedReview;
                localStorage.setItem('reviews', JSON.stringify(allReviews));
            }

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

        // Update localStorage to remove the deleted review
        const allReviews = JSON.parse(localStorage.getItem('reviews')) || [];
        const newAllReviews = allReviews.filter(
            (review) => !(review.title === reviewToDelete.title && review.authors.join(', ') === reviewToDelete.authors.join(', '))
        );
        localStorage.setItem('reviews', JSON.stringify(newAllReviews));
    };

    return (
        <div>
            <h2>Write Review for: </h2>
            <h3>{title}</h3>
            <p>Author(s): {authors && authors.join(', ')}</p>
            <form onSubmit={submittedReview ? handleSaveEditedReview : handleSubmitReview}>
                <textarea
                    name="textarea"
                    placeholder="Write your review here..."
                    defaultValue={submittedReview ? submittedReview.review : ''}
                />
                <button type="submit">
                    {submittedReview ? 'Save Edit' : 'Save Review'}
                </button>
            </form>

            {submittedReview && (
                <p>Editing review for: {submittedReview.title}</p>
            )}
            <h2>Existing Reviews</h2>
            {reviews.length > 0 ? (
                reviews.map((review, index) => (
                    <div key={index}>
                        <h3>{review.title}</h3>
                        <p>By: {review.authors && review.authors.join(', ')}</p>
                        <p>{review.review}</p>
                        <button onClick={() => handleEditReview(review)}>Edit</button>
                        <button onClick={() => handleDeleteReview(review)}>Delete</button>
                    </div>
                ))
            ) : (
                <p>No Reviews</p>
            )}
        </div>
    );
}
