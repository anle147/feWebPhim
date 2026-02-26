import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";
import Banner from "./components/Banner";
import WatchMovie from "./components/WatchMovie";

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

        <Route 
          path="/movie/:id" 
          element={<MovieDetail />} 
        />

        <Route 
          path="/watch/:id" 
          element={<WatchMovie />} 
        />
      </Routes>
    </Router>
  );
}

export default App;