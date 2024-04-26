import { useEffect, useState } from "react";
import { fetchMovieReview } from "../../../movies-api";
import Loader from "../Loader/Loader";
import ErrorMessage from "../EM/EM";
import { FaUserEdit } from "react-icons/fa";
import { MdOutlineRateReview } from "react-icons/md";
import css from './MovieReviews.module.css';

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
                    const reviews = await fetchMovieReview(movieId);
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
            <ul className={css.list}>
                {movieReviews.map((item) => (
                    <li key={item.id} className={css.item}>
                       <h3> <FaUserEdit className={css.icon} /> Author: {item.author}</h3>
                        <p> <MdOutlineRateReview className={css.icon} /> {item.content}</p>
                    </li>
                ))}
            </ul>
            {isEmpty && <h3>Ooops! Here is nothing to see!</h3>}
        </div>
    )
}
