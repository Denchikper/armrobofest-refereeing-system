import { Routes, Route, Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext.jsx";
import { getCategoryPath } from "../utils/getCategoryPath.js";
import { allowToGoCategory } from "../utils/allowToGoCategory.js";

import Login from "../pages/auth/login.jsx";
// import TeoriaLoginPaticapent from "../pages/robotics/teoria/TeoriaLoginPaticapent.jsx";
import PracticLoginPaticapent from "../pages/robotics/practic/PracticLoginPaticapent.jsx";
import ParticipantMain from "../pages/robotics/practic/ParticipantMain.jsx";
import OrganizatorMain from "../pages/organizators/OrganizatorMain.jsx";
// import TeoriaParticipant from "../pages/robotics/teoria/TeoriaParticipant.jsx";
import Mission from "../pages/robotics/practic/Mission.jsx";
import ThreeatlonLoginPaticapent from "../pages/Threeatlon/ThreeatlonLoginPaticapent.jsx";
import ParticipantThreeatlon from "../pages/Threeatlon/ParticipantThreeatlon.jsx";
import MissionThreeatlon from "../pages/Threeatlon/Mission.jsx";

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
            token && user && user.role === "Organizer" ? (
            <OrganizatorMain />
          ) : token && user && user.role === "Judge"? (
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
          token && user && user.role === "Organizer" ? (
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
        path="/robotics/practic/mission"
        element={
          token && particapent && user && allowToGoCategory(user, 1) ? (
            <Mission />
          ) : token ? (
            <Navigate to="/robotics/practic/loginPaticapent" replace />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      
      {/* <Route
        path="/robotics/teoria/loginPaticapent"
        element={
          token && user && allowToGoCategory(user, 1, { isItRoboticsTheory: true }) ? (
            <TeoriaLoginPaticapent />
          ) : (
            <Navigate to={token ? userCategoryPath : "/"} replace />
          )
        }
      /> */}
      
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
        path="/threeatlon/loginPaticapent"
        element={
          token && user && allowToGoCategory(user, 3) ? (
            <ThreeatlonLoginPaticapent />
          ) : (
            <Navigate to={token ? userCategoryPath : "/"} replace />
          )
        }
      />

      {/* Участник: главная страница триатлон */}
      <Route
        path="/threeatlon/participant"
        element={
          token && particapent && user && allowToGoCategory(user, 3) ? (
            <ParticipantThreeatlon />
          ) : token ? (
            <Navigate to="/threeatlon/loginPaticapent" replace />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      {/* Практика: миссии (для участника) */}
      <Route
        path="/threeatlon/mission"
        element={
          token && particapent && user && allowToGoCategory(user, 3) ? (
            <MissionThreeatlon />
          ) : token ? (
            <Navigate to="/threeatlon/loginPaticapent" replace />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      
      {/* <Route
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
      /> */}

      <Route path="/login" element={<Login />} />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}