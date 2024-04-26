import { NavLink } from "react-router-dom";
import css from './Navigation.module.css';
import clsx from "clsx";

const activeLink = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
};

export default function Navigation() {
    return (
        <nav className={css.nav}>
            <NavLink to="/" className={activeLink}>Home</NavLink>
            <NavLink to="/movies" className={activeLink}><span className={css.text}>Movies</span></NavLink>
        </nav>
    )
}
