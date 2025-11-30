import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/navBar/NavBar";
import Footer from "./components/footer/Footer";
import Salons from "./pages/salons/Salons";
import Home from "./pages/home/Home";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/salons" element={<Salons />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
