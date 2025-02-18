import { renderLog } from "../../utils";
import { useThemeContext } from "../Context/themeContext";
import { useNotificationAction } from "../Context/useNotificationContext";
import { useUserContext } from "../Context/userContext";
import { memo } from "../hocs";
import { useCallback } from "../hooks";

// Header 컴포넌트
export const Header: React.FC = memo(() => {
  renderLog("Header rendered");
  const { user, login, logout } = useUserContext();
  const { addNotification } = useNotificationAction();
  const { theme, toggleTheme } = useThemeContext();

  const handleLogin = useCallback(() => {
    // 실제 애플리케이션에서는 사용자 입력을 받아야 합니다.
    login("user@example.com", "password");
    addNotification("성공적으로 로그인되었습니다", "success");
  }, [login, addNotification]);

  const handleLogout = useCallback(() => {
    logout();
    addNotification("로그아웃되었습니다", "info");
  }, [logout, addNotification]);

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">샘플 애플리케이션</h1>
        <div className="flex items-center">
          <button
            onClick={toggleTheme}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            {theme === "light" ? "다크 모드" : "라이트 모드"}
          </button>
          {user ? (
            <div className="flex items-center">
              <span className="mr-2">{user.name}님 환영합니다!</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              로그인
            </button>
          )}
        </div>
      </div>
    </header>
  );
});
