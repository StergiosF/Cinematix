import styles from "./Homepage.module.css";
import Heading from "../Components/Heading";
import SearchForm from "../Components/SearchForm";
import Footer from "../Components/Footer";

function Homepage({ dispatch, userInput, status }) {
  return (
    <main className={styles.homepage}>
      <Heading dispatch={dispatch} />
      <section className={styles.section}>
        <SearchForm dispatch={dispatch} userInput={userInput} status={status} />
      </section>
      <Footer />
    </main>
  );
}

export default Homepage;
