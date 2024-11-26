import styles from "./Pages.module.css";

function Pages({ totalPages, activePage, dispatch }) {
  const renderPages = () => {
    const pages = [];

    let start = 1;
    let end = totalPages;

    if (totalPages > 9) {
      if (activePage <= 5) {
        start = 1;
        end = 9;
      } else if (activePage >= totalPages - 4) {
        start = totalPages - 8;
        end = totalPages;
      } else {
        start = activePage - 4;
        end = activePage + 4;
      }
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          className={`${styles.btn} ${activePage === i ? styles.active : ""}`}
          key={i}
          onClick={() => dispatch({ type: "changePage", payload: i })}
        >
          {i}
        </button>
      );
    }

    if (start > 1) {
      pages.unshift(
        <button
          className={styles.btn}
          key="first"
          onClick={() => dispatch({ type: "changePage", payload: 1 })}
        >
          1
        </button>,
        <span className={styles.btn} key="ellipsis-start">
          <b>...</b>
        </span>
      );
    }
    if (end < totalPages) {
      pages.push(
        <span className={styles.btn} key="ellipsis-end">
          <b>...</b>
        </span>,
        <button
          className={styles.btn}
          key={totalPages}
          onClick={() => dispatch({ type: "changePage", payload: totalPages })}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return <div className={styles.pages}>{renderPages()}</div>;
}

export default Pages;
