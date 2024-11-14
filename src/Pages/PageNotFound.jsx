import { useNavigate } from "react-router-dom";
import styles from "./PageNotFound.module.css";

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className={styles.pageNotFound}>
      <section>
        <div>
          <h1>The page you are looking for can&apos;t be found.</h1>
          <span className={styles.loader}></span>
        </div>
        <button className={styles.backBtn} onClick={() => navigate("/")}>
          Go Back
        </button>
      </section>
    </div>
  );
}

export default PageNotFound;
