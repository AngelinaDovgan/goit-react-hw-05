import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchMovies } from "../../../movies-api";
import MovieFilter from "../../components/MovieFilter/MovieFilter";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/EM/EM";

export default function MoviesPage() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [isEmpty, setIsEmpty] = useState(false);
    
    const movieParam = searchParams.get("query") ?? "";

     useEffect(() => {
            if (!query) return;

            const getMovie = async () => {
                setIsLoading(true);
                try {
                    const { results, total_pages} =  await fetchMovies(query, page);
                    if (results.length === 0) {
                        setIsEmpty(true);
                        return;
                    }
                    setMovieReviews((prevMovies) => {
                        return [...prevMovies, ...results];
                });
                } catch (error) {
                    setError(true);
                } finally {
                setIsLoading(false);
                }
            }
    
            getMovie();
        }, [page, query, searchParams])


    const handleSearch = (newQuery) => {
        setSearchParams({ query: newQuery });
        setPage(1);
        setMovies([]);
        setIsEmpty(false);
        setError(null);
    };
    
    return (
        <div>
            <p>Movies Page</p>
            <MovieFilter onSearch={handleSearch} />
            {movies.length > 0 && <MovieList />}
            {isLoading && <Loader />}
            {error && <ErrorMessage />}
            {isEmpty &&  <p>Sorry! Here is no movies!</p>}
        </div>
    )
}
