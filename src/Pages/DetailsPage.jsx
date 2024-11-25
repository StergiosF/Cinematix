import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./DetailsPage.module.css";
import PageNav from "../Components/PageNav";
import Loader from "../Components/Loader";

function DetailsPage({ dispatch, userInput, status }) {
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
          // dispatch({ type: "loading" });
          setDetails({ status: "loading" });

          const delayPromise = new Promise((resolve) =>
            setTimeout(resolve, 500)
          );
          await delayPromise;

          const res = await fetch(URL, OPTIONS);

          if (!res.ok) throw new Error("Error trying fetching details");

          const data = await res.json();
          console.log(data);
          setDetails({
            status: "start",
            title: data.original_title
              ? data.original_title
              : data.original_name,
            rating: data.vote_average,
            releaseDate: data.release_date,
            firstAirDate: data.first_air_date,
            genres: data.genres,
            runtime: data.runtime,
            description: data.overview,
            poster: data.backdrop_path
              ? data.backdrop_path
              : data.belongs_to_collection.backdrop_path,
            profile: data.profile_path,
          });
          document.title = `${
            data.original_title ? data.original_title : data.original_name
          } - Cinematix`;
        } catch (err) {
          dispatch({ type: "error", payload: err.message });
        }
      }
      fetchDetails();
    },
    [dispatch, type, id]
  );

  const backImage = `https://image.tmdb.org/t/p/original/${
    details.poster || details.profile
  }`;

  const noImage = "";

  return (
    <>
      <PageNav dispatch={dispatch} userInput={userInput} status={status} />
      <div className={styles.detailsSection}>
        {details.status === "loading" && <Loader />}
        {details.status === "start" && (
          <>
            <div
              className={styles.image}
              style={{
                backgroundImage: `url(${backImage ? backImage : noImage})`,
              }}
            >
              <div className={styles.top}></div>
              <div className={styles.left}></div>
              <div className={styles.right}></div>
              <div className={styles.bottom}></div>
            </div>
            <div className={styles.details}>
              <h1 className={styles.title}>{details.title}</h1>
              <div className={styles.microInfo}>
                <p className={styles.rating}>
                  <svg
                    baseProfile="tiny"
                    height="22px"
                    id="Layer_1"
                    version="1.2"
                    viewBox="0 0 26 26"
                    width="22px"
                    xmlSpace="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="gold"
                  >
                    <g>
                      <g>
                        <path d="M9.362,9.158c0,0-3.16,0.35-5.268,0.584c-0.19,0.023-0.358,0.15-0.421,0.343s0,0.394,0.14,0.521    c1.566,1.429,3.919,3.569,3.919,3.569c-0.002,0-0.646,3.113-1.074,5.19c-0.036,0.188,0.032,0.387,0.196,0.506    c0.163,0.119,0.373,0.121,0.538,0.028c1.844-1.048,4.606-2.624,4.606-2.624s2.763,1.576,4.604,2.625    c0.168,0.092,0.378,0.09,0.541-0.029c0.164-0.119,0.232-0.318,0.195-0.505c-0.428-2.078-1.071-5.191-1.071-5.191    s2.353-2.14,3.919-3.566c0.14-0.131,0.202-0.332,0.14-0.524s-0.23-0.319-0.42-0.341c-2.108-0.236-5.269-0.586-5.269-0.586    s-1.31-2.898-2.183-4.83c-0.082-0.173-0.254-0.294-0.456-0.294s-0.375,0.122-0.453,0.294C10.671,6.26,9.362,9.158,9.362,9.158z" />
                      </g>
                    </g>
                  </svg>
                  {details.rating ? details.rating.toFixed(1) : 0}/10
                </p>
                <div>
                  <p className={styles.year}>
                    {type === "movie" &&
                      (details.releaseDate
                        ? details.releaseDate.slice(0, 4)
                        : "N/A")}
                    {type === "tv" &&
                      (details.firstAirDate
                        ? details.firstAirDate.slice(0, 4)
                        : "N/A")}
                  </p>
                  <span>&#x2022;</span>
                  <p className={styles.categories}>
                    {details.genres &&
                      details.genres.map((genre) => genre.name).join(", ")}
                  </p>
                  <span>&#x2022;</span>
                  <p className={styles.time}>
                    {Math.floor(details.runtime / 60)}h {details.runtime % 60}m
                  </p>
                </div>
              </div>
              <div className={styles.descriptionContainer}>
                <p className={styles.description}>{details.description}</p>
                <div className={styles.cast}></div>
              </div>
              <div className={styles.btnContainer}>
                <button className={styles.btnPlay}>Watch Now</button>
                <button className={styles.btnWishlist}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="16 16 216 216"
                  >
                    <path d="M228,128a12,12,0,0,1-12,12H140v76a12,12,0,0,1-24,0V140H40a12,12,0,0,1,0-24h76V40a12,12,0,0,1,24,0v76h76A12,12,0,0,1,228,128Z"></path>
                  </svg>
                  My Wishlist
                </button>
                <button className={styles.btnShare}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 256 256"
                  >
                    <path d="M237.66,117.66l-80,80A8,8,0,0,1,144,192V152.23c-57.1,3.24-96.25,40.27-107.24,52h0a12,12,0,0,1-20.68-9.58c3.71-32.26,21.38-63.29,49.76-87.37,23.57-20,52.22-32.69,78.16-34.91V32a8,8,0,0,1,13.66-5.66l80,80A8,8,0,0,1,237.66,117.66Z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default DetailsPage;
