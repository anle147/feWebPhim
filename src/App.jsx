import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Header from "./components/Header";
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";
import Banner from "./components/Banner";
import WatchMovie from "./components/WatchMovie";
import SearchPage from "./components/SearchPage";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile"; // ✅ THÊM DÒNG NÀY
import Favorites from "./components/Favorites"; // ✅ THÊM DÒNG NÀY

function App() {
  const [filter, setFilter] = useState("");

  return (
    <Router>
      <Header setFilter={setFilter} />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Banner />
              <MovieList filter={filter} />
            </>
          }
        />

        <Route path="/search" element={<SearchPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} /> {/* ✅ THÊM DÒNG NÀY */}
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/watch/:id" element={<WatchMovie />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
}

export default App;