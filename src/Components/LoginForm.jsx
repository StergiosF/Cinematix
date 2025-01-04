import { useEffect } from "react";
import styles from "./LoginForm.module.css";

function LoginForm({ dispatch, isLoginOpen }) {
  useEffect(
    function () {
      function handleCloseLogin(e) {
        if (e.key === "Escape" && isLoginOpen) {
          dispatch({ type: "toggleLogin" });
        }
      }

      window.addEventListener("keydown", handleCloseLogin);

      return () => {
        window.removeEventListener("keydown", handleCloseLogin);
      };
    },
    [dispatch, isLoginOpen]
  );

  return (
    <div className={styles.loginForm}>
      <button
        className={styles.closeBtn}
        onClick={(e) => {
          e.preventDefault();
          dispatch({ type: "toggleLogin" });
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 256 256"
        >
          <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
        </svg>
      </button>
      <div className={styles.titleContainer}>
        <h1>Sign In</h1>
        <p>Welcome back! Please enter your details</p>
      </div>

      <form className={styles.loginInfoContainer}>
        <div className={styles.inputContainer}>
          <div className={styles.loginInfoInput}>
            <p>Email</p>
            <input type="email" placeholder="Enter your email" required />
          </div>
          <div className={styles.loginInfoInput}>
            <p>Password</p>
            <input type="password" placeholder="Enter your password" />
          </div>
        </div>

        <div className={styles.smallInfo}>
          <div className={styles.checkContainer}>
            <input
              type="checkbox"
              id="checkbox"
              className={styles.checkbox}
              required
            />
            <label htmlFor="checkbox">Remember for 30 days</label>
          </div>
          <button className={styles.forgotBtn}>Forgot password</button>
        </div>
        <button className={styles.signInBtn}>Sign in</button>
      </form>

      <div className={styles.noAcc}>
        <p>Don&apos;t have an account?</p>
        <button>Sign up</button>
      </div>
    </div>
  );
}

export default LoginForm;
