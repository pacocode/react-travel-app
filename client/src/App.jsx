import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Post from "./pages/Post";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={"/"} element={<Dashboard />} />
          <Route path={"/post/:id"} element={<Post />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      <div></div>
    </>
  );
};

export default App;
