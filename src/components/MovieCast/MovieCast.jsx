import { useEffect, useState } from "react";
import { fetchMovieCast } from "../../../movies-api";
import ErrorMessage from '../EM/EM';

export default function MovieCast({ movieId }) {
    
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [cast, setCast] = useState([]);
    const [isEmpty, setIsEmpty] = useState(false);

     useEffect(() => {
            if (!movieId) return;

            const getCast = async () => {
                setIsLoading(true);
                try {
                    const movcasts = await fetchMovieCast(movieId);
                    if (movcasts.length === 0) {
                        setIsEmpty(true);
                        return;
                    }
                    setCast(movcasts);
                } catch (error) {
                    setError(true);
                } finally {
                    setIsLoading(false);
                }
            }
    
            getCast();
        }, [movieId])
        
    return (
        <div>
            {isloading && <Loader />}
            {error && <ErrorMessage/> }
            <ul>
              {cast.map((actor) => (
    <li key={`${actor.id}`}>
        <img src={actor.profile_path} alt={actor.name} />
        <p>Character: {actor.character}</p>
    </li>
))}
            </ul>
            {isEmpty && <h3>Ooops! Here is nothing to see!</h3>}
        </div>
    )
}