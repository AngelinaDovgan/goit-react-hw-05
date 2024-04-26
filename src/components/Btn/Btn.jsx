import css from './Btn.module.css';

export default function Btn({ children, onClick }) {
  return (
    <button className={css.btn} onClick={onClick}>
      {children}
    </button>
  );
}