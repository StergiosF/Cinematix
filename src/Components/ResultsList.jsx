import ResultItem from "./ResultItem";
import styles from "./ResultsList.module.css";

function ResultsList({ results, totalPages }) {
  return (
    <div className={styles.container}>
      <div className={styles.resultsList}>
        {results.map((resultItem) => (
          <ResultItem resultItem={resultItem} key={resultItem.id} />
        ))}
      </div>
      <div className={styles.pages}>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
        <button>...</button>
        <button>{totalPages}</button>
      </div>
    </div>
  );
}

export default ResultsList;
