import styles from "./SideBar.module.css";

function SideBar() {
  return (
    <div className={styles.sideBar}>
      <div className={styles.headText}>
        <p>Filters</p>
        <button>Clear All</button>
      </div>
      <div className={styles.filters}>
        <div className={styles.formContainer}>
          <p>Short By</p>
          <form>
            <label>
              <input type="radio" value="date" />
              Release Date
            </label>
            <label>
              <input type="radio" value="Series" />
              Upcoming
            </label>
            <label>
              <input type="radio" value="popularity" />
              Populariy
            </label>
            <label>
              <input type="radio" value="rating" />
              Rating
            </label>
          </form>
        </div>
        <div className={styles.formContainer}>
          <p>Type</p>
          <form>
            <label>
              <input type="radio" value="Movies" />
              Movies
            </label>
            <label>
              <input type="radio" value="Series" />
              Series
            </label>
          </form>
        </div>
        <div className={styles.formContainer}>
          <p>Genre</p>
          <form>
            <select name="genre">
              <option>Select Genre</option>
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

export default SideBar;
