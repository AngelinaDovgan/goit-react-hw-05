import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <div>
            <p>Ooops! Page not found!</p>
            <h3>
                Visit our<Link to="/">Home Page </Link>
            </h3>
        </div>
    );
}
