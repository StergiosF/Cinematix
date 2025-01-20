import { useEffect, useState } from "react";
import PageNav from "../Components/PageNav";
import styles from "./MoviesPage.module.css";
import { Outlet } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import LoginForm from "../Components/LoginForm";
import Loader from "../Components/Loader";
import MoviesCarousel from "../Components/MoviesCarousel";

function MoviesPage({ dispatch, userInput, status, isLoginOpen }) {
  const [moviesStatus, setMoviesStatus] = useState({ status: "loading" });
  const [carouselData, setCarouselData] = useState();

  useEffect(() => {
    dispatch({ type: "clearInput" });
  }, [dispatch]);

  const isDetailsPage = false;

  const trendingMoviesURL = `https://api.themoviedb.org/3/trending/movie/day?language=en-US`;

  useEffect(
    function () {
      async function fetchMovies() {
        const OPTIONS = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZjAzNmFkMTNmNjU0MGFhODBjZDBhMjcxYTYzYzZmMSIsIm5iZiI6MTczMTYwMjQ1OC40MTY1OTcsInN1YiI6IjY3MzNhMWY3MzBlZTEwYWExYjliMjA2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VjFmW107DucP43op9g-jadmCJH4nnUFmkhiICWGm8LQ",
          },
        };

        try {
          setMoviesStatus({ status: "loading" });
          const delayPromise = new Promise((resolve) =>
            setTimeout(resolve, 500)
          );
          await delayPromise;

          const res = await fetch(trendingMoviesURL, OPTIONS);

          if (!res.ok) throw new Error("Error trying fetching results");

          const data = await res.json();

          setCarouselData(data.results);
          setMoviesStatus({ status: "start" });
        } catch (err) {
          dispatch({ type: "error", payload: err.message });
        }
      }
      fetchMovies();
    },
    [dispatch, setMoviesStatus, trendingMoviesURL]
  );

  const loginOpen = {
    opacity: "0.2",
    filter: "blur(2.8px)",
    pointerEvents: "none",
    userSelect: "none",
  };

  return (
    <div className={styles.moviesPage}>
      {isDetailsPage ? (
        <Outlet />
      ) : (
        <>
          <div className={styles.navContainer}>
            <PageNav
              dispatch={dispatch}
              userInput={userInput}
              status={status}
              isLoginOpen={isLoginOpen}
            />
          </div>

          {/*  Trending now movies carousel */}
          {/*  Latest movies */}
          {/*  Top rated movies */}
          {/*  Upcoming movies */}

          <section style={isLoginOpen ? loginOpen : {}}>
            {moviesStatus.status === "loading" && <Loader />}
            {moviesStatus.status === "start" && (
              <>
                <MoviesCarousel carouselData={carouselData} />
              </>
            )}
          </section>
        </>
      )}
      <CSSTransition
        in={isLoginOpen}
        timeout={200}
        classNames={{
          enter: styles.fadeEnter,
          enterActive: styles.fadeEnterActive,
          exit: styles.fadeExit,
          exitActive: styles.fadeExitActive,
        }}
        unmountOnExit
      >
        <LoginForm isLoginOpen={isLoginOpen} dispatch={dispatch} />
      </CSSTransition>
    </div>
  );
}

export default MoviesPage;
