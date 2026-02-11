import { useEffect, useState } from "react";
import api from "../services/api";
import "./MovieList.css";

function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    api.get("/movies")
      .then(res => setMovies(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="movie-container">
      <h2 className="section-title">PHIM ĐỀ CỬ</h2>

      <div className="movie-grid">
        {movies.map(movie => (
          <div key={movie.MovieID} className="movie-card">
            <img
              src={movie.PosterURL}
              alt={movie.Title}
              className="movie-poster"
            />

            <div className="movie-info">
              <h4>{movie.Title}</h4>
              <p>{movie.ReleaseYear}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieList;
