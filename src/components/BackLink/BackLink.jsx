import { Link } from "react-router-dom";
import Btn from "../Btn/Btn";

export default function BackLink({ to, children }) {
    return (
        <Link to={to}>
            <Btn type="button">Go back</Btn>
            {children}
        </Link>
    );
};