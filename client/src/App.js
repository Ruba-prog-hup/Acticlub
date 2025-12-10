import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Container } from "reactstrap";
import FacePage from "./components/FacePage";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import ForgetPass from "./components/ForgetPass";
import ProfilePic from "./components/ProfilePic";
import Header from "./components/Header";
import Home from "./components/Home";
import ActivityDetails from "./components/ActivityDetails";
import YourActivity from "./components/YourActivity";
import OurGoal from "./components/OurGoal";
import Location from "./components/Location";
import AdminActivity from "./components/Admin/AdminActivity";
import AdminAddActivity from "./components/Admin/AdminAddActivity";
import AdminEditActivity from "./components/Admin/AdminEditActivity"; 


import "./App.css";

const AppContent = () => {
  const location = useLocation();

  const hideHeaderPaths  = ["/", "/login", "/signup", "/forget", "/profile"];
  const hideHeader =
    hideHeaderPaths.includes(location.pathname) ||
    location.pathname.startsWith("/admin");
  return (
    <>
      {!hideHeader && <Header />}

      <Container fluid>
        <Routes>
          <Route path="/" element={<FacePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forget" element={<ForgetPass />} />
          <Route path="/profile" element={<ProfilePic />} />
          <Route path="/home" element={<Home />} />
          <Route path="/activity/:slug" element={<ActivityDetails />} />
          <Route path="/ourgoal" element={<OurGoal />} />
          <Route path="/location" element={<Location />} />
          <Route path="/yourAct" element={<YourActivity />} />
          <Route path="/admin" element={<AdminActivity />} />
          <Route path="/admin/add" element={<AdminAddActivity />} />
          <Route path="/admin/edit/:id" element={<AdminEditActivity />} />
        </Routes>
      </Container>
    </>
  );
};

function App() {
  return <AppContent />;
}

export default App;
