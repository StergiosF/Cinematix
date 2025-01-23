import { useState } from "react";
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

  return (
    <div className={styles.carousel}>
      <div className={styles.top}></div>
      <div className={styles.left}></div>
      <div className={styles.right}></div>
      <div className={styles.bottom}></div>
      <button className={`${styles.carouselBtn} ${styles.leftSide}`}>
        <CaretLeft size={28} fill="#eeee" weight="fill" />
      </button>
      <button className={`${styles.carouselBtn} ${styles.rightSide}`}>
        <CaretRight size={28} fill="#eeee" weight="fill" />
      </button>
      <div className={styles.imageContainer}>
        {carouselImages.map(
          (image, i) =>
            i === mainCarouselMovie && (
              <img
                src={`https://image.tmdb.org/t/p/original${image}`}
                alt="Movie Preview"
                key={image}
              />
            )
        )}
      </div>
    </div>
  );
}

export default MoviesCarousel;
