import { useNavigate } from "react-router-dom";
import styles from "./ResultItem.module.css";

function ResultItem({ resultItem, dispatch }) {
  const navigate = useNavigate();

  const {
    original_title: title,
    name,
    media_type: type,
    release_date: year,
    vote_average: rating,
    poster_path: poster,
    profile_path: profile,
    id,
  } = resultItem;

  const posterFull = `http://image.tmdb.org/t/p/w500${poster || profile}`;
  const noPoster = "/no-cover.png";

  return (
    <button
      className={styles.resultItem}
      onClick={() => {
        dispatch({ type: "setSelectedItem", payload: id });
        navigate(`?details=${id}`);
      }}
    >
      <div className={styles.imageContainer}>
        <img src={poster || profile ? posterFull : noPoster} />
        <div>
          <svg
            className={styles.playBtn}
            xmlns="http://www.w3.org/2000/svg"
            width="58"
            height="58"
            fill="#eeeeee"
            viewBox="0 0 256 256"
          >
            <path d="M240,128a15.74,15.74,0,0,1-7.6,13.51L88.32,229.65a16,16,0,0,1-16.2.3A15.86,15.86,0,0,1,64,216.13V39.87a15.86,15.86,0,0,1,8.12-13.82,16,16,0,0,1,16.2.3L232.4,114.49A15.74,15.74,0,0,1,240,128Z"></path>
          </svg>
        </div>
        <span className={styles.type}>{type === "tv" ? "series" : type}</span>
      </div>
      <div className={styles.details}>
        <h3>{title ? title : name}</h3>
        <div>
          <div>
            <p className={styles.rating}>
              <svg
                baseProfile="tiny"
                height="18px"
                id="Layer_1"
                version="1.2"
                viewBox="0 0 24 24"
                width="18px"
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
              {rating ? rating.toFixed(1) : "N/A"}
            </p>
            <p className={styles.year}>{year ? year.substr(0, 4) : "N/A"}</p>
          </div>
        </div>
      </div>
    </button>
  );
}

export default ResultItem;
