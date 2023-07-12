import Header from "components/header/Header";
import Login from "pages/Login/Login";
import Main from "pages/Main/Main";
import Mypage from "pages/Mypage/Mypage";
import Regist from "pages/Regist/Regist";
import Findpw from "pages/findpw/Findpw";
import { Route, Routes, Outlet } from "react-router-dom";
import { useReAuth } from "util/reAuth";

function App() {
  useReAuth();
  // ReAuth();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<IsHeader />}>
          <Route path="/" element={<Main />} />
          <Route path="/todo-FE" element={<Main />} />
          <Route path="/mypage" element={<Mypage />} />
        </Route>

        <Route element={<NoHeader />}>
          <Route path="/login" element={<Login />} />
          <Route path="/regist" element={<Regist />} />
          <Route path="/findpw" element={<Findpw />} />
        </Route>
      </Routes>
    </div>
  );
}

function IsHeader() {
  return (
    <>
      <Header />
      <div className="page">
        <Outlet />
      </div>
    </>
  );
}

function NoHeader() {
  return (
    <>
      <div className="page">
        <Outlet />
      </div>
    </>
  );
}

export default App;
