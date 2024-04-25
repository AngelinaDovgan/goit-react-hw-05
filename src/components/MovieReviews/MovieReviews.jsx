import { useEffect, useState } from "react";
import { fetchMovieReviews } from "../../../movies-api";
import Loader from "../Loader/Loader";
import ErrorMessage from "../EM/EM";


export default function MovieReviews({ movieId }) {
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [movieReviews, setMovieReviews] = useState([]);
    const [isEmpty, setIsEmpty] = useState(false);

     useEffect(() => {
            if (!movieId) return;

            const getReview = async () => {
                setIsLoading(true);
                try {
                    const reviews = await fetchMovieReviews(movieId);
                    if (reviews.length === 0) {
                        setIsEmpty(true);
                        return;
                    }
                    setMovieReviews(reviews);
                } catch (error) {
                    setError(true);
                } finally {
                    setIsLoading(false);
                }
            }
    
            getReview();
        }, [movieId])
    
    return (
        <div>
            {isloading && <Loader />}
            {error && <ErrorMessage/>}
            <ul>
                {movieReviews.map((item) => {
                    <li key={item.id}>
                        <p>
                            Author: {item.author}
                        </p>
                        <p>{item.content}</p>
                    </li>
                }
                )}
            </ul>
            {isEmpty && <h3>Ooops! Here is nothing to see!</h3>}
        </div>
    )
}
