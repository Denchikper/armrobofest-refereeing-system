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
import MissionTwo from "../pages/robotics/practic/MissionTwo.jsx";
import MissionThree from "../pages/robotics/practic/MissionThree.jsx";
import OrganizatorMain from "../pages/organizators/organizatorMain.jsx";

export default function AppRouter() {
  const { token, loading, particapent } = useAuth();
  
  if (loading) return <div>Загрузка...</div>;

  return (
    <Routes>
      <Route
        path="/"
        element={
          particapent ? <Navigate to="/participant" replace /> : 
          token ? <Navigate to={getCategoryPath(token)} replace /> : 
          <Login/>
        }
      />
      
      <Route
        path="/organizator"
        element={
          token ? <OrganizatorMain /> : <Navigate to="/" replace />
        }
      />
      
      <Route
        path="/robotics/practic/loginPaticapent"
        element={
          token && allowToGoCategory(token, 1) ? 
            <PracticLoginPaticapent /> : 
            <Navigate to={token ? getCategoryPath(token) : "/"} replace />
        }
      />
      
      <Route
        path="/robotics/practic/missionOne"
        element={
          token && particapent && allowToGoCategory(token, 1) ? 
            <MissionOne /> : 
            <Navigate to={token ? "/robotics/practic/loginPaticapent" : "/"} replace />
        }
      />
      
      <Route
        path="/robotics/practic/missionTwo"
        element={
          token && particapent && allowToGoCategory(token, 1) ? 
            <MissionTwo /> : 
            <Navigate to={token ? "/robotics/practic/loginPaticapent" : "/"} replace />
        }
      />
      
      <Route
        path="/robotics/practic/missionThree"
        element={
          token && particapent && allowToGoCategory(token, 1) ? 
            <MissionThree /> : 
            <Navigate to={token ? "/robotics/practic/loginPaticapent" : "/"} replace />
        }
      />
      
      <Route
        path="/robotics/teoria/loginPaticapent"
        element={
          token && allowToGoCategory(token, 2) ? 
            <TeoriaLoginPaticapent /> : 
            <Navigate to={token ? getCategoryPath(token) : "/"} replace />
        }
      />
      
      <Route
        path="/participant"
        element={
          token && particapent && allowToGoCategory(token, 1) ? 
            <ParticipantMain /> : 
            <Navigate to={token ? "/robotics/practic/loginPaticapent" : "/"} replace />
        }
      />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}