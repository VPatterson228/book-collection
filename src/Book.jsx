import React from 'react';


export default function Book({ book }) {
  // Check if book is defined
  if (!book) {
    return null; // Return null if book is undefined
  }

  // Destructure book object to access its properties safely
  const { volumeInfo } = book || {};

  // Check if volumeInfo is defined
  if (!volumeInfo) {
    return null; // Return null if volumeInfo is undefined
  }

  // Extract title, authors, and description properties
  const { title, authors, description } = volumeInfo;

  return (
    <div>
      {/* Render title, authors, and description if available */}
      {title && <h2>{title}</h2>}
      {authors && <p>Author(s): {authors.join(', ')}</p>}
      {description && <p>Description: {description}</p>}
    </div>
  );
}



