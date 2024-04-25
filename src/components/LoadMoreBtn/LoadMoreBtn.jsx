export default function LoadMoreBtn({ onClick, children }) {
    return (
        <button onClick={onClick} type="button">Load more movies
            {children}
        </button>
    );
}