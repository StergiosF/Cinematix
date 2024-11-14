import { Link } from "react-router-dom";
import styles from "./LogoFull.module.css";

function LogoFull({ dispatch }) {
  return (
    <Link
      className={styles.logoFull}
      to="/"
      onClick={() => dispatch({ type: "reset" })}
    >
      <img className={styles.logo} src="/logo.png" alt="brand logo" />
      <h1>Cinematix</h1>
    </Link>
  );
}

export default LogoFull;
