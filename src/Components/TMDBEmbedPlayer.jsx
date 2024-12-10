import styles from "./TMDBEmbedPlayer.module.css";

const TMDBEmbedPlayer = ({
  videoId,
  season,
  episode,
  baseUrl = "http://localhost/movie_player/se_player.php",
}) => {
  // Construct the embed URL specifically for TMDB
  const buildEmbedUrl = () => {
    let url = `${baseUrl}?video_id=${videoId}&tmdb=1`;

    // Add season and episode if provided for TV shows
    if (season && episode) {
      url += `&s=${season}&e=${episode}`;
    }

    return url;
  };

  return (
    <iframe
      src={buildEmbedUrl()}
      className={styles.iframe}
      width="1024px"
      height="576px"
      allowFullScreen
      title="TMDB Stream Player"
    />
  );
};

export default TMDBEmbedPlayer;
