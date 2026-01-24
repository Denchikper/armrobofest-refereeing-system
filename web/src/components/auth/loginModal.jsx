import { useState } from "react";
import { loginParticapentRes } from "../../api/authParticapent";
import loginUser from "../../api/authMain";
import { getCategoryPath } from "../../utils/getCategoryPath";

export default function LoginModal({ upText, hasJudgePanel = false, loginType, isUser = false, userToken, login, logout, path, loginParticapent, navigate }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(null);

  const formatCode = (input) => {
    let value = input.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();

    if (isUser) {
      if (value.length > 3) { value = value.slice(0, 3) + "-" + value.slice(3, 6); }
    } else {
      if (value.length > 4) { value = value.slice(0, 4) + "-" + value.slice(4, 8); }
    }

    return value;
  };

  const handleChange = (e) => {
    setCode(formatCode(e.target.value));
  };

  const handleLogin = async () => {
    setError(null);

    if (loginType === "particapent") {
      const res = await loginParticapentRes(userToken, { login_code: code }, logout, navigate);

      if (res && res.ok === false) {
        console.log(res);
        setError(res.data.message);
      } else {
        loginParticapent(res.accessToken, res.user, path);
      }
    } else if (loginType === "user") {
      const res = await loginUser({ login_code: code });

      if (res && res.ok === false) {
        setError(res.data.message);
      } else {
        const token = res.accessToken;
        const user = res.user;
        console.log(user);
        login(token, user, getCategoryPath(user));
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
      <div className="flex flex-col items-center p-8">
        <p className="text-3xl futura-heavy text-gray-800 touch-none">
          {upText}
        </p>

        <input
          type="text"
          placeholder={isUser ? "XXX-XXX" : "XXXX-XXXX"}
          value={code}
          onChange={handleChange}
          className="w-100 h-15 rounded-xl border mt-6 mb-3 border-gray-300 px-4 text-xl outline-none focus:ring-2 focus:ring-blue-500"
        />

        {error && (
          <p className="text-red-400 text-[18px] text-center">{error}</p>
        )}

        <button
          type="button"
          onClick={handleLogin}
          className="w-50 h-15 rounded-full bg-blue-600 shadow-md mt-3 futura-heavy text-xl text-white font-semibold hover:bg-blue-700 transition"
        >
          ВОЙТИ
        </button>
      </div>
    </div>
  );
}
