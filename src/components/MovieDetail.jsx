import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import "./MovieDetail.css";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    api.get(`/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.error(err));
  }, [id]);

  // Tạo link embed từ YouTube video ID
  const getEmbedUrl = (videoId) => {
    if (!videoId) return "";
    return `https://www.youtube.com/embed/${videoId}`;
  };

  if (!movie) return <div className="loading">Loading...</div>;

  return (
    <div
      className="movie-detail"
      style={{
        backgroundImage: `url(${movie.PosterURL})`
      }}
    >
      <div className="overlay">
        <div className="detail-container">

          {/* Poster */}
          <div className="poster">
            <img src={movie.PosterURL} alt={movie.Title} />
          </div>

          {/* Info */}
          <div className="info">
            <h1 className="title">{movie.Title}</h1>

            <div className="meta">
              <span>{movie.ReleaseYear}</span>
              <span>{movie.Duration} phút</span>
              <span>{movie.Country}</span>
            </div>

            <p className="description">
              {movie.Description}
            </p>

            <div className="buttons">
              <button className="btn-play">▶ Xem phim</button>

              {movie.TrailerURL && (
                <button
                  className="btn-trailer"
                  onClick={() => setShowTrailer(!showTrailer)}
                >
                  {showTrailer ? "Ẩn Trailer" : "Trailer"}
                </button>
              )}
            </div>

            {/* Trailer */}
            {showTrailer && movie.TrailerURL && (
              <div className="trailer">
                <iframe
                  width="100%"
                  height="400"
                  src={getEmbedUrl(movie.TrailerURL)}
                  title="Trailer"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;