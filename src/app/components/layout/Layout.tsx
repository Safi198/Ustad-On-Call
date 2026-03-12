import { Outlet, useNavigate } from "react-router";
import { Sidebar } from "./Sidebar";
import { useEffect } from "react";

export function Layout() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = localStorage.getItem("ustad_auth");
    if (!isAuth) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-[#141414]">
      <Sidebar />
      <main className="flex-1 ml-[260px] flex flex-col min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}