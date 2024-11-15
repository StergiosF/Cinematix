import Result from "./Result";
import styles from "./ResultsList.module.css";

function ResultsList({ results }) {
  return (
    <div className={styles.resultsList}>
      {results.map((result) => (
        <Result result={result} key={result.id} />
      ))}
    </div>
  );
}

export default ResultsList;
