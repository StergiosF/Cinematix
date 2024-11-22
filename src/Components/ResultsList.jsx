import Pages from "./Pages";
import ResultItem from "./ResultItem";
import styles from "./ResultsList.module.css";

function ResultsList({ results, totalPages, dispatch }) {
  return (
    <div className={styles.container}>
      <div className={styles.resultsList}>
        {results.map((resultItem) => (
          <ResultItem
            resultItem={resultItem}
            key={resultItem.id}
            dispatch={dispatch}
          />
        ))}
      </div>
      <Pages totalPages={totalPages} />
    </div>
  );
}

export default ResultsList;
