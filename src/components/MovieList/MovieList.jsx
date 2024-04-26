import { nanoid } from "nanoid";
import { Link, useLocation } from "react-router-dom";
import css from './MovieList.module.css';
import { RiMovieLine } from "react-icons/ri";

export default function MovieList({ movies }) {
    const location = useLocation();
    return (
        <div>
            <ul className={css.list}>
                {movies && movies.map((movie) => (
                    <li key={nanoid()}>
                        <RiMovieLine className={css.icon} />  <Link to={`/movies/${movie.id}`} state={location} >
                            {movie.title}
                        </Link>
                    </li>
                )
                )}
            </ul>
        </div>
    )
}