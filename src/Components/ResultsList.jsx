import Pages from "./Pages";
import ResultItem from "./ResultItem";
import styles from "./ResultsList.module.css";

function ResultsList({
  results,
  totalPages,
  dispatch,
  activePage,
  sortBy,
  type,
  genre,
}) {
  let filteredResults = results;

  console.log(filteredResults);
  // filteredResults.release_date
  // filteredResults.first_air_date

  console.log(
    filteredResults[0].release_date &&
      Number(filteredResults[0].release_date.slice(0, 4))
  );
  console.log(
    filteredResults[0].first_air_date &&
      Number(filteredResults[0].first_air_date.slice(0, 4))
  );

  // Short By
  if (sortBy === "popularity") {
    filteredResults.sort((a, b) => b.popularity - a.popularity);
  } else if (sortBy === "rating") {
    filteredResults.sort((a, b) => b.vote_average - a.vote_average);
  } else if (sortBy === "latest") {
    filteredResults.sort((a, b) => {
      const getYear = (item, type) => {
        if (type === "movie") {
          return item.release_date ? Number(item.release_date.slice(0, 4)) : 0;
        } else if (type === "tv") {
          return item.first_air_date
            ? Number(item.first_air_date.slice(0, 4))
            : 0;
        }
        return 0;
      };

      const yearA = getYear(a, a.media_type);
      const yearB = getYear(b, b.media_type);

      return yearB - yearA;
    });
  } else if (sortBy === "oldest") {
    filteredResults.sort((a, b) => {
      const getYear = (item, type) => {
        if (type === "movie") {
          return item.release_date ? Number(item.release_date.slice(0, 4)) : 0;
        } else if (type === "tv") {
          return item.first_air_date
            ? Number(item.first_air_date.slice(0, 4))
            : 0;
        }
        return 0;
      };

      const yearA = getYear(a, a.media_type);
      const yearB = getYear(b, b.media_type);

      return yearA - yearB;
    });
  }

  // Type
  if (type === "all") {
    filteredResults = filteredResults.filter(
      (item) => item.media_type === "movie" || item.media_type === "tv"
    );
  } else if (type === "movies") {
    filteredResults = filteredResults.filter(
      (item) => item.media_type === "movie"
    );
  } else if (type === "series") {
    filteredResults = filteredResults.filter(
      (item) => item.media_type === "tv"
    );
  }

  // Genre
  return (
    <div className={styles.container}>
      <div className={styles.resultsList}>
        {filteredResults.map((resultItem) => (
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
