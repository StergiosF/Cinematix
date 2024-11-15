import { useNavigate } from "react-router-dom";
import styles from "./SearchForm.module.css";

function SearchForm({ dispatch, userInput }) {
  const navigate = useNavigate();

  return (
    <form
      className={styles.searchForm}
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({ type: "search" });
        navigate("results");
      }}
    >
      <div>
        <input
          type="text"
          placeholder="Search movies..."
          value={userInput}
          onChange={(e) => dispatch({ type: "input", payload: e.target.value })}
        />
      </div>

      <button
        className={styles.btn}
        onClick={() => {
          dispatch({ type: "search" });
          navigate("results");
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="#fff"
          viewBox="0 5 256 256"
        >
          <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
        </svg>
      </button>

      {/* <ul>
        <li>MOVIE</li>
        <li>MOVIE</li>
        <li>MOVIE</li>
        <li>MOVIE</li>
      </ul> */}
    </form>
  );
}

export default SearchForm;
