import "./Banner.css";

function Banner() {
  return (
    <section className="banner">
      <div className="banner-overlay">
        <div className="banner-content">
          <h1>Xem phim miễn phí – Full HD – Không quảng cáo</h1>
          <p>Hàng nghìn bộ phim mới cập nhật mỗi ngày</p>
          <button className="banner-btn">
            Xem Ngay
          </button>
        </div>
      </div>
    </section>
  );
}

export default Banner;