import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const u = username.trim();
    const em = email.trim();
    const p = password.trim();
    const cp = confirmPassword.trim();

    if (!u || !em || !p || !cp) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (p !== cp) {
      setError("Mật khẩu nhập lại không khớp");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/register", {
        username: u,
        password: p,
        email: em,
      });

      setSuccess(res.data.message);

      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
      navigate("/login");
      }, 3000);

    } catch (err) {
      setError(err.response?.data?.message || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <form onSubmit={handleSubmit} className="register-form">
        <h2 className="register-title">Đăng Ký Tài Khoản</h2>

        <input
          type="text"
          placeholder="Tên đăng nhập"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="register-input"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="register-input"
        />

        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="register-input"
        />

        <input
          type="password"
          placeholder="Nhập lại mật khẩu"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="register-input"
        />

        {error && <p className="register-error">{error}</p>}
        {success && <p className="register-success">{success}</p>}

        <button type="submit" className="register-button" disabled={loading}>
          {loading ? "Đang xử lý..." : "Đăng Ký"}
        </button>

        {/* 👇 Thêm phần chuyển sang đăng nhập */}
        <p className="register-login-text">
          Đã có tài khoản?{" "}
          <span
            className="register-login-link"
            onClick={() => navigate("/login")}
          >
            Đăng nhập
          </span>
        </p>
      </form>
    </div>
  );
}

export default Register;