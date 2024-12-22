import { useState } from "react";
import styles from "./GenresList.module.css";

function GenresList({ dispatch, type, genres }) {
  const [isOpen, setIsOpen] = useState(false);

  const genresList = {
    movies: [
      { id: 28, name: "Action" },
      { id: 16, name: "Animation" },
      { id: 35, name: "Comedy" },
      { id: 80, name: "Crime" },
      { id: 99, name: "Documentary" },
      { id: 18, name: "Drama" },
      { id: 10751, name: "Family" },
      { id: 14, name: "Fantasy" },
      { id: 36, name: "History" },
      { id: 27, name: "Horror" },
      { id: 10402, name: "Music" },
      { id: 9648, name: "Mystery" },
      { id: 10749, name: "Romance" },
      { id: 878, name: "Science Fiction" },
      { id: 53, name: "Thriller" },
      { id: 10752, name: "War" },
      { id: 37, name: "Western" },
    ],

    series: [
      { id: 10759, name: "Action" },
      { id: 16, name: "Animation" },
      { id: 35, name: "Comedy" },
      { id: 80, name: "Crime" },
      { id: 99, name: "Documentary" },
      { id: 18, name: "Drama" },
      { id: 10751, name: "Family" },
      { id: 10765, name: "Fantasy" },
      { id: 9648, name: "Mystery" },
      { id: 10763, name: "News" },
      { id: 10764, name: "Reality" },
      { id: 10766, name: "Soap" },
      { id: 10767, name: "Talk" },
      { id: 10768, name: "War" },
      { id: 37, name: "Western" },
    ],
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <>
      <p>Genres</p>
      <div className={styles.dropdown}></div>
    </>
  );
}

export default GenresList;
