import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "../Layout/Layout";
import Login from "../pages/Login";
import Chat from "../pages/Chat";
import Room from "../pages/Room";
import CookieServices from "../service/CookieServices";
import ProtectRouter from "../Auth/ProtectRouter";

const isAllow = CookieServices.get("tokenFire");
export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route
        index
        element={
          <ProtectRouter isAllow={!isAllow} path={"/room"}>
            <Login />
          </ProtectRouter>
        }
      ></Route>
      <Route
        path="/chat"
        element={
          <ProtectRouter isAllow={isAllow} path={"/"}>
            <Chat />
          </ProtectRouter>
        }
      ></Route>
      <Route
        path="/room"
        element={
          <ProtectRouter isAllow={isAllow} path={"/"}>
            <Room />
          </ProtectRouter>
        }
      ></Route>
    </Route>
  )
);
