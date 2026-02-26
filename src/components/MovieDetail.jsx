import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    api.get(`/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!movie) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "40px", color: "white" }}>
      <h1>{movie.Title}</h1>
      <img src={movie.PosterURL} width="300" />
      <p><b>Năm:</b> {movie.ReleaseYear}</p>
      <p><b>Thời lượng:</b> {movie.Duration} phút</p>
      <p><b>Quốc gia:</b> {movie.Country}</p>
      <p>{movie.Description}</p>
    </div>
  );
}

export default MovieDetail;