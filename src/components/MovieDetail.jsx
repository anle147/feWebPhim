import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import "./MovieDetail.css";

function MovieDetail() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [actors, setActors] = useState([]);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");

  const [showTrailer, setShowTrailer] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5;

  const indexOfLast = currentPage * commentsPerPage;
  const indexOfFirst = indexOfLast - commentsPerPage;
  const currentComments = comments.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(comments.length / commentsPerPage);

  // load data
  useEffect(() => {

    const fetchData = async () => {

      try {

        const movieRes = await api.get(`/movies/${id}`);
        setMovie(movieRes.data);

        const actorRes = await api.get(`/movies/${id}/actors`);
        setActors(actorRes.data);

        const commentRes = await api.get(`/movies/${id}/comments`);
        setComments(commentRes.data);

      } catch (error) {
        console.error(error);
      }

    };

    fetchData();

  }, [id]);


  // check favorite
  useEffect(() => {

    if (!token || !userId) {
      setIsFavorite(false);
      return;
    }

    api.get(`/movies/favorite/${userId}`)
      .then(res => {

        const found = res.data.find(
          m => m.MovieID === Number(id)
        );

        setIsFavorite(!!found);

      })
      .catch(err => console.error(err));

  }, [id, token, userId]);


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


  // gửi comment
  const handleComment = async () => {

    if (!token || !userId) {
      alert("Vui lòng đăng nhập để bình luận");
      navigate("/login");
      return;
    }

    if (!content.trim()) return;

    try {

      await api.post(`/movies/${id}/comments`, {
        userId: Number(userId),
        content: content
      });

      const res = await api.get(`/movies/${id}/comments`);
      setComments(res.data);

      setCurrentPage(1); // quay về trang đầu
      setContent("");

    } catch (error) {
      console.error(error);
    }

  };


  const getEmbedUrl = (videoId) => {
    if (!videoId) return "";
    return `https://www.youtube.com/embed/${videoId}`;
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
                />

              </div>

            )}


            {/* ACTORS */}
            {actors.length > 0 && (

              <div className="actors">

                <h3>Diễn viên</h3>

                <div className="actor-list">

                  {actors.map(actor => (

                    <div
                      key={actor.ActorID}
                      className="actor-item"
                      onClick={() => navigate(`/actor/${actor.ActorID}`)}
                    >

                      <img
                        src={actor.AvatarURL}
                        alt={actor.ActorName}
                      />

                      <p className="actor-name">
                        {actor.ActorName}
                      </p>

                      <span className="actor-role">
                        {actor.RoleName}
                      </span>

                    </div>

                  ))}

                </div>

              </div>

            )}


            {/* COMMENTS */}
            <div className="comments">

              <h3>Bình luận</h3>

              <div className="comment-input">

                <textarea
                  placeholder="Viết bình luận..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />

                <button onClick={handleComment}>
                  Gửi
                </button>

              </div>


              <div className="comment-list">

                {currentComments.map(c => (

                  <div key={c.CommentID} className="comment-item">

                    <div className="comment-user">
                      {c.Username}
                    </div>

                    <div className="comment-content">
                      {c.Content}
                    </div>

                    <div className="comment-date">
                      {new Date(c.CreatedAt).toLocaleString()}
                    </div>

                  </div>

                ))}

              </div>


              {/* PAGINATION */}
              {totalPages > 1 && (

                <div className="pagination">

                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    Prev
                  </button>

                  <span>
                    Trang {currentPage} / {totalPages}
                  </span>

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next
                  </button>

                </div>

              )}

            </div>


          </div>

        </div>

      </div>

    </div>

  );

}

export default MovieDetail;