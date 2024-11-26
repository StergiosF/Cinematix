import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useReducer } from "react";
import Homepage from "./Pages/Homepage";
import ResultsLayout from "./Pages/ResultsLayout";
import DetailsPage from "./Pages/DetailsPage";
import ErrorPage from "./Pages/ErrorPage";
import PageNotFound from "./Pages/PageNotFound";

const initialState = {
  // Main
  results: [],
  totalPages: null,
  userInput: "",
  searched: null,
  activePage: 1,

  // Config
  status: "home",
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "reset":
      return { ...initialState };
    case "search":
      document.title = "Cinematix";
      return {
        ...state,
        searched: state.userInput,
        activePage: 1,
      };
    case "input":
      return { ...state, userInput: action.payload };
    case "clearInput":
      return { ...state, userInput: "" };
    case "completeFetch":
      return {
        ...state,
        status: "start",
        results: action.payload.results,
        totalPages: action.payload.totalPages,
        error: null,
      };
    case "setSelectedItem":
      return { ...state, selectedItem: action.payload };
    case "changePage":
      return { ...state, activePage: action.payload };
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
    { status, error, results, totalPages, userInput, searched, activePage },
    dispatch,
  ] = useReducer(reducer, initialState);

  const URL = `https://api.themoviedb.org/3/search/multi?query=${searched}&include_adult=false&page=${activePage}`;

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

          if (data.results.length <= 1) throw new Error("No results found");

          const results = data.results.filter(
            (item) => item.media_type != "person"
          );

          dispatch({
            type: "completeFetch",
            payload: {
              results: results,
              totalPages: data.total_pages <= 30 ? data.total_pages : 30,
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
              userInput={userInput}
              status={status}
              activePage={activePage}
            />
          }
        >
          <Route
            path=""
            element={
              <DetailsPage
                dispatch={dispatch}
                userInput={userInput}
                status={status}
              />
            }
          />
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
