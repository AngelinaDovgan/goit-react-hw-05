import { Suspense, useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { fetchMovieDetails } from "../../../movies-api";
import BackLink from "../../components/BackLink/BackLink";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/EM/EM";
import { Link } from "react-router-dom";
import MovieCast from "../../components/MovieCast/MovieCast";
import MovieReviews from "../../components/MovieReviews/MovieReviews";
import css from './MovieDetailsPage.module.css';
import { AiFillCaretRight } from "react-icons/ai";


export default function MovieDetailsPage() {
    const { movieId } = useParams();
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
        if (!movieId) return;

        async function fetchDetails() {
            try {
                setIsLoading(true);
                const details = await fetchMovieDetails(movieId);
                setMovieDetails(details);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchDetails();
    }, [movieId])


    const { title, poster_path, vote_average, overview, genres } = movieDetails;

    const toggleCast = () => {
        setShowCast(true);
        setShowReviews(false);
    }

    const toggleReviews = () => {
        setShowCast(false);
        setShowReviews(true);
    }

    // const defaultImg = 'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

   

    return (
        <>
            <BackLink to={backLinkHref.current}></BackLink>
            
            <main>
                {isLoading && <Loader />}
                {error && <ErrorMessage />}
                <div>
                    {/* <img src={
                        poster_path ?
                            (`https://image.tmdb.org/t/p/w500/${poster_path}`) :
                            defaultImg
                    } alt={title} /> */}

                    <img src={`https://image.tmdb.org/t/p/w500/${poster_path}` } alt={title} className={css.img} />
                   
                </div>
                <div>
                    <h2 className={css.text}>{title}</h2>
                    <p className={css.text}>User Score: {vote_average}</p>
                    <h2 className={css.text}>Overview</h2>
                    <p className={css.text}>{overview}</p>
                    <h2 className={css.text}>Genres</h2>
                    {genres && genres.length > 0 ? (
                        <ul className={css.text}> 
                            {genres.map(genre =>
                            <li key={genre.id}>  <AiFillCaretRight className={css.icon} /> {genre.name} </li>
                            )}
                        </ul>
                    ) : (
                        <p>Here is no information</p>
                    )}
                </div>
                <h2 className={css.text}>Additional information</h2>
                <ul className={css.text}>
                    <li className={css.list}>
                       <AiFillCaretRight className={css.icon} /> <Link to={`/movies/${movieId}/cast`} onClick={toggleCast}>Cast</Link>
                    </li>
                    <li className={css.list}>
                      <AiFillCaretRight className={css.icon} />  <Link to={`/movies/${movieId}/reviews`} onClick={toggleReviews}>Review</Link>
                    </li>
                </ul>
                <Suspense>
                    <Outlet />
                </Suspense>
                {showCast && <MovieCast movieId={movieId} />}
                {showReviews && <MovieReviews movieId={movieId} />}
            </main>
        </>
    )
}


