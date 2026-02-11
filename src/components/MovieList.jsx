import { useEffect, useState } from "react";
import api from "../services/api";

function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    api.get("/movies")
      .then(res => {
        console.log("MOVIES:", res.data);
        setMovies(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="movie-list">
      <h2>Danh sách phim</h2>

      {movies.map(movie => (
        <div key={movie.MovieID} className="movie-card">
          <h3>{movie.Title}</h3>
          <p>{movie.Description}</p>
          <p>Năm: {movie.ReleaseYear}</p>
          <p>Quốc gia: {movie.Country}</p>
        </div>
      ))}
    </div>
  );
}

export default MovieList;
