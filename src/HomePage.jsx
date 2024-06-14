import React from 'react';
import Home_Collection from './images/Home_Collection.jpg'
export function HomePage() {
  return (
    <div s>
      <h1 style={styles.heading}>Patty's Book Collection</h1>
      <img src={Home_Collection} alt="Home Library" style={styles.image} />
    </div>
  );
}
const styles = {
    
    heading: {
      fontFamily: 'Merienda, cursive', 
      fontSize: '100px',
      textAlign: 'center',
    },
    image: {
      maxWidth: '100%',
      height: 'auto',
    },
  };