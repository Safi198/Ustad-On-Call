import { useState } from "react";
import { TopBar } from "../components/layout/TopBar";
import { Search, Plus, Pencil, Trash2, Check, Ban, Settings, Shield } from "lucide-react";

const actionTypeColors: Record<string, { dot: string; label: string }> = {
  create: { dot: "#22C55E", label: "Create" },
  edit: { dot: "#38BDF8", label: "Edit" },
  delete: { dot: "#FF6B6B", label: "Delete" },
  approve: { dot: "#22C55E", label: "Approve" },
  suspend: { dot: "#FFB700", label: "Suspend" },
  financial: { dot: "#22C55E", label: "Financial" },
  settings: { dot: "#9333EA", label: "Settings" },
};

const logs = [
  { id: 1, admin: "Shaheer Alam", initials: "AK", action: "approve", desc: "Approved worker profile for Adeel Hussain", resource: "Worker #W011", time: "10:45 AM", date: "Today", ip: "192.168.1.42" },
  { id: 2, admin: "Shaheer Alam", initials: "AK", action: "edit", desc: "Updated service pricing for AC Gas Refill", resource: "Service #S011", time: "10:30 AM", date: "Today", ip: "192.168.1.42" },
  { id: 3, admin: "Sara Ali", initials: "SA", action: "financial", desc: "Processed payout of PKR 32,640 to Naveed Iqbal", resource: "Payout #P089", time: "10:15 AM", date: "Today", ip: "192.168.1.38" },
  { id: 4, admin: "Shaheer Alam", initials: "AK", action: "suspend", desc: "Suspended worker account for Hassan Javed — Reason: Policy violation", resource: "Worker #W006", time: "9:50 AM", date: "Today", ip: "192.168.1.42" },
  { id: 5, admin: "Sara Ali", initials: "SA", action: "create", desc: "Created new service 'UPS Installation' under Electrician category", resource: "Service #S022", time: "9:30 AM", date: "Today", ip: "192.168.1.38" },
  { id: 6, admin: "Shaheer Alam", initials: "AK", action: "approve", desc: "Approved worker profile for Rashid Ali", resource: "Worker #W013", time: "9:00 AM", date: "Today", ip: "192.168.1.42" },
  { id: 7, admin: "Sara Ali", initials: "SA", action: "edit", desc: "Updated notification template for job completion SMS", resource: "Template #T005", time: "Yesterday, 5:00 PM", date: "Yesterday", ip: "192.168.1.38" },
  { id: 8, admin: "Shaheer Alam", initials: "AK", action: "delete", desc: "Deleted review #R007 — Flagged as inappropriate", resource: "Review #R007", time: "Yesterday, 4:30 PM", date: "Yesterday", ip: "192.168.1.42" },
  { id: 9, admin: "Shaheer Alam", initials: "AK", action: "financial", desc: "Processed bulk payout of PKR 85,430 to 6 workers", resource: "Batch #B012", time: "Yesterday, 3:00 PM", date: "Yesterday", ip: "192.168.1.42" },
  { id: 10, admin: "Sara Ali", initials: "SA", action: "settings", desc: "Updated platform commission rate from 12% to 15%", resource: "Settings", time: "Yesterday, 2:00 PM", date: "Yesterday", ip: "192.168.1.38" },
];

const actionIcons: Record<string, typeof Plus> = {
  create: Plus, edit: Pencil, delete: Trash2, approve: Check, suspend: Ban, financial: Shield, settings: Settings,
};

export function ActivityLogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [actionFilter, setActionFilter] = useState("All");

  const filtered = logs.filter((l) => {
    if (actionFilter !== "All" && l.action !== actionFilter.toLowerCase()) return false;
    return l.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.admin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.resource.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const grouped: Record<string, typeof logs> = {};
  filtered.forEach((l) => {
    if (!grouped[l.date]) grouped[l.date] = [];
    grouped[l.date].push(l);
  });

  return (
    <>
      <TopBar title="Activity Logs" subtitle="Activity Logs" />
      <div className="p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-[400px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555555]" />
            <input
              type="text"
              placeholder="Search activity logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-lg bg-[#252525] border border-[#333333] pl-10 pr-4 text-sm text-[#F5F5F5] placeholder:text-[#555555] focus:border-[#FF4500] outline-none transition-all"
            />
          </div>
          <div className="flex bg-[#252525] rounded-lg p-1 gap-1">
            {["All", "Create", "Edit", "Delete", "Approve", "Suspend", "Financial", "Settings"].map((a) => (
              <button
                key={a}
                onClick={() => setActionFilter(a)}
                className={`px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all ${actionFilter === a ? 'bg-[#FF4500] text-white' : 'text-[#888888] hover:text-[#F5F5F5]'}`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl shadow-card overflow-hidden">
          {Object.entries(grouped).map(([date, entries]) => (
            <div key={date}>
              <div className="px-6 py-2 bg-[#1A1A1A] border-b border-[#2A2A2A]">
                <span className="text-xs text-[#888888] font-semibold">{date}</span>
              </div>
              {entries.map((log) => {
                const actionInfo = actionTypeColors[log.action];
                const Icon = actionIcons[log.action] || Plus;
                return (
                  <div
                    key={log.id}
                    className="flex items-center gap-4 px-6 py-3 border-b border-[#2A2A2A] hover:bg-[#242424] transition-colors"
                  >
                    <div className="relative shrink-0">
                      <div className="w-8 h-8 rounded-full bg-[rgba(255,69,0,0.12)] flex items-center justify-center text-xs text-[#FF4500] font-semibold">
                        {log.initials}
                      </div>
                      <div
                        className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-[#1E1E1E] flex items-center justify-center"
                        style={{ backgroundColor: actionInfo.dot }}
                      >
                        <Icon size={8} className="text-white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-[#F5F5F5]">
                        <span className="font-semibold">{log.admin}</span>{" "}
                        <span className="text-[#888888]">{log.desc.replace(log.admin, "").trim()}</span>
                      </div>
                      <button className="text-sm text-[#FF4500] hover:underline mt-0.5">
                        {log.resource}
                      </button>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xs text-[#888888]">{log.time}</div>
                      <div className="text-xs text-[#555555]">{log.ip}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
