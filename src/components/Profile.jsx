import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    api
      .get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        navigate("/login");
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  if (!user) {
    return (
      <div className="profile">
        <div className="profile-card">
          <h2>Đang tải...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="profile">
      <div className="profile-card">
        <h2>Trang Tài Khoản</h2>
        <p>
          <strong>Tên đăng nhập:</strong> {user.Username}
        </p>

        <p>
          <strong>Email:</strong> {user.Email || "Chưa cập nhật"}
        </p>

        <p>
          <strong>Số dư:</strong>{" "}
          <span className="balance">
            {user.Balance?.toLocaleString("vi-VN")} đ
          </span>
        </p>

        <p>
          <strong>Ngày tạo:</strong>{" "}
          {new Date(user.CreatedAt).toLocaleDateString("vi-VN")}
        </p>

        <button onClick={handleLogout}>Đăng xuất</button>
      </div>
    </div>
  );
}

export default Profile;