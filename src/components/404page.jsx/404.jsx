import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa'; // React Icons

const NotFound = () => {
  return (
    <div style={styles.container}>
      <FaExclamationTriangle size={100} style={styles.icon} />
      <h1 style={styles.title}>404</h1>
      <p style={styles.message}>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" style={styles.link}>Go Back Home</Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
    fontFamily: 'Arial, sans-serif',
  },
  icon: {
    color: '#ff6b6b',
    marginBottom: '20px',
  },
  title: {
    fontSize: '72px',
    margin: '20px 0',
  },
  message: {
    fontSize: '24px',
    margin: '20px 0',
    color: '#555',
  },
  link: {
    fontSize: '18px',
    color: '#007bff',
    textDecoration: 'none',
    border: '1px solid #007bff',
    padding: '10px 20px',
    borderRadius: '5px',
    transition: 'background-color 0.3s, color 0.3s',
  }
};

export default NotFound;
