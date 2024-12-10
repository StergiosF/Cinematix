import { useSearchParams } from "react-router-dom";
import styles from "./WatchPage.module.css";
import PageNav from "../Components/PageNav";
import { CSSTransition } from "react-transition-group";
import LoginForm from "../Components/LoginForm";
import { useEffect, useState } from "react";
import Loader from "../Components/Loader";
import TMDBEmbedPlayer from "../Components/TMDBEmbedPlayer";

function WatchPage({ dispatch, userInput, status, isLoginOpen }) {
  const [details, setDetails] = useState({});
  const [searchParams] = useSearchParams();
  const id = searchParams.get("details");
  const type = searchParams.get("type");

  useEffect(
    function () {
      async function fetchDetails() {
        const URL = `https://api.themoviedb.org/3/${type}/${id}?language=en-US`;

        const OPTIONS = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZjAzNmFkMTNmNjU0MGFhODBjZDBhMjcxYTYzYzZmMSIsIm5iZiI6MTczMjU0ODg5OS45MzI5NjA3LCJzdWIiOiI2NzMzYTFmNzMwZWUxMGFhMWI5YjIwNjgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.TjzNJC_lKEwhNbyEhlYoY7FGdkxQ1mF5ivtXMI-oyRE",
          },
        };

        try {
          setDetails({ status: "loading" });

          const delayPromise = new Promise((resolve) =>
            setTimeout(resolve, 500)
          );
          await delayPromise;

          const res = await fetch(URL, OPTIONS);

          if (!res.ok)
            throw new Error(
              `Error trying fetching ${type === "tv" ? "series" : "movie"}`
            );

          const data = await res.json();
          setDetails({
            status: "start",
            title: data.title ? data.title : data.name,
            rating: data.vote_average,
            releaseDate: data.release_date,
            firstAirDate: data.first_air_date,
            genres: data.genres,
            runtime: data.runtime,
            episodes: data.number_of_episodes,
            description: data.overview,
            backdrop: data.backdrop_path,
          });
        } catch (err) {
          console.log(err.message);
          dispatch({ type: "error", payload: err.message });
        }
      }
      fetchDetails();
    },
    [dispatch, type, id]
  );

  const image = details.backdrop && details.backdrop;

  const loginOpen = {
    opacity: "0.2",
    filter: "blur(2.8px)",
    pointerEvents: "none",
    userSelect: "none",
  };

  useEffect(
    function () {
      function handleCloseLogin(e) {
        if (e.key === "Escape" && isLoginOpen) {
          dispatch({ type: "toggleLogin" });
        }
      }

      window.addEventListener("keydown", handleCloseLogin);

      return () => {
        window.removeEventListener("keydown", handleCloseLogin);
      };
    },
    [dispatch, isLoginOpen]
  );

  return (
    <div className={styles.watchPage}>
      <div className={styles.navContainer}>
        <PageNav
          dispatch={dispatch}
          userInput={userInput}
          status={status}
          isLoginOpen={isLoginOpen}
        />
      </div>
      {details.status === "loading" && <Loader />}
      {details.status === "start" && (
        <>
          <div
            className={styles.watchSection}
            style={isLoginOpen ? loginOpen : {}}
          >
            <div
              className={styles.image}
              style={{
                background: `${
                  image
                    ? `url(https://image.tmdb.org/t/p/original/${image})`
                    : "#c20f4b"
                } `,
              }}
            >
              <div className={styles.top}></div>
              <div className={styles.left}></div>
              <div className={styles.right}></div>
              <div className={styles.bottom}></div>
            </div>
            <TMDBEmbedPlayer videoId={id} />
          </div>
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
        </>
      )}
    </div>
  );
}

export default WatchPage;
