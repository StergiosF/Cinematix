import { NavLink, useNavigate } from "react-router-dom";
import LogoFull from "./LogoFull";
import styles from "./PageNav.module.css";
import { useEffect } from "react";

function PageNav({ dispatch, userInput, status }) {
  const navigate = useNavigate();

  useEffect(
    function () {
      if (status === "error") navigate("/error");
    },
    [navigate, status]
  );

  return (
    <nav className={styles.pageNav}>
      <LogoFull />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({ type: "search" });
          navigate(`/results?search=${encodeURIComponent(userInput)}`);
        }}
      >
        <input
          placeholder="Search movies..."
          value={userInput}
          onChange={(e) => dispatch({ type: "input", payload: e.target.value })}
        />
      </form>
      <ul>
        <li className={styles.hover}>
          <NavLink>Movies</NavLink>
        </li>
        <li className={styles.hover}>
          <NavLink>Series</NavLink>
        </li>
        <li className={styles.hover}>
          <NavLink>Watchlist</NavLink>
        </li>
        <li className={styles.loginBtn}>
          <NavLink>Login</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
