import { useEffect, useState } from "react";
import api from "../services/api";
import "./MovieList.css";
import { useNavigate, useLocation } from "react-router-dom";

function MovieList({ filter }) {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // 👇 Lấy search param từ URL
  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get("search");

  useEffect(() => {
    let url = "/movies";

    if (search) {
      url = `/movies/search?keyword=${search}`;
    } 
    else if (filter) {
      url = `/movies?type=${filter}`;
    }

    api.get(url)
      .then(res => setMovies(res.data))
      .catch(err => console.error(err));

  }, [filter, search]); // 👈 thêm search vào dependency

  return (
    <div className="movie-container">
      <h2 className="section-title">
        {search
          ? `KẾT QUẢ TÌM KIẾM: ${search}`
          : filter === "PhimLe"
          ? "PHIM LẺ"
          : filter === "PhimBo"
          ? "PHIM BỘ"
          : "TẤT CẢ PHIM"}
      </h2>

      <div className="movie-grid">
  {movies.length === 0 ? (
    <div
      style={{
        gridColumn: "1 / -1",
        textAlign: "center",
        marginTop: "80px",
        fontSize: "28px",
        fontWeight: "600",
        color: "#ffffff",
        opacity: 0.85,
      }}
    >
      Không tìm thấy phim 
    </div>
  ) : (
    movies.map((movie) => (
      <div
        key={movie.MovieID}
        className="movie-card"
        onClick={() => navigate(`/movie/${movie.MovieID}`)}
        style={{
          cursor: "pointer",
          transition: "transform 0.3s",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.transform = "scale(1.05)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.transform = "scale(1)")
        }
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
    ))
  )}
</div>
    </div>
  );
}

export default MovieList;