import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Favorites.css";

function Favorites() {

  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  useEffect(() => {

    if (!userId) {
      navigate("/login");
      return;
    }

    api.get(`/movies/favorite/${userId}`)
      .then(res => setMovies(res.data))
      .catch(err => console.error(err));

  }, [userId, navigate]);

  return (

    <div className="favorites-container">

      <h2 className="favorites-title">
        PHIM ĐANG THEO DÕI
      </h2>

      <div className="favorites-grid">

        {movies.length === 0 ? (

          <div className="favorites-empty">
            Bạn chưa theo dõi phim nào
          </div>

        ) : (

          movies.map(movie => (

            <div
              key={movie.MovieID}
              className="favorites-card"
              onClick={() => navigate(`/movie/${movie.MovieID}`)}
            >

              <img
                src={movie.PosterURL}
                alt={movie.Title}
                className="favorites-poster"
              />

              <div className="favorites-info">
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

export default Favorites;