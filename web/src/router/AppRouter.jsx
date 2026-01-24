import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/login.jsx";
import TeoriaLoginPaticapent from "../pages/robotics/teoria/TeoriaLoginPaticapent.jsx";
import PracticLoginPaticapent from "../pages/robotics/practic/PracticLoginPaticapent.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { getCategoryPath } from "../utils/getCategoryPath.js";
import { allowToGoCategory } from "../utils/allowToGoCategory.js";
import ParticipantMain from "../pages/robotics/practic/ParticipantMain.jsx";
import MissionOne from "../pages/robotics/practic/MissionOne.jsx";
import MissionTwo from "../pages/robotics/practic/MissionTwo.jsx";
import MissionThree from "../pages/robotics/practic/MissionThree.jsx";
import OrganizatorMain from "../pages/organizators/organizatorMain.jsx";
import TeoriaParticipant from "../pages/robotics/teoria/TeoriaParticipant.jsx";

export default function AppRouter() {
  const { token, user, loading, particapent } = useAuth();
  
  if (loading) return <div>Загрузка...</div>;

  // Вычисляем путь один раз
  const userCategoryPath = user ? getCategoryPath(user) : "/";

  return (
    <Routes>
      {/* Главная страница */}
      <Route
        path="/"
        element={
            token && user ? (
            <Navigate to={userCategoryPath} replace />
          ) : (
            <Login />
          )
        }
      />
      
      {/* Организатор */}
      <Route
        path="/organizator"
        element={
          token && user && user.role === "Oragnizer" ? (
            <OrganizatorMain />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      
      {/* Практика: вход участника (для судьи) */}
      <Route
        path="/robotics/practic/loginPaticapent"
        element={
          token && user && allowToGoCategory(user, 1) ? (
            <PracticLoginPaticapent />
          ) : (
            <Navigate to={token ? userCategoryPath : "/"} replace />
          )
        }
      />
      
      {/* Практика: миссии (для участника) */}
      <Route
        path="/robotics/practic/missionOne"
        element={
          token && particapent && user && allowToGoCategory(user, 1) ? (
            <MissionOne />
          ) : token ? (
            <Navigate to="/robotics/practic/loginPaticapent" replace />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      
      <Route
        path="/robotics/practic/missionTwo"
        element={
          token && particapent && user && allowToGoCategory(user, 1) ? (
            <MissionTwo />
          ) : token ? (
            <Navigate to="/robotics/practic/loginPaticapent" replace />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      
      <Route
        path="/robotics/practic/missionThree"
        element={
          token && particapent && user && allowToGoCategory(user, 1) ? (
            <MissionThree />
          ) : token ? (
            <Navigate to="/robotics/practic/loginPaticapent" replace />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      
      <Route
        path="/robotics/teoria/loginPaticapent"
        element={
          token && user && allowToGoCategory(user, 1, { isItRoboticsTheory: true }) ? (
            <TeoriaLoginPaticapent />
          ) : (
            <Navigate to={token ? userCategoryPath : "/"} replace />
          )
        }
      />
      
      {/* Участник: главная страница */}
      <Route
        path="/robotics/practic/participant"
        element={
          token && particapent && user && allowToGoCategory(user, 1) ? (
            <ParticipantMain />
          ) : token ? (
            <Navigate to="/robotics/practic/loginPaticapent" replace />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      
      <Route
        path="/robotics/teoria/participant"
        element={
          token && particapent && user && allowToGoCategory(user, 1, { isItRoboticsTheory: true }) ? (
            <TeoriaParticipant />
          ) : token ? (
            <Navigate to="/robotics/teoria/loginPaticapent" replace />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      <Route path="/login" element={<Login />} />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}