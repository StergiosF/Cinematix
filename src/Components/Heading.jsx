import styles from "./Heading.module.css";

function Heading() {
  return (
    <div className={styles.headingContainer}>
      <div>
        <div>
          <h3 className={styles.animateCharacter}>CINEMATIX</h3>
        </div>
      </div>
    </div>
  );
}

export default Heading;
