import Loader from "../Components/Loader";
import ResultsList from "../Components/ResultsList";
import PageNav from "../Components/PageNav";
import SideBar from "../Components/SideBar";
import styles from "./ResultsLayout.module.css";

function ResultsLayout({ results, dispatch, userInput, status }) {
  return (
    <div className={styles.appLayout}>
      <PageNav dispatch={dispatch} userInput={userInput} />
      <section>
        <SideBar />
        {status === "loading" && <Loader />}
        {status === "start" && <ResultsList results={results} />}
      </section>
    </div>
  );
}

export default ResultsLayout;
