import { useContext } from "react";
import { ContextProvider } from "./Context/Context";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const { currentUser } = useContext(ContextProvider)!;
  if (!currentUser) return <Navigate to="/" replace />;
  return <Outlet />;
}
