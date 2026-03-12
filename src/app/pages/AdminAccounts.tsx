import { useState } from "react";
import { TopBar } from "../components/layout/TopBar";
import { Plus, Pencil, MoreHorizontal, Shield, ShieldCheck, X } from "lucide-react";

const admins = [
  { id: 1, name: "Shaheer Alam", email: "ahmed@ustadoncall.pk", role: "Super Admin", status: "Active", lastLogin: "Today, 10:45 AM", initials: "AK" },
  { id: 2, name: "Sara Ali", email: "sara@ustadoncall.pk", role: "Admin", status: "Active", lastLogin: "Today, 9:30 AM", initials: "SA" },
  { id: 3, name: "Bilal Qasim", email: "bilal@ustadoncall.pk", role: "Moderator", status: "Active", lastLogin: "Yesterday, 5:00 PM", initials: "BQ" },
  { id: 4, name: "Hina Farooq", email: "hina@ustadoncall.pk", role: "Finance", status: "Inactive", lastLogin: "Mar 5, 2026", initials: "HF" },
];

const roleColors: Record<string, { bg: string; text: string }> = {
  "Super Admin": { bg: "rgba(147,51,234,0.12)", text: "#9333EA" },
  Admin: { bg: "rgba(255,69,0,0.12)", text: "#FF4500" },
  Moderator: { bg: "rgba(255,183,0,0.12)", text: "#FFB700" },
  Finance: { bg: "rgba(34,197,94,0.12)", text: "#22C55E" },
};

const statusColors: Record<string, { bg: string; text: string; border: string }> = {
  Active: { bg: "rgba(34,197,94,0.12)", text: "#22C55E", border: "rgba(34,197,94,0.2)" },
  Inactive: { bg: "rgba(136,136,136,0.12)", text: "#888888", border: "rgba(136,136,136,0.2)" },
};

export function AdminAccountsPage() {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <>
      <TopBar title="Admin Accounts" subtitle="Admins" />
      <div className="p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck size={20} className="text-[#FF4500]" />
            <span className="text-sm text-[#888888]">{admins.length} admin accounts configured</span>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 h-10 rounded-lg bg-[#FF4500] text-white text-sm font-semibold hover:bg-[#E03E00] transition-colors"
          >
            <Plus size={16} /> Add Admin
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {admins.map((admin) => (
            <div key={admin.id} className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl p-6 hover:border-[#333333] transition-all">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[rgba(255,69,0,0.12)] flex items-center justify-center text-base text-[#FF4500] font-bold">
                    {admin.initials}
                  </div>
                  <div>
                    <h4 className="text-base text-[#F5F5F5] font-semibold">{admin.name}</h4>
                    <p className="text-sm text-[#888888]">{admin.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 rounded-md hover:bg-[#252525] transition-colors group">
                    <Pencil size={16} className="text-[#888888] group-hover:text-[#FF4500]" />
                  </button>
                  <button className="p-1.5 rounded-md hover:bg-[#252525] transition-colors group">
                    <MoreHorizontal size={16} className="text-[#888888] group-hover:text-[#FF4500]" />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: roleColors[admin.role]?.bg, color: roleColors[admin.role]?.text }}>
                  <Shield size={11} className="inline -mt-0.5 mr-1" />
                  {admin.role}
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold border" style={{ backgroundColor: statusColors[admin.status]?.bg, color: statusColors[admin.status]?.text, borderColor: statusColors[admin.status]?.border }}>
                  {admin.status}
                </span>
              </div>
              <div className="mt-4 pt-4 border-t border-[#2A2A2A]">
                <span className="text-xs text-[#888888]">Last login: {admin.lastLogin}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/75" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-[#1E1E1E] border border-[#2A2A2A] rounded-2xl w-[480px] shadow-modal p-8">
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-['Poppins'] text-lg text-[#F5F5F5] font-bold">Add New Admin</h4>
              <button onClick={() => setShowAddModal(false)} className="p-1.5 rounded-md hover:bg-[#252525]">
                <X size={18} className="text-[#888888]" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-[#888888] block mb-1.5 font-semibold uppercase tracking-wider">Full Name</label>
                <input className="w-full h-10 rounded-lg bg-[#252525] border border-[#333333] px-3 text-sm text-[#F5F5F5] placeholder:text-[#555555] outline-none focus:border-[#FF4500]" placeholder="Enter full name" />
              </div>
              <div>
                <label className="text-xs text-[#888888] block mb-1.5 font-semibold uppercase tracking-wider">Email</label>
                <input type="email" className="w-full h-10 rounded-lg bg-[#252525] border border-[#333333] px-3 text-sm text-[#F5F5F5] placeholder:text-[#555555] outline-none focus:border-[#FF4500]" placeholder="admin@ustadoncall.pk" />
              </div>
              <div>
                <label className="text-xs text-[#888888] block mb-1.5 font-semibold uppercase tracking-wider">Role</label>
                <select className="w-full h-10 rounded-lg bg-[#252525] border border-[#333333] px-3 text-sm text-[#F5F5F5] outline-none focus:border-[#FF4500]">
                  <option>Admin</option>
                  <option>Moderator</option>
                  <option>Finance</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-[#888888] block mb-1.5 font-semibold uppercase tracking-wider">Temporary Password</label>
                <input type="password" className="w-full h-10 rounded-lg bg-[#252525] border border-[#333333] px-3 text-sm text-[#F5F5F5] placeholder:text-[#555555] outline-none focus:border-[#FF4500]" placeholder="Set temporary password" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowAddModal(false)} className="flex-1 h-10 rounded-lg border border-[#333333] text-sm text-[#F5F5F5] font-semibold hover:bg-[#252525] transition-colors">
                Cancel
              </button>
              <button onClick={() => setShowAddModal(false)} className="flex-1 h-10 rounded-lg bg-[#FF4500] text-white text-sm font-semibold hover:bg-[#E03E00] transition-colors">
                Create Admin
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
