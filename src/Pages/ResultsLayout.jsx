import {
  Outlet,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Loader from "../Components/Loader";
import ResultsList from "../Components/ResultsList";
import PageNav from "../Components/PageNav";
import SideBar from "../Components/SideBar";
import styles from "./ResultsLayout.module.css";
import { useEffect } from "react";

function ResultsLayout({ results, totalPages, dispatch, userInput, status }) {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("search") || "";
    if (searchQuery) {
      dispatch({ type: "input", payload: searchQuery });
      dispatch({ type: "search" });
    }
  }, [location.search, dispatch]);

  const detailsId = searchParams.get("details");
  const isDetailsPage = !!detailsId;

  return (
    <div className={styles.resultsLayout}>
      {isDetailsPage ? (
        <Outlet />
      ) : (
        <>
          <PageNav dispatch={dispatch} userInput={userInput} status={status} />
          <section>
            <SideBar />
            {status === "loading" && <Loader />}
            {status === "start" && (
              <ResultsList
                results={results}
                totalPages={totalPages}
                dispatch={dispatch}
              />
            )}
          </section>
        </>
      )}
    </div>
  );
}

export default ResultsLayout;
