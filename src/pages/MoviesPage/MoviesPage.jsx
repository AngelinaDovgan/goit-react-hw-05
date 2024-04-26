import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchMovies } from "../../../movies-api";
import MovieFilter from "../../components/MovieFilter/MovieFilter";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/EM/EM";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
import css from './MoviesPage.module.css';

export default function MoviesPage() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [isEmpty, setIsEmpty] = useState(false);
    const [page, setPage] = useState(1);
    const [isVisible, setIsVisible] = useState(false);
    
    const query = searchParams.get("query") ?? "";
    
    useEffect(() => {
    if (!query) return;

    const getMovie = async () => {
        setIsLoading(true);
        try {
            const { results, total_pages } = await fetchMovies(query, page);
            if (results.length === 0) {
                setIsEmpty(true);
                return;
            }
            setMovies((prevMovies) => {
                return [...prevMovies, ...results];
            });
            setIsVisible(page < total_pages);
        } catch (error) {
            setError(true);
        } finally {
            setIsLoading(false);
        }
    };

    getMovie();
}, [page, query, searchParams]);



    const onHandleSubmit = (newQuery) => {
        setSearchParams({ query: newQuery });
        setPage(1);
        setMovies([]);
        setIsEmpty(false);
        setError(null);
    };
    const handleClick = () => {
        setPage((prevPage) => prevPage + 1)
    }

    return (
        <div>
            <h2 className={css.title}>Movies Page</h2>
            <MovieFilter onSearch={onHandleSubmit} />
            {movies.length > 0 && <MovieList movies={movies} />}
            {isVisible && <LoadMoreBtn onClick={handleClick} disabled={isLoading}></LoadMoreBtn>}
            {!movies.length && !isEmpty && <p>Let's begin!</p>}
            {isLoading && <Loader />}
            {error && <ErrorMessage />}
            {isEmpty &&  <p>Sorry! Here is no movies!</p>}
        </div>
    )
}
