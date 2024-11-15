import Item from "./Item";
import styles from "./ResultsList.module.css";

function ResultsList({ results }) {
  return (
    <div className={styles.resultsList}>
      {results.map((item) => (
        <Item item={item} key={item.id} />
      ))}
    </div>
  );
}

export default ResultsList;
