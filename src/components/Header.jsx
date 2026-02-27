import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Header.css";

function Header({ setFilter }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

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
          <a href="#" onClick={(e) => { e.preventDefault(); handleFilter("PhimLe"); }}>
            Phim lẻ
          </a>

          <a href="#" onClick={(e) => { e.preventDefault(); handleFilter("PhimBo"); }}>
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

          <button className="register-btn">Đăng ký</button>
        </div>

      </div>
    </header>
  );
}

export default Header;