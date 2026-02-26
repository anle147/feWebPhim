import { useState } from "react";
import "../Header.css";

function Header({ setFilter }) {   // 👈 nhận props từ App
  const [search, setSearch] = useState("");

  return (
    <header className="header">
      <div className="header-container">

        <div 
          className="logo"
          onClick={() => setFilter("")}   // 👈 click logo = tất cả
          style={{ cursor: "pointer" }}
        >
          HeyPhim
        </div>

        <nav className="nav">
          <a 
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setFilter("PhimLe");   // 👈 đúng với DB bạn
            }}
          >
            Phim lẻ
          </a>

          <a 
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setFilter("PhimBo");   // 👈 nếu DB có PhimBo
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
            />
            <button>🔍</button>
          </div>

          <button className="register-btn">Đăng ký</button>
        </div>

      </div>
    </header>
  );
}

export default Header;