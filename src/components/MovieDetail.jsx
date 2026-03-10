import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import "./MovieDetail.css";

function MovieDetail() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");


  // lấy thông tin phim
  useEffect(() => {

    api.get(`/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.error(err));

  }, [id]);


  // kiểm tra favorite
  useEffect(() => {

    // ❌ chưa login -> reset favorite
    if (!token || !userId) {
      setIsFavorite(false);
      return;
    }

    api.get(`/movies/favorite/${userId}`)
      .then(res => {

        const favorites = res.data;

        const found = favorites.find(
          m => m.MovieID === Number(id)
        );

        setIsFavorite(!!found);

      })
      .catch(err => console.error(err));

  }, [id, token, userId]);


  const getEmbedUrl = (videoId) => {
    if (!videoId) return "";
    return `https://www.youtube.com/embed/${videoId}`;
  };


  // toggle favorite
  const toggleFavorite = async () => {

    if (!token || !userId) {
      alert("Vui lòng đăng nhập để yêu thích phim");
      navigate("/login");
      return;
    }

    try {

      if (!isFavorite) {

        await api.post("/movies/favorite", {
          userId: Number(userId),
          movieId: movie.MovieID
        });

        setIsFavorite(true);

      } else {

        await api.delete("/movies/favorite", {
          data: {
            userId: Number(userId),
            movieId: movie.MovieID
          }
        });

        setIsFavorite(false);

      }

    } catch (error) {
      console.error(error);
    }

  };


  if (!movie) {
    return <div className="loading">Loading...</div>;
  }


  return (

    <div
      className="movie-detail"
      style={{ backgroundImage: `url(${movie.PosterURL})` }}
    >

      <div className="overlay">

        <div className="detail-container">

          <div className="poster">
            <img src={movie.PosterURL} alt={movie.Title} />
          </div>


          <div className="info">

            <h1 className="title">{movie.Title}</h1>

            <div className="meta">
              <span>{movie.ReleaseYear}</span>
              <span>{movie.Duration} phút</span>
              <span>{movie.Country}</span>
            </div>

            <p className="description">{movie.Description}</p>


            <div className="buttons">

              <button
                className="btn-play"
                onClick={() => navigate(`/watch/${movie.MovieID}`)}
              >
                ▶ Xem phim
              </button>


              <button
                className={`btn-favorite ${isFavorite ? "active" : ""}`}
                onClick={toggleFavorite}
              >
                {isFavorite ? "❤️ Bỏ yêu thích" : "🤍 Yêu thích"}
              </button>


              {movie.TrailerURL && (
                <button
                  className="btn-trailer"
                  onClick={() => setShowTrailer(!showTrailer)}
                >
                  {showTrailer ? "Ẩn Trailer" : "Trailer"}
                </button>
              )}

            </div>


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