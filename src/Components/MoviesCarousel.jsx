import { useCallback, useEffect, useState } from "react";
import styles from "./MoviesCarousel.module.css";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

function MoviesCarousel({ carouselData }) {
  const [mainCarouselMovie, setMainCarouselMovie] = useState(0);

  const carouselDataFiltered =
    carouselData &&
    carouselData.sort((a, b) => b.popularity - a.popularity).slice(0, 5);

  // console.log(carouselDataFiltered);

  const carouselImages = carouselDataFiltered.map(
    (movie) => movie.backdrop_path
  );

  const handleNextMovie = useCallback(() => {
    setMainCarouselMovie(
      (prevMovie) => (prevMovie + 1) % carouselImages.length
    );
  }, [carouselImages.length]);

  function handlePrevMovie() {
    if (mainCarouselMovie > 0) {
      setMainCarouselMovie((mainCarouselMovie) => mainCarouselMovie - 1);
    } else {
      setMainCarouselMovie(carouselImages.length - 1);
    }
  }

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     handleNextMovie();
  //   }, 4500);

  //   return () => clearInterval(interval);
  // }, [handleNextMovie]);

  return (
    <div className={styles.carousel}>
      <button
        className={`${styles.carouselBtn} ${styles.leftSide}`}
        onClick={() => handlePrevMovie()}
      >
        <CaretLeft className={styles.caretIcon} size={28} weight="fill" />
      </button>
      <button
        className={`${styles.carouselBtn} ${styles.rightSide}`}
        onClick={() => handleNextMovie()}
      >
        <CaretRight className={styles.caretIcon} size={28} weight="fill" />
      </button>
      <div className={styles.textContainer}></div>
      <div className={styles.imageContainer}>
        <div className={styles.top}></div>
        <div className={styles.left}></div>
        <div className={styles.right}></div>
        <div className={styles.bottom}></div>
        {carouselImages.map((image, i) => {
          let className = "";
          if (i === mainCarouselMovie) {
            className = styles.active;
          } else if (
            i ===
            (mainCarouselMovie - 1 + carouselImages.length) %
              carouselImages.length
          ) {
            className = styles.prev;
          }
          return (
            <img
              src={`https://image.tmdb.org/t/p/original${image}`}
              alt="Movie Preview"
              key={image}
              className={className}
            />
          );
        })}
      </div>
    </div>
  );
}

export default MoviesCarousel;
