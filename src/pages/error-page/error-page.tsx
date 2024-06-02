import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './error-page.css';

const ErrorPage: React.FC = () => {
  return (
    <div className="container text-center">
      <h1 className="display-4">Page Not Found</h1>
      <p className="lead">The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-primary">Go to Home</Link>
    </div>
  );
};

export default ErrorPage;
