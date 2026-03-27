import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage/MainPage";
import MyTickets from "./pages/MyTickets/MyTickets";
import NewTicket from "./pages/NewTicket/NewTicket";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";
import UsersPage from "./pages/UsersPage/UsersPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <></>,
    children: [
      {
        element: <GuestRoute/>,
        children: [{
          index: true,
          element: <LoginPage/>
        }]
      },
      {
        element: <ProtectedRoute />,
        children: [{
          path: "/",
          element: <MainPage/>
        },
        {
          path: "/myTickets",
          element: <MyTickets/>
        },
        {
          path: "/newTicket",
          element: <NewTicket/>
        },
        {
          path: "/users",
          element: <UsersPage/>
        }
      ],
      },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
