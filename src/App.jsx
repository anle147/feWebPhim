import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Header from "./components/Header";
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";
import Banner from "./components/Banner";
import WatchMovie from "./components/WatchMovie";
import SearchPage from "./components/SearchPage"; // 👈 thêm trang search

function App() {
  const [filter, setFilter] = useState("");

  return (
    <Router>
      <Header setFilter={setFilter} />

      <Routes>

        {/* Trang chủ */}
        <Route 
          path="/" 
          element={
            <>
              <Banner />
              <MovieList filter={filter} />
            </>
          } 
        />

        {/* Trang tìm kiếm */}
        <Route 
          path="/search" 
          element={<SearchPage />} 
        />

        {/* Trang chi tiết */}
        <Route 
          path="/movie/:id" 
          element={<MovieDetail />} 
        />

        {/* Trang xem phim */}
        <Route 
          path="/watch/:id" 
          element={<WatchMovie />} 
        />

      </Routes>
    </Router>
  );
}

export default App;