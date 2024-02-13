import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Trending from "./Pages/Trending";
// import {ToastContainer} from "react-toastify"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trends" element={<Trending />} />
      </Routes>
    </Router>
  );
}

export default App;
