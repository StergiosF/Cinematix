import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import Loader from "../Components/Loader";
import ResultsList from "../Components/ResultsList";
import PageNav from "../Components/PageNav";
import Sidebar from "../Components/Sidebar";
import styles from "./ResultsLayout.module.css";
import { useEffect } from "react";
import LoginForm from "../Components/LoginForm";
import { CSSTransition } from "react-transition-group";

function ResultsLayout({
  results,
  totalPages,
  dispatch,
  userInput,
  status,
  activePage,
  isLoginOpen,
  sortBy,
  type,
  genres,
}) {
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

  const loginOpen = {
    opacity: "0.2",
    filter: "blur(2.8px)",
    pointerEvents: "none",
    userSelect: "none",
  };

  return (
    <div className={styles.resultsLayout}>
      {isDetailsPage ? (
        <Outlet />
      ) : (
        <>
          <div className={styles.navContainer}>
            <PageNav
              dispatch={dispatch}
              userInput={userInput}
              status={status}
              isLoginOpen={isLoginOpen}
            />
          </div>
          <section style={isLoginOpen ? loginOpen : {}}>
            {status === "loading" && <Loader />}
            {status === "start" && (
              <>
                <Sidebar
                  dispatch={dispatch}
                  sortBy={sortBy}
                  type={type}
                  genres={genres}
                />
                <ResultsList
                  results={results}
                  totalPages={totalPages}
                  dispatch={dispatch}
                  activePage={activePage}
                  sortBy={sortBy}
                  type={type}
                  genres={genres}
                />
              </>
            )}
          </section>
        </>
      )}
      <CSSTransition
        in={isLoginOpen}
        timeout={200}
        classNames={{
          enter: styles.fadeEnter,
          enterActive: styles.fadeEnterActive,
          exit: styles.fadeExit,
          exitActive: styles.fadeExitActive,
        }}
        unmountOnExit
      >
        <LoginForm isLoginOpen={isLoginOpen} dispatch={dispatch} />
      </CSSTransition>
    </div>
  );
}

export default ResultsLayout;
