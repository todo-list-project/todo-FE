import Header from "components/header/Header";
import Login from "pages/Login/Login";
import Main from "pages/Main/Main";
import Mypage from "pages/Mypage/Mypage";
import { Route, Routes } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<Main />} />
        <Route path={"/mypage"} element={<Mypage />} />
        <Route path={"/login"} element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
