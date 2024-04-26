import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { fetchMovieDetails } from "../../../movies-api";
import BackLink from "../BackLink/BackLink";
import Loader from "../Loader/Loader";
import ErrorMessage from "../EM/EM";

export default function MovieDetailsPage() {
    const { id } = useParams();
    const [movieDetails, setMovieDetails] = useState({
        title: "",
        poster_path: "",
        vote_average: 0,
        overview: "",
        genres: []
    });
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const location = useLocation();

    const backLink = useRef(location.state ?? "/movies")

    useEffect(() => {
        if (!id) return;
        async function fetchDetails() {
            try {
                setIsLoading(true);
                const details = await fetchMovieDetails(id);
                setMovieDetails(details);
            } catch (error) {
                setError(true);
            } finally {
                setIsLoading(false);
            }
        }
        fetchDetails();
    }, [id])

    const { title, poster_path, vote_average, overview, genres } = movieDetails;
    const img = "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";
    return (
        <div>
            <BackLink to={backLink.current}></BackLink>
            {isLoading && <Loader />}
            {error && <ErrorMessage />}
            <img src={poster_path ? (`https://image.tmdb.org/t/p/w500/${poster_path}`) : img} alt={title} />
            <h2>{title}</h2>
            <p>User score: {vote_average}</p>
            <h2>Overview</h2>
            <p>{overview}</p>
            <h2>Genres</h2>
            <p>{genres}</p>
        </div>
    )



}