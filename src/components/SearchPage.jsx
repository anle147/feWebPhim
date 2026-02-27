import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import "./MovieList.css";

function SearchPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("keyword");

  useEffect(() => {
    if (!keyword) return;

    setLoading(true);

    api
      .get(`/movies/search?keyword=${encodeURIComponent(keyword)}`)
      .then((res) => {
        setMovies(res.data);
      })
      .catch((err) => {
        console.error("Lỗi tìm kiếm:", err);
        setMovies([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [keyword]);

  return (
    <div className="movie-container">
      <h2 className="section-title">
        KẾT QUẢ TÌM KIẾM: <span style={{ color: "#ffd700" }}>{keyword}</span>
      </h2>

      {loading && (
        <div
          style={{ marginTop: "40px", textAlign: "center", fontSize: "20px" }}
        >
          Đang tìm kiếm...
        </div>
      )}

      {!loading && movies.length === 0 && (
        <div
          style={{
            marginTop: "60px",
            textAlign: "center",
            fontSize: "28px",
            fontWeight: "bold",
            color: "#ff4d4f",
          }}
        >
          Không tìm thấy phim 
        </div>
      )}

      <div className="movie-grid">
        {movies.map((movie) => (
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
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
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

export default SearchPage;
