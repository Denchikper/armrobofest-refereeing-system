import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/login.jsx";
import TeoriaLoginPaticapent from "../pages/robotics/teoria/TeoriaLoginPaticapent.jsx";
import PracticLoginPaticapent from "../pages/robotics/practic/PracticLoginPaticapent.jsx";
import PrivateRoute from "../components/PrivateRoute.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { getCategoryPath } from "../utils/getCategoryPath.js";
import { allowToGoCategory } from "../utils/allowToGoCategory.js";
import ParticipantMain from "../pages/robotics/practic/ParticipantMain.jsx";
import MissionOne from "../pages/robotics/practic/MissionOne.jsx";

export default function AppRouter() {
  const { token, loading } = useAuth();
  
  if (loading) return <div>Загрузка...</div>;

  return (
    <Routes>
      <Route
        path="/"
        element={token ? <Navigate to={getCategoryPath(token)} replace /> : <Login/>}
      />
      <Route
        path="/robotics/practic/loginPaticapent"
        element={
          token && allowToGoCategory(token, 1) ? // ← allowToGoCategory должен проверять на 1 для practic
            <PrivateRoute><PracticLoginPaticapent /></PrivateRoute> : 
            <Navigate to={token ? getCategoryPath(token) : "/"} replace />
        }
      />
      <Route
        path="/robotics/practic/missionOne"
        element={
          token && allowToGoCategory(token, 1) ? // ← allowToGoCategory должен проверять на 1 для practic
            <PrivateRoute><MissionOne /></PrivateRoute> : 
            <Navigate to={token ? getCategoryPath(token) : "/"} replace />
        }
      />
      <Route
        path="/participant"
        element={
          token && allowToGoCategory(token, 1) ? // ← allowToGoCategory должен проверять на 1 для practic
            <PrivateRoute><ParticipantMain /></PrivateRoute> : 
            <Navigate to={token ? getCategoryPath(token) : "/"} replace />
        }
      />
      <Route
        path="/robotics/teoria/loginPaticapent"
        element={
          token && allowToGoCategory(token, 2) ? // ← allowToGoCategory должен проверять на 2 для teoria
            <PrivateRoute><TeoriaLoginPaticapent /></PrivateRoute> : 
            <Navigate to={token ? getCategoryPath(token) : "/"} replace />
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}