// src/components/Header.jsx

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../Header.css";

function Header({ setFilter }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); // 👈 quan trọng để re-render khi route đổi

  // 👇 đọc localStorage mỗi lần route thay đổi
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
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
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
            <button onClick={handleSearch}>🔍</button>
          </div>

          {/* 👇 Nếu có token = đã đăng nhập */}
          {token ? (
            <>
              <span className="welcome-text">
                Xin chào {username} 👋
              </span>

              <button
                className="register-btn"
                onClick={handleLogout}
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <>

              <button
                className="register-btn"
                onClick={() => navigate("/register")}
              >
                Đăng ký
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;