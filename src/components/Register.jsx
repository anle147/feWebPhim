import { useState } from "react";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!username || !password || !confirmPassword) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (password !== confirmPassword) {
      setError("Mật khẩu nhập lại không khớp");
      return;
    }

    setSuccess("Đăng ký thành công 🎉");
  };

  return (
    <div style={pageStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={titleStyle}>Đăng Ký Tài Khoản</h2>

        <input
          type="text"
          placeholder="Tên đăng nhập"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Nhập lại mật khẩu"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={inputStyle}
        />

        {error && <p style={errorStyle}>{error}</p>}
        {success && <p style={successStyle}>{success}</p>}

        <button type="submit" style={buttonStyle}>
          Đăng Ký
        </button>
      </form>
    </div>
  );
}

/* ===== STYLE ===== */

const pageStyle = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  background: "linear-gradient(135deg, #081b29, #0f2a3d)",
};

const formStyle = {
  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(10px)",
  padding: "50px",
  borderRadius: "20px",
  width: "420px",
  boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
  display: "flex",
  flexDirection: "column",
};

const titleStyle = {
  color: "#ffd700",
  textAlign: "center",
  marginBottom: "30px",
  fontSize: "26px",
  fontWeight: "600",
};

const inputStyle = {
  width: "85%",
  padding: "10px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid rgba(255,255,255,0.2)",
  background: "rgba(255,255,255,0.1)",
  color: "white",
  fontSize: "18px",   // 👈 tăng chữ lên (trước là 14px)
  outline: "none",
  alignSelf: "center",
};

const buttonStyle = {
  width: "60%",              // 👈 nhỏ lại
  padding: "14px",
  background: "linear-gradient(90deg, #ff3b3b, #ff6b6b)",
  border: "none",
  borderRadius: "30px",
  color: "white",
  fontWeight: "bold",
  fontSize: "16px",
  cursor: "pointer",
  marginTop: "15px",
  alignSelf: "center",       // 👈 cái này làm nó nằm giữa
  transition: "0.3s",
};

const errorStyle = {
  color: "#ff4d4f",
  marginBottom: "10px",
  textAlign: "center",
};

const successStyle = {
  color: "#4caf50",
  marginBottom: "10px",
  textAlign: "center",
};

export default Register;