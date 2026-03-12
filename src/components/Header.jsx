// src/components/Header.jsx

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Header.css";

function Header({ setFilter }) {

  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const [openGenres, setOpenGenres] = useState(false);
  const [genres, setGenres] = useState([]);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  // =========================
  // lấy danh sách thể loại
  useEffect(() => {
    const fetchGenres = async () => {
      try {

        const res = await axios.get(
          "http://localhost:5000/api/movies/genres"
        );

        setGenres(res.data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchGenres();
  }, []);

  // =========================
  // logout
  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");

    setOpenMenu(false);

    navigate("/");
  };

  // =========================
  const handleFilter = (type) => {

    navigate("/");

    setTimeout(() => {
      setFilter(type);
    }, 0);
  };

  // =========================
  const handleSearch = () => {

    if (!search.trim()) return;

    navigate(`/search?keyword=${search}`);
  };

  // =========================
  return (

    <header className="header">

      <div className="header-container">

        {/* LOGO */}
        <div
          className="logo"
          onClick={() => handleFilter("")}
          style={{ cursor: "pointer" }}
        >
          HeyPhim
        </div>

        {/* NAV */}
        <nav className="nav">

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleFilter("PhimLe");
            }}
          >
            Phim lẻ
          </a>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleFilter("PhimBo");
            }}
          >
            Phim bộ
          </a>

          {/* ================= GENRES ================= */}

          <div className="genre-menu">

            <span
              onClick={() => setOpenGenres(!openGenres)}
            >
              Thể loại ▾
            </span>

            {openGenres && (

              <div className="genre-dropdown">

                {genres.map((genre) => (

                  <div
                    key={genre.GenreID}
                    onClick={() => {

                      navigate(`/genre/${genre.GenreID}`);
                      setOpenGenres(false);

                    }}
                  >
                    {genre.GenreName}
                  </div>

                ))}

              </div>

            )}

          </div>

        </nav>

        {/* RIGHT */}
        <div className="right-section">

          {/* SEARCH */}
          <div className="search-box">

            <input
              type="text"
              placeholder="Tìm phim..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />

            <button onClick={handleSearch}>
              🔍
            </button>

          </div>

          {/* ===================== */}
          {/* CHƯA LOGIN */}

          {!token && (

            <button
              className="register-btn"
              onClick={() => navigate("/register")}
            >
              Đăng ký
            </button>

          )}

          {/* ===================== */}
          {/* ĐÃ LOGIN */}

          {token && (

            <div className="profile-wrapper">

              <div
                className="avatar"
                onClick={() => setOpenMenu(!openMenu)}
              >
                {username
                  ? username.charAt(0).toUpperCase()
                  : "U"}
              </div>

              {openMenu && (

                <div className="profile-dropdown">

                  <div
                    onClick={() => {
                      setOpenMenu(false);
                      navigate("/profile");
                    }}
                  >
                    Tài khoản
                  </div>

                  <div>Donate</div>

                  <div
                    onClick={() => {
                      setOpenMenu(false);
                      navigate("/favorites");
                    }}
                  >
                    Đang theo dõi
                  </div>

                  <div>Bộ sưu tập</div>

                  <div
                    className="logout-item"
                    onClick={handleLogout}
                  >
                    Thoát
                  </div>

                </div>

              )}

            </div>

          )}

        </div>

      </div>

    </header>

  );
}

export default Header;