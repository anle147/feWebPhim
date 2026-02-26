import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";
import Banner from "./components/Banner";

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
      </Routes>
    </Router>
  );
}

export default App;