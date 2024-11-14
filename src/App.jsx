import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import ErrorPage from "./Pages/ErrorPage";
import AppLayout from "./Pages/AppLayout";
import PageNotFound from "./Pages/PageNotFound";
import { useEffect, useReducer } from "react";

const initialState = {
  movies: [],
  userInput: "",
  searched: null,

  // loading, error, start
  status: "home",
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "reset":
      return { ...initialState };
    case "search":
      return { ...state, searched: state.userInput, userInput: "" };
    case "input":
      return { ...state, userInput: action.payload };
    case "completeFetch":
      return { ...state, status: "start", movies: action.payload };
    case "loading":
      return { ...state, status: "loading" };
    case "error":
      return { ...state, status: "error", error: action.payload };
  }
}

function App() {
  const [{ status, error, movies, userInput, searched }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const URL = `https://api.themoviedb.org/3/search/multi?query=${searched}&include_adult=false&page=1`;

  useEffect(
    function () {
      async function fetchMovies() {
        const OPTIONS = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZjAzNmFkMTNmNjU0MGFhODBjZDBhMjcxYTYzYzZmMSIsIm5iZiI6MTczMTYwMjQ1OC40MTY1OTcsInN1YiI6IjY3MzNhMWY3MzBlZTEwYWExYjliMjA2OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VjFmW107DucP43op9g-jadmCJH4nnUFmkhiICWGm8LQ",
          },
        };

        try {
          if (!searched) return;

          dispatch({ type: "loading" });

          const delayPromise = new Promise((resolve) =>
            setTimeout(resolve, 500)
          );
          await delayPromise;

          const res = await fetch(URL, OPTIONS);

          if (!res.ok) throw new Error("Error trying fetching results");

          const data = await res.json();

          dispatch({ type: "completeFetch", payload: data.results });
        } catch (err) {
          dispatch({ type: "error", payload: err.message });
        }
      }
      fetchMovies();
    },
    [searched, error, URL]
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <Homepage
              status={status}
              dispatch={dispatch}
              userInput={userInput}
            />
          }
        />
        <Route
          path="app"
          element={
            <AppLayout
              movies={movies}
              dispatch={dispatch}
              status={status}
              replace
            />
          }
        />
        <Route path="error" element={<ErrorPage error={error} replace />} />
        <Route path="*" element={<PageNotFound replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
