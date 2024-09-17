import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ({ children }: { children: React.ReactNode }) {
  const { user } = useSelector((state: RootState) => state.auth);

  if (user) return children;

  return <Navigate to={"/login"} />;
}
