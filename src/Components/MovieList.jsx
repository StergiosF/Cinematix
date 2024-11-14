import Movie from "./Movie";
import styles from "./MovieList.module.css";

function MovieList({ movies }) {
  return (
    <div className={styles.movieList}>
      {movies.map((movie) => (
        <Movie movie={movie} key={movie.id} />
      ))}
    </div>
  );
}

export default MovieList;
