import { useState } from "react";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import Banner from "./components/Banner";
import "./style.css";

function App() {
  const [filter, setFilter] = useState(""); // 👈 thêm dòng này

  return (
    <>
      <Header setFilter={setFilter} />   {/* truyền xuống */}
      <Banner />
      <MovieList filter={filter} />      {/* truyền xuống */}
    </>
  );
}

export default App;