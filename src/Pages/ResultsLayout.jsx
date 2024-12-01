import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import Loader from "../Components/Loader";
import ResultsList from "../Components/ResultsList";
import PageNav from "../Components/PageNav";
import SideBar from "../Components/SideBar";
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
    opacity: "0.4",
    filter: "blur(1.6px)",
    pointerEvents: "none",
    userSelect: "none",
  };

  return (
    <div className={styles.resultsLayout}>
      {isDetailsPage ? (
        <Outlet />
      ) : (
        <>
          <PageNav
            dispatch={dispatch}
            userInput={userInput}
            status={status}
            isLoginOpen={isLoginOpen}
          />
          <section style={isLoginOpen ? loginOpen : {}}>
            <SideBar />
            {status === "loading" && <Loader />}
            {status === "start" && (
              <ResultsList
                results={results}
                totalPages={totalPages}
                dispatch={dispatch}
                activePage={activePage}
              />
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
