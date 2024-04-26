import { nanoid } from "nanoid";
import { Link, useLocation } from "react-router-dom";

export default function MovieList({ movies }) {
    const location = useLocation();
    return (
        <div>
            <ul>
                {movies && movies.map((movie) => (
                    <li key={nanoid()}>
                        <Link to={`/movies/${movie.id}`} state={location} >
                            {movie.title}
                        </Link>
                    </li>
                )
                )}
            </ul>
        </div>
    )
}