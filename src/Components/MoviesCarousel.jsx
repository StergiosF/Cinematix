import styles from "./MoviesCarousel.module.css";

function MoviesCarousel({ carouselData }) {
  const carouselDataFiltered =
    carouselData &&
    carouselData.sort((a, b) => b.popularity - a.popularity).slice(0, 5);

  // console.log(carouselDataFiltered);

  const carouselImages = carouselDataFiltered.map(
    (movie) => movie.backdrop_path
  );

  const mainCarouselMovie = 0;

  return (
    <div className={styles.carouselImages}>
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
  );
}

export default MoviesCarousel;
