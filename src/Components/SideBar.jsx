import styles from "./SideBar.module.css";

function SideBar() {
  return (
    <div className={styles.sideBar}>
      <select name="short" className={`${styles.filter} ${styles.shortBy}`}>
        <option>
          <p>
            Short By
            <span> Icon</span>
          </p>
        </option>
      </select>
    </div>
  );
}

export default SideBar;
