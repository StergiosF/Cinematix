import { useNavigate } from "react-router-dom";
import styles from "./ErrorPage.module.css";

function ErrorPage({ error, dispatch }) {
  const navigate = useNavigate();

  return (
    <div className={styles.errorPage}>
      <section>
        <div>
          <h1>{error}</h1>
          <span className={styles.loader}></span>
        </div>
        <button
          className={styles.backBtn}
          onClick={(e) => {
            e.preventDefault();
            dispatch({ type: "reset" });
            navigate("/");
          }}
        >
          Go Back
        </button>
      </section>
    </div>
  );
}

export default ErrorPage;
