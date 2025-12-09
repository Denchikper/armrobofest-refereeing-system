// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom"; // ✅ добавляем навигацию
// import { loginUser } from "../api/auth"; // ✅ импорт API
// import { useAuth } from "../context/AuthContext.jsx";
// import { useEffect } from "react";

import Header from "../../components/base/header";
import BackgroundImages from "../../components/base/backgroundImages";
import LoginModal from "../../components/auth/loginModal";
import MiniFooter from "../../components/base/MiniFooter";

export default function Login() {
  return (
    <>
        <BackgroundImages/>
        <Header />
        <LoginModal upText="ВВЕДИТЕ ПРИСВОЕННЫЙ ВАМ КОД" loginType="user"/>
        <MiniFooter/>
    </>
  );
}