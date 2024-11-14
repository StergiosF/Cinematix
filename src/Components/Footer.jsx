import styles from "./Footer.module.css";
import Logo from "./Logo";

function Footer() {
  return (
    <footer className={styles.footer}>
      <p> &copy; Copyright {new Date().getFullYear()} by Cinematix Inc.</p>
      <Logo />
    </footer>
  );
}

export default Footer;
