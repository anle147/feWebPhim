import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function WatchMovie() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    api.get(`/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!movie) return <p style={{color:"white"}}>Đang tải phim...</p>;

  return (
    <div className="watch-container" style={{
      padding:"40px",
      background:"#081b29",
      minHeight:"100vh"
    }}>
      <h2 style={{color:"white"}}>{movie.Title}</h2>

      <video width="100%" height="500" controls>
        <source src={movie.VideoURL} type="video/mp4" />
        Trình duyệt không hỗ trợ video
      </video>
    </div>
  );
}

export default WatchMovie;