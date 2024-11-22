import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import ResultsLayout from "./Pages/ResultsLayout";
import OverviewPage from "./Pages/OverviewPage";
import ErrorPage from "./Pages/ErrorPage";
import PageNotFound from "./Pages/PageNotFound";
import { useEffect, useReducer } from "react";

const initialState = {
  results: [],
  totalPages: null,
  userInput: "",
  searched: null,

  status: "home",
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "reset":
      return { ...initialState };
    case "search":
      return {
        ...state,
        searched: state.userInput,
      };
    case "input":
      return { ...state, userInput: action.payload };
    case "completeFetch":
      return {
        ...state,
        status: "start",
        results: action.payload.results,
        totalPages: action.payload.totalPages,
        error: null,
      };
    case "loading":
      return { ...state, status: "loading" };
    case "error":
      return { ...state, status: "error", error: action.payload };
    default:
      return state;
  }
}

function App() {
  const [
    { status, error, results, totalPages, userInput, searched },
    dispatch,
  ] = useReducer(reducer, initialState);

  const URL = `https://api.themoviedb.org/3/search/multi?query=${searched}&include_adult=false&page=1`;

  useEffect(
    function () {
      async function fetchResults() {
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

          if (data.results.length <= 1) throw new Error("Movie not found");

          dispatch({
            type: "completeFetch",
            payload: {
              results: data.results,
              totalPages: data.total_pages,
              totalResults: data.total_results,
            },
          });
        } catch (err) {
          dispatch({ type: "error", payload: err.message });
        }
      }
      fetchResults();
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
              searched={searched}
            />
          }
        />
        <Route
          path="results"
          element={
            <ResultsLayout
              results={results}
              totalPages={totalPages}
              dispatch={dispatch}
              status={status}
              searched={searched}
              replace
            />
          }
        >
          <Route path=":id" element={<OverviewPage />} />
        </Route>
        <Route
          path="error"
          element={<ErrorPage error={error} dispatch={dispatch} replace />}
        />
        <Route path="*" element={<PageNotFound replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
