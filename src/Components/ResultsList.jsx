import ResultItem from "./ResultItem";
import styles from "./ResultsList.module.css";

function ResultsList({ results }) {
  return (
    <div className={styles.resultsList}>
      {results.map((resultItem) => (
        <ResultItem resultItem={resultItem} key={resultItem.id} />
      ))}
    </div>
  );
}

export default ResultsList;
