import styles from "./Sidebar.module.css";

function Sidebar({ dispatch, sortBy, type, genre }) {
  return (
    <div className={styles.sideBar}>
      <div className={styles.headText}>
        <p>Filters</p>
        <button onClick={() => dispatch({ type: "clearFilters" })}>
          Clear All
        </button>
      </div>
      <div className={styles.filters}>
        <div className={styles.formContainer}>
          <p>Sort By</p>
          <form
            onChange={(e) =>
              dispatch({ type: "changeSortBy", payload: e.target.value })
            }
          >
            <label>
              <input
                type="radio"
                name="radio"
                value="popularity"
                checked={sortBy === "popularity"}
              />
              Populariy
            </label>
            <label>
              <input
                type="radio"
                name="radio"
                value="rating"
                checked={sortBy === "rating"}
              />
              Rating
            </label>
            <label>
              <input
                type="radio"
                name="radio"
                value="latest"
                checked={sortBy === "latest"}
              />
              Latest
            </label>
            <label>
              <input
                type="radio"
                name="radio"
                value="oldest"
                checked={sortBy === "oldest"}
              />
              Oldest
            </label>
          </form>
        </div>
        <div className={styles.formContainer}>
          <p>Type</p>
          <form
            onChange={(e) =>
              dispatch({ type: "changeType", payload: e.target.value })
            }
          >
            <label>
              <input
                type="radio"
                name="radio"
                value="all"
                checked={type === "all"}
              />
              All
            </label>
            <label>
              <input
                type="radio"
                name="radio"
                value="movies"
                checked={type === "movies"}
              />
              Movies
            </label>
            <label>
              <input
                type="radio"
                name="radio"
                value="series"
                checked={type === "series"}
              />
              Series
            </label>
          </form>
        </div>
        <div className={styles.formContainer}>
          <p>Genre</p>
          <form
            onChange={(e) =>
              dispatch({ type: "changeGenre", payload: e.target.value })
            }
          >
            <select name="genre">
              <option value="">Select Genre</option>
              <option value="adventure">Adventure</option>
              <option value="fantasy">Fantasy</option>
              <option value="action">Action</option>
              <option value="comedy">Comedy</option>
              <option value="drama">Drama</option>
              <option value="thriller">Thriller</option>
              <option value="horror">Horror</option>
              <option value="romantic">Romantic</option>
              <option value="family">Family</option>
              <option value="animation">Animation</option>
              <option value="musical">Musical</option>
              <option value="documentary">Documentary</option>
              <option value="educational">Educational</option>
            </select>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
