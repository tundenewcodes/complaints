import React, { useContext } from "react";

import { Routes, Route } from "react-router-dom";
import SignUp from "./Pages/Auth/SignUp";
import Login from "./Pages/Auth/Login";
import Welcome from "./Pages/Welcome";
import ProfilePage from "./Pages/ProfilePage";
import ReportSummary from "./Pages/ReportSummary";

import ComplaintForm from "./components/Dashboard/ComplaintForm";
import ComplaintSummary from './components/Dashboard/ComplaintSummary'
// import Header from './components/Header/Header'
// import Mainpage from './components/mainpage/Mainpage'
// import Sidebar from './components/Sidebar/Sidebar'
// import { AppContext } from './store/appReducers'

function App() {
  // const appCtx = useContext(AppContext)
  // const user = appCtx.user
  // console.log(user)
  return (
    <div className="w-screen h-screen bg-gray-100   ">
      <Routes>
        <Route path="/" element={<Welcome />} />{" "}
        <Route path="/signup" element={<SignUp />} />{" "}
        <Route path="/signin" element={<Login />} />{" "}
        <Route path="/entries" element={<ComplaintSummary />} />{" "}
        <Route path="/make-complaint" element={<ComplaintForm />} />{" "}
        <Route path="/user-page" element={<ProfilePage />} />{" "}
        <Route path="/complaint-summary" element={<ReportSummary />} />{" "}
      </Routes>
    </div>
  );
}
export default App;
