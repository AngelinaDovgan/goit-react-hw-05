export default function Btn({ children, onClick }) {
  return (
    <button className={css.button} onClick={onClick}>
      {children}
    </button>
  );
}