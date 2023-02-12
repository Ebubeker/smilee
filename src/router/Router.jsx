import { Routes, Route } from "react-router-dom";
import { Main, Login, Register, Profile } from "../pages";
import PrivateRoutes from "./PrivateRoutes";
import ProfileShow from "../pages/dashboard/ProfileShow";

const Router = () => {
  return (
    <Routes>
      <Route path="/" exact element={<PrivateRoutes />}>
        <Route index path="main" element={<Main />} />
        <Route index path="myProfile" element={<Profile />} />
        <Route index path="user" element={<ProfileShow />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default Router;
