import { useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";

import { fetchTrendMovies } from "../../../movies-api";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/EM/EM";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);



  useEffect(() => {
    
    const TrendMovies = async () => {
      setIsLoading(true);
      
      try {
        const { results, total_page } = await fetchTrendMovies(page);
        if (results.length === 0) {
          setIsEmpty(true);
          return;
        }
        setMovies((prevMovie) => {
          return [...prevMovie, ...data];
        });
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    
  TrendMovies();
  }, [page]);
    
  const handleLoadMore = () => {
    setPage(page + 1);
  };


    return (
        <div>
            <p>Home Page </p>
            {movies.length > 0 && <MovieList movies={movies}/> }
            {isloading && <Loader/>}
            {error && <ErrorMessage/>}
            {<LoadMoreBtn onClick={handleLoadMore} />}
        </div>
    );
    }

