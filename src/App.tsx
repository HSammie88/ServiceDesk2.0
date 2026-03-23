import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage/MainPage";
import MyTickets from "./pages/MyTickets/MyTickets";
import NewTicket from "./pages/NewTicket/NewTicket";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <></>,
    children: [
      {
        index: true,
        element: <LoginPage/>,
      },
      {
        element: <ProtectedRoute />,
        children: [{
          path: "/mainPage",
          element: <MainPage/>
        },
        {
          path: "/myTickets",
          element: <MyTickets/>
        },
        {
          path: "/newTicket",
          element: <NewTicket/>
        }
      ],
      },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
