import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import {
  LayoutDashboard, Users, Wrench, Clock, Briefcase, Gavel, Grid3X3,
  Receipt, Percent, Wallet, Star, MessageSquare, Bell, Activity,
  Settings, ShieldCheck, LogOut
} from "lucide-react";

const navSections = [
  {
    label: "OVERVIEW",
    items: [
      { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    ],
  },
  {
    label: "USERS",
    items: [
      { to: "/customers", icon: Users, label: "Customers" },
      { to: "/workers", icon: Wrench, label: "Workers" },
      { to: "/pending-approvals", icon: Clock, label: "Pending Registrations" },
    ],
  },
  {
    label: "OPERATIONS",
    items: [
      { to: "/jobs", icon: Briefcase, label: "Jobs & Requests" },
      { to: "/bidding", icon: Gavel, label: "Bidding Activity" },
      { to: "/categories", icon: Grid3X3, label: "Categories & Services" },
    ],
  },
  {
    label: "FINANCE",
    items: [
      { to: "/finance", icon: Receipt, label: "Finance & Revenue" },
      { to: "/commissions", icon: Percent, label: "Commissions" },
      { to: "/payouts", icon: Wallet, label: "Worker Payouts" },
    ],
  },
  {
    label: "PLATFORM",
    items: [
      { to: "/reviews", icon: Star, label: "Reviews & Ratings" },
      { to: "/chat", icon: MessageSquare, label: "Chat Monitor" },
      { to: "/notifications", icon: Bell, label: "Notifications" },
      { to: "/activity-log", icon: Activity, label: "Activity Logs" },
    ],
  },
  {
    label: "SETTINGS",
    items: [
      { to: "/settings", icon: Settings, label: "Platform Settings" },
      { to: "/admins", icon: ShieldCheck, label: "Admin Accounts" },
    ],
  },
];

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setShowLogoutModal(false);

    // Fade out animation
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 300ms";

    setTimeout(() => {
      navigate("/login");
      document.body.style.opacity = "1";
    }, 300);
  };

  return (
    <>
      <aside className="fixed left-0 top-0 bottom-0 w-[260px] bg-[#1C1C1C] flex flex-col z-50 border-r border-[#2A2A2A]">
        {/* Logo */}
        <div className="h-[72px] flex items-center px-6 border-b border-[#2A2A2A]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#FF4500] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">U</span>
            </div>
            <span className="font-['Poppins'] text-lg font-bold">
              <span className="text-white">Ustad</span>
              <span className="text-[#FF4500]">OnCall</span>
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {navSections.map((section) => (
            <div key={section.label} className="mb-2">
              <div className="px-3 pt-5 pb-2 text-[10px] tracking-wider font-semibold text-[#555555] uppercase">
                {section.label}
              </div>
              {section.items.map((item) => {
                const isActive = item.to === "/dashboard"
                  ? location.pathname === "/dashboard" || location.pathname === "/dashboard/"
                  : location.pathname.startsWith(item.to);
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={`flex items-center gap-3 h-11 px-4 rounded-lg mb-0.5 transition-all duration-150 relative ${isActive
                        ? "bg-[rgba(255,69,0,0.15)] text-[#F5F5F5]"
                        : "text-[#888888] hover:bg-[rgba(255,255,255,0.04)]"
                      }`}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r bg-[#FF4500]" />
                    )}
                    <item.icon size={20} />
                    <span className="text-sm font-semibold">{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Admin Profile + Logout */}
        <div className="border-t border-[#2A2A2A] p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FF4500] to-[#E03E00] flex items-center justify-center text-white text-sm font-semibold">
              AK
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[#F5F5F5] text-sm font-semibold truncate">Shaheer Alam</div>
              <div className="text-[#888888] text-xs">Super Admin</div>
            </div>
          </div>
          <button
            onClick={() => setShowLogoutModal(true)}
            className="w-full flex items-center gap-2 h-10 px-3 rounded-lg text-[#888888] hover:text-[#FF4500] hover:bg-[rgba(255,69,0,0.08)] transition-all group"
          >
            <LogOut size={18} className="transition-transform group-hover:translate-x-0.5" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-[100] animate-in fade-in duration-200">
          <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-2xl p-8 w-full max-w-md shadow-modal animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[rgba(255,69,0,0.12)] flex items-center justify-center mb-4">
                <LogOut className="w-8 h-8 text-[#FF4500]" />
              </div>
              <h3 className="text-xl font-['Poppins'] font-bold text-[#F5F5F5] mb-2">
                Log Out?
              </h3>
              <p className="text-[#888888] text-sm mb-6">
                You will be signed out of the UstadOnCall Admin Panel.
              </p>
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  disabled={isLoggingOut}
                  className="flex-1 h-11 px-4 rounded-lg border border-[#333333] text-[#F5F5F5] font-semibold hover:bg-[#252525] transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="flex-1 h-11 px-4 rounded-lg bg-[#FF4500] hover:bg-[#E03E00] text-white font-semibold transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {isLoggingOut ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Logging out...
                    </>
                  ) : (
                    "Yes, Logout"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
