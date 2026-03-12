import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";

export function Layout() {
  return (
    <div className="flex min-h-screen bg-[#141414]">
      <Sidebar />
      <main className="flex-1 ml-[260px] flex flex-col min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}