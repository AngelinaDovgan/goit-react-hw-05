import css from './LoadMoreBtn.module.css';

export default function LoadMoreBtn({ onClick, children }) {
    return (
        <button onClick={onClick} type="button" className={css.button}>Load more movies
            {children}
        </button>
    );
}