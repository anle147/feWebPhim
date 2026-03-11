import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import "./ActorMovies.css";

function ActorMovies() {

  const { actorId } = useParams();
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);

  useEffect(() => {

    const fetchMovies = async () => {

      try {

        const res = await api.get(`/movies/actor/${actorId}`);
        setMovies(res.data);

      } catch (error) {
        console.error(error);
      }

    };

    fetchMovies();

  }, [actorId]);


  return (

    <div className="actor-movies">

      <h2>Phim của diễn viên</h2>

      <div className="movie-grid">

        {movies.map(movie => (

          <div
            key={movie.MovieID}
            className="movie-card"
            onClick={() => navigate(`/movie/${movie.MovieID}`)}
          >

            <img
              src={movie.PosterURL}
              alt={movie.Title}
            />

            <p className="movie-title">
              {movie.Title}
            </p>

          </div>

        ))}

      </div>

    </div>

  );

}

export default ActorMovies;