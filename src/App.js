import "./App.css";
import Main from "./pages/Main";
import { HashRouter, Routes, Route } from "react-router-dom";
import Valentine from "./pages/Valentine";
import Collage from "./pages/Collage";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/valentine" element={<Valentine />} />
        <Route path="/collage" element={<Collage />} />
      </Routes>
    </HashRouter>

    // <Main />
  );
}

export default App;
