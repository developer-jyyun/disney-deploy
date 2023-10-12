import "./App.css";
import { Outlet, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";
import ModalParent from "./ModalParent";

function App() {
  const Layout = () => {
    return (
      <div>
        {/* <ModalParent /> */}
        <Nav />
        <Outlet />
      </div>
    );
  };
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<LoginPage />} />
          <Route path="main" element={<MainPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path=":movieId" element={<DetailPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
