import { useState, useRef, useEffect } from "react";
import { Bell, User, Settings, Key, LogOut, X } from "lucide-react";

interface TopBarProps {
  title: string;
  subtitle?: string;
}

interface Notification {
  id: string;
  type: "job" | "user" | "system";
  title: string;
  description: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "job",
    title: "New Job Request",
    description: "AC Installation requested in Karachi, DHA Phase 5",
    time: "5 min ago",
    read: false,
  },
  {
    id: "2",
    type: "user",
    title: "Worker Registration",
    description: "Muhammad Ali registered as Plumber",
    time: "12 min ago",
    read: false,
  },
  {
    id: "3",
    type: "system",
    title: "System Update",
    description: "Platform maintenance scheduled for tonight",
    time: "1 hour ago",
    read: true,
  },
  {
    id: "4",
    type: "job",
    title: "Bid Accepted",
    description: "Worker accepted bid for Electrical Work",
    time: "2 hours ago",
    read: true,
  },
];

export function TopBar({ title, subtitle }: TopBarProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const [activeTab, setActiveTab] = useState<"all" | "unread" | "jobs" | "users" | "system">("all");

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !n.read;
    return n.type === activeTab;
  });

  const getNotificationIcon = (type: string) => {
    const colors = {
      job: "bg-[rgba(255,69,0,0.12)] text-[#FF4500]",
      user: "bg-[rgba(34,197,94,0.12)] text-[#22C55E]",
      system: "bg-[rgba(56,189,248,0.12)] text-[#38BDF8]",
    };
    return colors[type as keyof typeof colors] || colors.system;
  };

  return (
    <header className="h-16 bg-[#1C1C1C] border-b border-[#2A2A2A] flex items-center justify-between px-8 sticky top-0 z-40">
      <div>
        <h3 className="text-lg font-['Poppins'] font-semibold text-[#F5F5F5]">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs text-[#888888]">Home / {subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfile(false);
            }}
            className="relative p-2 rounded-lg hover:bg-[#252525] transition-colors"
          >
            <Bell size={22} className="text-[#888888] hover:text-[#F5F5F5]" />
            {unreadCount > 0 && (
              <span className="absolute top-0.5 right-0.5 w-[18px] h-[18px] bg-[#FF4500] rounded-full text-white text-[10px] flex items-center justify-center font-bold animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-[320px] bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl shadow-dropdown overflow-hidden animate-in slide-in-from-top-2 duration-200">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-[#2A2A2A]">
                <h4 className="font-['Poppins'] font-semibold text-[#F5F5F5]">
                  Notifications
                </h4>
                <button
                  onClick={markAllRead}
                  className="text-xs text-[#FF4500] hover:text-[#FFB700] font-medium"
                >
                  Mark all read
                </button>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-1 px-2 py-2 border-b border-[#2A2A2A]">
                {["all", "unread", "jobs", "users", "system"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as typeof activeTab)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-colors ${activeTab === tab
                        ? "bg-[#FF4500] text-white"
                        : "text-[#888888] hover:text-[#F5F5F5]"
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Notifications List */}
              <div className="max-h-[400px] overflow-y-auto">
                {filteredNotifications.length === 0 ? (
                  <div className="py-12 text-center">
                    <Bell className="w-12 h-12 mx-auto mb-3 text-[#333333]" />
                    <p className="text-sm text-[#888888]">You're all caught up!</p>
                  </div>
                ) : (
                  filteredNotifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`relative p-4 hover:bg-[#242424] transition-colors cursor-pointer border-b border-[#2A2A2A] last:border-b-0 ${!notif.read ? "border-l-2 border-l-[#FF4500]" : ""
                        }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${getNotificationIcon(notif.type)}`}>
                          <Bell size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="text-sm font-semibold text-[#F5F5F5] mb-1 line-clamp-1">
                            {notif.title}
                          </h5>
                          <p className="text-xs text-[#888888] line-clamp-2 mb-1">
                            {notif.description}
                          </p>
                          <span className="text-[11px] text-[#555555]">
                            {notif.time}
                          </span>
                        </div>
                        {!notif.read && (
                          <div className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] flex-shrink-0 mt-2" />
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {filteredNotifications.length > 0 && (
                <div className="p-3 border-t border-[#2A2A2A]">
                  <button className="w-full h-9 text-sm font-medium text-[#FF4500] border border-[#FF4500] rounded-lg hover:bg-[rgba(255,69,0,0.08)] transition-colors">
                    View All Notifications
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 pl-4 border-l border-[#2A2A2A] hover:opacity-80 transition-opacity"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FF4500] to-[#E03E00] flex items-center justify-center text-white text-sm font-semibold">
              AK
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-[#F5F5F5]">Shaheer Alam</div>
              <div className="text-xs text-[#888888]">Super Admin</div>
            </div>
          </button>

          {/* Profile Dropdown Menu */}
          {showProfile && (
            <div className="absolute right-0 top-full mt-2 w-[200px] bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl shadow-dropdown overflow-hidden animate-in slide-in-from-top-2 duration-200">
              {/* Profile Header */}
              <div className="p-4 border-b border-[#2A2A2A]">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF4500] to-[#E03E00] flex items-center justify-center text-white text-xs font-semibold">
                    AK
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#F5F5F5]">Shaheer Alam</div>
                    <div className="text-xs text-[#888888]">Super Admin</div>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#F5F5F5] hover:bg-[#242424] transition-colors">
                  <User size={16} className="text-[#888888]" />
                  My Profile
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#F5F5F5] hover:bg-[#242424] transition-colors">
                  <Settings size={16} className="text-[#888888]" />
                  Account Settings
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#F5F5F5] hover:bg-[#242424] transition-colors">
                  <Key size={16} className="text-[#888888]" />
                  Change Password
                </button>
              </div>

              <div className="border-t border-[#2A2A2A] py-2">
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#FF4500] hover:bg-[rgba(255,69,0,0.08)] transition-colors">
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
