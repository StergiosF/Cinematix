import Pages from "./Pages";
import ResultItem from "./ResultItem";
import styles from "./ResultsList.module.css";

function ResultsList({ results, totalPages, dispatch, activePage }) {
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
      <Pages
        totalPages={totalPages}
        activePage={activePage}
        dispatch={dispatch}
      />
    </div>
  );
}

export default ResultsList;
