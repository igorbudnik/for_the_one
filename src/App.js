import "./App.css";
import Main from "./pages/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Valentine from "./pages/Valentine";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/valentine" element={<Valentine />} />
      </Routes>
    </BrowserRouter>

    // <Main />
  );
}

export default App;
