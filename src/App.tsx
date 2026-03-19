import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <></>,
    children: [
      {
        index: true,
        element: <></>,
      },
      {
        element: <ProtectedRoute />,
        children: [{}],
      },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
