import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from '../Layout/Layout';
import MoviesPage from '../../pages/MoviesPage/MoviesPage';
import MovieDetailsPage from '../../pages/MovieDetailsPage/MovieDetailsPage';
import MovieCast from '../MovieCast/MovieCast';
import HomePage from '../../pages/HomePage/HomePage';
import MovieReviews from '../MovieReviews/MovieReviews';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />} />
        <Route path="cast" element={<MovieCast />} />
        <Route path="reviews" element={<MovieReviews />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      
    </Layout>
  );
}