import { useEffect } from "react";
import PageNav from "../Components/PageNav";
import styles from "./SeriesPage.module.css";
import { Outlet } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import LoginForm from "../Components/LoginForm";
import Loader from "../Components/Loader";

function SeriesPage({ dispatch, userInput, status, isLoginOpen }) {
  useEffect(() => {
    dispatch({ type: "clearInput" });
  }, [dispatch]);

  const isDetailsPage = false;

  const loginOpen = {
    opacity: "0.2",
    filter: "blur(2.8px)",
    pointerEvents: "none",
    userSelect: "none",
  };
  return (
    <div className={styles.seriesPage}>
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
                {/*  Top movies carousel */}
                {/*  Popular movies */}
                {/*  Top rated movies */}
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

export default SeriesPage;
