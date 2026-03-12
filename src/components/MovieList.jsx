import { useEffect, useState } from "react";
import api from "../services/api";
import "./MovieList.css";
import { useNavigate, useLocation } from "react-router-dom";

function MovieList({ filter }) {

  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // lấy keyword search từ URL
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("keyword");

  useEffect(() => {

    const fetchMovies = async () => {

      try {

        let url = "/movies";

        // tìm kiếm
        if (keyword) {

          url = `/movies/search?keyword=${keyword}`;

        }

        // lọc theo thể loại
        else if (filter && filter.startsWith("genre-")) {

          const genreId = filter.split("-")[1];
          url = `/movies/genres/${genreId}/movies`;

        }

        // phim lẻ / phim bộ
        else if (filter) {

          url = `/movies?type=${filter}`;

        }

        const res = await api.get(url);
        setMovies(res.data);

      } catch (error) {

        console.error(error);

      }

    };

    fetchMovies();

  }, [filter, keyword]);

  // tiêu đề section
  const getTitle = () => {

    if (keyword) return `KẾT QUẢ TÌM KIẾM: ${keyword}`;

    if (filter === "PhimLe") return "PHIM LẺ";

    if (filter === "PhimBo") return "PHIM BỘ";

    if (filter?.startsWith("genre-")) return "PHIM THEO THỂ LOẠI";

    return "TẤT CẢ PHIM";

  };

  return (

    <div className="movie-container">

      <h2 className="section-title">
        {getTitle()}
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