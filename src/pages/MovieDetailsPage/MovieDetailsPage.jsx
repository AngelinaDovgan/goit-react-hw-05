import { Suspense, useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { fetchMovieDetails } from "../../../movies-api";
import BackLink from "../../components/BackLink/BackLink";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/EM/EM";
import { Link } from "react-router-dom";
import MovieCast from "../../components/MovieCast/MovieCast";
import MovieReviews from "../../components/MovieReviews/MovieReviews";


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
    const [showCast, setShowCast] = useState(false);
    const [showReviews, setShowReviews] = useState(false);

    const location = useLocation();
    const backLinkHref = useRef(location.state ?? "/movies")

    useEffect(() => {
        if (!id) return;

        async function fetchDetails() {
            try {
                setIsLoading(true);
                const details = await fetchMovieDetails(id);
                setMovieDetails(details);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchDetails();
    }, [id])

    const { title, poster_path, vote_average, overview, genres } = movieDetails;

    const toggleCast = () => {
        setShowCast(true);
        setShowReviews(false);
    }

    const toggleReviews = () => {
        setShowCast(false);
        setShowReviews(true);
    }

    const defaultImg = 'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

    return (
        <>
            
            <BackLink to={backLinkHref.current}></BackLink>
            
            <main>
                {isLoading && <Loader />}
                {error && <ErrorMessage />}
                <div>
                    <img src={
                        poster_path ?
                            (`https://image.tmdb.org/t/p/w500/${poster_path}`) :
                            defaultImg
                    } alt={title} />
                </div>
                <div>
                    <h2>{title}</h2>
                    <p>User Score: {vote_average}</p>
                    <h3>Overview</h3>
                    <p>{overview}</p>
                    <h3>Genres</h3>
                    {genres && genres.length > 0 ? (
                        <ul>
                            {genres.map(genre =>
                                <li key={genre.id}>{genre.name}</li>
                            )}
                        </ul>
                    ) : (
                        <p>Here is no information</p>
                    )}
                </div>
                <h4>Additional information</h4>
                <ul>
                    <li>
                        <Link to={`/movies/${id}/cast`} onClick={toggleCast}>Cast</Link>
                    </li>
                    <li>
                        <Link to={`/movies/${id}/reviews`} onClick={toggleReviews}>Review</Link>
                    </li>
                </ul>
                <Suspense>
                    <Outlet />
                </Suspense>
                {showCast && <MovieCast movieId={id} />}
                {showReviews && <MovieReviews movieId={id} />}
            </main>
        </>
    )
}