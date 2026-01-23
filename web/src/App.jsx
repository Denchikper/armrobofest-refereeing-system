import HealthWrapper from "./components/HealthWrapper.jsx";
import AppRouter from "./router/AppRouter.jsx";

export default function App() {
  return (
    <HealthWrapper>
      <AppRouter />
    </HealthWrapper>
  );
}