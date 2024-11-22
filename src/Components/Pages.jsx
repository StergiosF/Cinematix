import styles from "./Pages.module.css";

function Pages({ totalPages }) {
  return (
    <div className={styles.pages}>
      <button className={styles.btn}>1</button>
      <button className={styles.btn}>2</button>
      <button className={styles.btn}>3</button>
      <button className={styles.btn}>4</button>
      <button className={styles.btn}>5</button>
      <button className={styles.btn}>6</button>
      <button className={styles.btn}>7</button>
      <button className={styles.btn}>8</button>
      <button className={styles.btn}>9</button>
      <button className={styles.btn}>...</button>
      <button className={styles.btn}>
        {totalPages <= 30 ? totalPages : 30}
      </button>
    </div>
  );
}

export default Pages;
