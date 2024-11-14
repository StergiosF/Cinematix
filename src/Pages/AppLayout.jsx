import Loader from "../Components/Loader";
import MovieList from "../Components/MovieList";
import PageNav from "../Components/PageNav";
import SideBar from "../Components/SideBar";
import styles from "./AppLayout.module.css";

function AppLayout({ movies, dispatch, userInput, status }) {
  return (
    <div className={styles.appLayout}>
      <PageNav dispatch={dispatch} userInput={userInput} />
      <section>
        <SideBar />
        {status === "loading" && <Loader />}
        {status === "start" && <MovieList movies={movies} />}
      </section>
    </div>
  );
}

export default AppLayout;
