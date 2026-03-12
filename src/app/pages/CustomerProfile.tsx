import { useNavigate } from "react-router";
import { TopBar } from "../components/layout/TopBar";
import {
  ArrowLeft, Phone, Mail, MapPin, Calendar, Briefcase, DollarSign,
  Star, Edit2, Ban, Trash2, Pause, KeyRound, MessageSquare
} from "lucide-react";

const customers = [
  { id: "C001", name: "Hamza Ali", phone: "+92 300 1111222", email: "hamza.ali@email.com", city: "Lahore", address: "DHA Phase 5, Block D", requests: 12, spent: "PKR 24,500", status: "Active", joined: "Jan 5, 2026", initials: "HA" },
];

const recentJobs = [
  { id: "UC1042", category: "Electrical", worker: "Ali Ustad", status: "Active", date: "Mar 8, 2026", amount: "PKR 2,500" },
  { id: "UC1038", category: "Plumbing", worker: "Kamran Shah", status: "Completed", date: "Mar 5, 2026", amount: "PKR 1,800" },
  { id: "UC1033", category: "AC Repair", worker: "Naveed Iqbal", status: "Completed", date: "Feb 28, 2026", amount: "PKR 3,200" },
  { id: "UC1029", category: "Electrical", worker: "Ali Ustad", status: "Completed", date: "Feb 20, 2026", amount: "PKR 4,000" },
];

const statusColors: Record<string, { bg: string; text: string; border: string }> = {
  Active: { bg: "rgba(34,197,94,0.12)", text: "#22C55E", border: "rgba(34,197,94,0.2)" },
  Pending: { bg: "rgba(255,183,0,0.12)", text: "#FFB700", border: "rgba(255,183,0,0.2)" },
  Blocked: { bg: "rgba(255,69,0,0.12)", text: "#FF6B6B", border: "rgba(255,69,0,0.2)" },
  Completed: { bg: "rgba(34,197,94,0.12)", text: "#22C55E", border: "rgba(34,197,94,0.2)" },
};

export function CustomerProfilePage() {
  const navigate = useNavigate();
  const customer = customers[0]; // Always show sample profile (C001)

  return (
    <>
      <TopBar title="Customer Profile" subtitle={`Customers / ${customer.name}`} />
      <div className="p-8 space-y-6">
        {/* Back Button */}
        <button
          onClick={() => navigate("/customers")}
          className="flex items-center gap-2 text-sm text-[#888888] hover:text-[#FF4500] transition-colors"
        >
          <ArrowLeft size={16} /> Back to Customers
        </button>

        {/* Profile Header */}
        <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl shadow-card overflow-hidden">
          <div className="h-20 bg-gradient-to-r from-[#FF4500] to-[#E03E00]" />
          <div className="px-8 py-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-[#252525] border-4 border-[#1E1E1E] flex items-center justify-center text-2xl text-[#FF4500] font-bold shadow-lg -mt-16">
                {customer.initials}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-['Poppins'] text-[#F5F5F5]">{customer.name}</h2>
                  <span
                    className="px-3 py-1 rounded-full text-xs border"
                    style={{
                      backgroundColor: statusColors[customer.status]?.bg,
                      color: statusColors[customer.status]?.text,
                      borderColor: statusColors[customer.status]?.border,
                    }}
                  >
                    {customer.status}
                  </span>
                </div>
                <p className="text-sm text-[#888888] mt-1">Customer ID: {customer.id} &middot; Joined {customer.joined}</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#333333] text-sm text-[#F5F5F5] hover:bg-[#252525] transition-colors">
                  <Edit2 size={14} /> Edit
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#FFB700] text-sm text-[#FFB700] hover:bg-[rgba(255,183,0,0.08)] transition-colors">
                  <Pause size={14} /> Suspend
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#FF4500] text-sm text-[#FF4500] hover:bg-[rgba(255,69,0,0.08)] transition-colors">
                  <Ban size={14} /> Block
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Total Requests", value: customer.requests.toString(), icon: Briefcase, color: "#FF4500" },
            { label: "Total Spent", value: customer.spent, icon: DollarSign, color: "#22C55E" },
            { label: "Avg. Rating Given", value: "4.2", icon: Star, color: "#FFB700" },
            { label: "Active Since", value: customer.joined, icon: Calendar, color: "#38BDF8" },
          ].map((stat) => (
            <div key={stat.label} className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl p-5 shadow-card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${stat.color}20` }}>
                  <stat.icon size={20} style={{ color: stat.color }} />
                </div>
                <div>
                  <div className="text-lg text-[#F5F5F5]" style={{ fontWeight: 600 }}>{stat.value}</div>
                  <div className="text-xs text-[#888888]">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Contact Info */}
          <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl p-6 shadow-card">
            <h4 className="text-base font-['Poppins'] text-[#F5F5F5] mb-5" style={{ fontWeight: 600 }}>Contact Information</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[rgba(255,69,0,0.12)] flex items-center justify-center">
                  <Phone size={16} className="text-[#FF4500]" />
                </div>
                <div>
                  <div className="text-xs text-[#888888]">Phone</div>
                  <div className="text-sm text-[#F5F5F5]">{customer.phone}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[rgba(255,69,0,0.12)] flex items-center justify-center">
                  <Mail size={16} className="text-[#FF4500]" />
                </div>
                <div>
                  <div className="text-xs text-[#888888]">Email</div>
                  <div className="text-sm text-[#F5F5F5]">{customer.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[rgba(255,69,0,0.12)] flex items-center justify-center">
                  <MapPin size={16} className="text-[#FF4500]" />
                </div>
                <div>
                  <div className="text-xs text-[#888888]">Address</div>
                  <div className="text-sm text-[#F5F5F5]">{customer.address}, {customer.city}</div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-[#2A2A2A] space-y-2">
              <button className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#333333] text-sm text-[#F5F5F5] hover:bg-[#252525] transition-colors">
                <MessageSquare size={14} className="text-[#888888]" /> Send Message
              </button>
              <button className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#333333] text-sm text-[#F5F5F5] hover:bg-[#252525] transition-colors">
                <KeyRound size={14} className="text-[#888888]" /> Reset Password
              </button>
            </div>
          </div>

          {/* Recent Jobs */}
          <div className="col-span-2 bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl shadow-card">
            <div className="p-6 pb-4 border-b border-[#2A2A2A]">
              <h4 className="text-base font-['Poppins'] text-[#F5F5F5]" style={{ fontWeight: 600 }}>Recent Job Requests</h4>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-[#1A1A1A]">
                  {["Job ID", "Category", "Worker", "Status", "Date", "Amount"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left text-xs text-[#888888] uppercase tracking-wider" style={{ fontWeight: 600 }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentJobs.map((job) => (
                  <tr key={job.id} className="border-b border-[#2A2A2A] last:border-0 hover:bg-[#242424] transition-colors">
                    <td className="px-5 py-3 text-sm text-[#FF4500] font-mono" style={{ fontWeight: 600 }}>#{job.id}</td>
                    <td className="px-5 py-3 text-sm text-[#C0C0C0]">{job.category}</td>
                    <td className="px-5 py-3 text-sm text-[#F5F5F5]">{job.worker}</td>
                    <td className="px-5 py-3">
                      <span
                        className="inline-block px-2.5 py-1 rounded-full text-xs border"
                        style={{
                          backgroundColor: statusColors[job.status]?.bg,
                          color: statusColors[job.status]?.text,
                          borderColor: statusColors[job.status]?.border,
                          fontWeight: 600,
                        }}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-sm text-[#888888]">{job.date}</td>
                    <td className="px-5 py-3 text-sm text-[#F5F5F5]" style={{ fontWeight: 600 }}>{job.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}