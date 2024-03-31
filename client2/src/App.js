import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import BuyStocks from "./components/buyStocks/BuyStocks";
import SellStocks from "./components/sellStocks/SellStocks";
import Help from "./pages/help/Help"; // Import Help component
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Portfolio from "./pages/portfolio/Portfolio"; // Import your portfolio page component
import Wallet from "./pages/wallet/Wallet";
import "./style.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/authContext";

function App() {
  const {currentUser} = useContext(AuthContext);

  const { darkMode } = useContext(DarkModeContext);

  const Layout = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Navbar />
        <div style={{ display: "flex" }}>
          <LeftBar />
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>
          <RightBar />
        </div>
      </div>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/",
          element: <Profile />,
        },
        {
          path: "/buy-stocks", // New route for buying stocks
          element: <BuyStocks />, // Component for buying stocks
        },
        {
          path: "/sell-stocks", // Route for the sell stocks page
          element: <SellStocks />, // Component for the sell stocks page
        },
        {
          path: "/portfolio", // Route for the portfolio page
          element: <Portfolio />, // Component for the portfolio page
        },
        {
          path: "/wallet",
          element: <Wallet />,
        },
        {
          path: "/help",
          element: <Help />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
