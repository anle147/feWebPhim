import { useEffect, useState } from "react";
import api from "../services/api";
import "./MovieList.css";
import { useNavigate } from "react-router-dom";

function MovieList({ filter }) {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate(); // 👈 thêm dòng này

  useEffect(() => {
    let url = "/movies";

    if (filter) {
      url += `?type=${filter}`;
    }

    api.get(url)
      .then(res => setMovies(res.data))
      .catch(err => console.error(err));

  }, [filter]);

  return (
    <div className="movie-container">
      <h2 className="section-title">
        {filter === "PhimLe"
          ? "PHIM LẺ"
          : filter === "PhimBo"
          ? "PHIM BỘ"
          : "TẤT CẢ PHIM"}
      </h2>

      <div className="movie-grid">
        {movies.map(movie => (
          <div
            key={movie.MovieID}
            className="movie-card"
            onClick={() => navigate(`/movie/${movie.MovieID}`)}  // 👈 click chuyển trang
            style={{ cursor: "pointer" }}
          >
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