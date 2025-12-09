import { useState } from "react";
import { loginUser } from "../../api/authMain";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { loginParticapentRes } from "../../api/authParticapent";

export default function LoginModal({ upText, hasJudgePanel = false, loginType }) {
  const [code, setCode] = useState("");
  const { token: userToken, login, logout, loginParticapent, particapent } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(null);
    if (loginType === "particapent") {
      try {
      const res = await loginParticapentRes(userToken, {
        login_code: code,
      }, logout, navigate);

      loginParticapent(res.token)

      navigate("/participant");

      } catch (err) {
      setError("Неверный код");
      }
    } else if (loginType === "user") {
    try {
      const res = await loginUser({
        login_code: code,
      });
      const token = res.token;
      login(token);

      const decoded = jwtDecode(token);
      const role = decoded.role;
      const categoryId = decoded.categoryId;

      switch (role) {
        case "Судья":
          switch (categoryId) {
            case 1:
              navigate(`/robotics/practic/loginPaticapent`);
              break;
            case 2:
              navigate(`/robotics/teoria/loginPaticapent`);
              break;
            default:
              navigate("/");
              break;
          }
          break;
        case "Организатор":
          navigate(`/organizer`);
          break;
        default:
          navigate("/");
          break;
      }
    } catch (err) {
      setError("Неверный код");
      }
      }
  };

  return (
    <div
      className={`absolute left-1/2 -translate-x-1/2 z-40 ${
        hasJudgePanel
          ? "top-[calc(15%+150px)]"
          : "top-[40%] -translate-y-1/2"
      }`}
    >
      <div className="flex flex-col items-center gap-6 p-8">
        <p className="text-3xl futura-heavy text-gray-800 touch-none">
          {upText}
        </p>

        <input
          type="text"
          placeholder="XXXXX-XXXXX"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-100 h-15 rounded-xl border border-gray-300 px-4 text-xl outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && (
              <p className="text-red-400 text-sm text-center -mt-1 mb-0">{error}</p>
            )}

        <button
          type="button"
          onClick={handleLogin}
          className="w-50 h-15 rounded-full bg-blue-600 futura-heavy text-xl text-white font-semibold hover:bg-blue-700 transition"
        >
          ВОЙТИ
        </button>
        </div>
      </div>
  )
}
