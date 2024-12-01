import styles from "./SideBar.module.css";

function SideBar() {
  return (
    <div className={styles.sideBar}>
      {/* Short By */}
      {/* Popularity */}
      {/* Genre */}
      {/* Movies */}
      <div>
        <p>Short By</p>
        <form>
          <input type="radio" id="popularity" value="Popularity" />
          <label htmlFor="popularity">Popularity</label>
          <input type="radio" id="genre" value="Genre" />
          <label htmlFor="genre">Genre</label>
          <input type="radio" id="movies" value="Movies" />
          <label htmlFor="movies">Movies</label>
          <input type="radio" id="series" value="Series" />
          <label htmlFor="series">Series</label>
        </form>
      </div>
    </div>
  );
}

export default SideBar;
