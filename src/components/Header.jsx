// src/components/Header.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Header.css";

function Header({ setFilter }) {
  const [search, setSearch] = useState("");
  const [openMenu, setOpenMenu] = useState(false);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setOpenMenu(false);
    navigate("/");
  };

  const handleFilter = (type) => {
    navigate("/");
    setTimeout(() => {
      setFilter(type);
    }, 0);
  };

  const handleSearch = () => {
    if (!search.trim()) return;
    navigate(`/search?keyword=${search}`);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div
          className="logo"
          onClick={() => handleFilter("")}
          style={{ cursor: "pointer" }}
        >
          HeyPhim
        </div>

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
        </nav>

        <div className="right-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Tìm phim..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button onClick={handleSearch}>🔍</button>
          </div>

          {/* ===================== */}
          {/* CHƯA LOGIN */}
          {!token && (
            <>
              <button
                className="register-btn"
                onClick={() => navigate("/register")}
              >
                Đăng ký
              </button>
            </>
          )}

          {/* ===================== */}
          {/* ĐÃ LOGIN */}
          {token && (
            <div className="profile-wrapper">
              <div
                className="avatar"
                onClick={() => setOpenMenu(!openMenu)}
              >
                {username?.charAt(0).toUpperCase()}
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
                  <div>Đang theo dõi</div>
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