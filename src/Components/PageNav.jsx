import { NavLink } from "react-router-dom";
import LogoFull from "./LogoFull";
import styles from "./PageNav.module.css";

function PageNav({ dispatch, userInput }) {
  return (
    <nav className={styles.pageNav}>
      <LogoFull />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({ type: "search" });
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
        <li className={styles.loginBtn}>
          <NavLink>Login</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
