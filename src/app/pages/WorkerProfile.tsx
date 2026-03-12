import { useNavigate } from "react-router";
import { TopBar } from "../components/layout/TopBar";
import {
  ArrowLeft, Phone, Mail, MapPin, Calendar, Briefcase, DollarSign,
  Star, Edit2, Ban, Check, Pause, MessageSquare, FileText, Shield
} from "lucide-react";

const workers = [
  { id: "W001", name: "Ali Ustad", phone: "+92 300 1234567", email: "ali.ustad@email.com", category: "Electrician", area: "Lahore", address: "DHA Phase 6", rating: 4.8, reviews: 47, jobs: 156, earnings: "PKR 245,000", commission: "PKR 36,750", status: "Active", joined: "Jan 12, 2026", initials: "AU", cnic: "35201-XXXXXXX-X" },
];

const statusColors: Record<string, { bg: string; text: string; border: string }> = {
  Active: { bg: "rgba(34,197,94,0.12)", text: "#22C55E", border: "rgba(34,197,94,0.2)" },
  Pending: { bg: "rgba(255,183,0,0.12)", text: "#FFB700", border: "rgba(255,183,0,0.2)" },
  Suspended: { bg: "rgba(255,69,0,0.12)", text: "#FF6B6B", border: "rgba(255,69,0,0.2)" },
};

const categoryColors: Record<string, { bg: string; text: string }> = {
  Electrician: { bg: "rgba(255,69,0,0.12)", text: "#FF4500" },
  Plumber: { bg: "rgba(56,189,248,0.12)", text: "#38BDF8" },
  "AC Technician": { bg: "rgba(34,197,94,0.12)", text: "#22C55E" },
  Mechanic: { bg: "rgba(147,51,234,0.12)", text: "#9333EA" },
  Painter: { bg: "rgba(255,183,0,0.12)", text: "#FFB700" },
};

const recentJobs = [
  { id: "UC1042", category: "Electrical", customer: "Hamza Ali", status: "Active", date: "Mar 8, 2026", amount: "PKR 2,500" },
  { id: "UC1038", category: "Electrical", customer: "Usman Tariq", status: "Active", date: "Mar 7, 2026", amount: "PKR 4,000" },
  { id: "UC1035", category: "Painter", customer: "Zainab Bibi", status: "Completed", date: "Mar 6, 2026", amount: "PKR 15,000" },
  { id: "UC1030", category: "Electrical", customer: "Bilal Ahmed", status: "Completed", date: "Mar 3, 2026", amount: "PKR 3,200" },
];

export function WorkerProfilePage() {
  const navigate = useNavigate();
  const worker = workers[0]; // Always show sample profile (W001)

  const verifications = [
    { label: "CNIC Verified", done: worker.status !== "Pending" },
    { label: "Phone Verified", done: true },
    { label: "Bank Account Verified", done: worker.status === "Active" },
    { label: "Background Check", done: worker.status === "Active" },
  ];

  return (
    <>
      <TopBar title="Worker Profile" subtitle={`Workers / ${worker.name}`} />
      <div className="p-8 space-y-6">
        {/* Back */}
        <button
          onClick={() => navigate("/workers")}
          className="flex items-center gap-2 text-sm text-[#888888] hover:text-[#FF4500] transition-colors"
        >
          <ArrowLeft size={16} /> Back to Workers
        </button>

        {/* Profile Header */}
        <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl shadow-card overflow-hidden">
          <div className="h-20 bg-gradient-to-r from-[#FF4500] to-[#E03E00]" />
          <div className="px-8 py-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-[#252525] border-4 border-[#1E1E1E] flex items-center justify-center text-2xl text-[#FF4500] font-bold shadow-lg -mt-16">
                {worker.initials}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="text-xl font-['Poppins'] text-[#F5F5F5]">{worker.name}</h2>
                  <span
                    className="px-3 py-1 rounded text-xs"
                    style={{
                      backgroundColor: categoryColors[worker.category]?.bg,
                      color: categoryColors[worker.category]?.text,
                      fontWeight: 600,
                    }}
                  >
                    {worker.category}
                  </span>
                  <span
                    className="px-3 py-1 rounded-full text-xs border"
                    style={{
                      backgroundColor: statusColors[worker.status]?.bg,
                      color: statusColors[worker.status]?.text,
                      borderColor: statusColors[worker.status]?.border,
                      fontWeight: 600,
                    }}
                  >
                    {worker.status}
                  </span>
                </div>
                <p className="text-sm text-[#888888] mt-1">
                  Worker ID: {worker.id} &middot; {worker.area} &middot; Joined {worker.joined}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={14} className={s <= Math.floor(worker.rating) ? "text-[#FFB700] fill-[#FFB700]" : "text-[#333333]"} />
                  ))}
                  <span className="text-sm text-[#F5F5F5] ml-1" style={{ fontWeight: 600 }}>{worker.rating}</span>
                  <span className="text-xs text-[#888888]">({worker.reviews} reviews)</span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#333333] text-sm text-[#F5F5F5] hover:bg-[#252525] transition-colors">
                  <Edit2 size={14} /> Edit
                </button>
                {worker.status === "Pending" && (
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#22C55E] text-white text-sm hover:bg-[#16A34A] transition-colors">
                    <Check size={14} /> Approve
                  </button>
                )}
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#FF4500] text-sm text-[#FF4500] hover:bg-[rgba(255,69,0,0.08)] transition-colors">
                  <Ban size={14} /> Suspend
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Jobs Completed", value: worker.jobs.toString(), icon: Briefcase, color: "#FF4500" },
            { label: "Total Earnings", value: worker.earnings, icon: DollarSign, color: "#22C55E" },
            { label: "Commission Paid", value: worker.commission, icon: DollarSign, color: "#FFB700" },
            { label: "Avg Rating", value: worker.rating.toString(), icon: Star, color: "#38BDF8" },
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
          {/* Left Column */}
          <div className="space-y-6">
            {/* Contact */}
            <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl p-6 shadow-card">
              <h4 className="text-base font-['Poppins'] text-[#F5F5F5] mb-5" style={{ fontWeight: 600 }}>Contact Information</h4>
              <div className="space-y-4">
                {[
                  { icon: Phone, label: "Phone", value: worker.phone },
                  { icon: Mail, label: "Email", value: worker.email },
                  { icon: MapPin, label: "Address", value: `${worker.address}, ${worker.area}` },
                  { icon: FileText, label: "CNIC", value: worker.cnic },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[rgba(255,69,0,0.12)] flex items-center justify-center">
                      <item.icon size={16} className="text-[#FF4500]" />
                    </div>
                    <div>
                      <div className="text-xs text-[#888888]">{item.label}</div>
                      <div className="text-sm text-[#F5F5F5]">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-5 border-t border-[#2A2A2A]">
                <button className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#333333] text-sm text-[#F5F5F5] hover:bg-[#252525] transition-colors">
                  <MessageSquare size={14} className="text-[#888888]" /> Send Message
                </button>
              </div>
            </div>

            {/* Verification */}
            <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl p-6 shadow-card">
              <h4 className="text-base font-['Poppins'] text-[#F5F5F5] mb-4" style={{ fontWeight: 600 }}>Verification Status</h4>
              <div className="space-y-3">
                {verifications.map((v) => (
                  <div key={v.label} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${v.done ? 'bg-[rgba(34,197,94,0.12)]' : 'bg-[#252525]'}`}>
                      {v.done ? (
                        <Check size={14} className="text-[#22C55E]" />
                      ) : (
                        <Shield size={14} className="text-[#555555]" />
                      )}
                    </div>
                    <span className={`text-sm ${v.done ? 'text-[#22C55E]' : 'text-[#888888]'}`}>{v.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Jobs */}
          <div className="col-span-2 bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl shadow-card">
            <div className="p-6 pb-4 border-b border-[#2A2A2A]">
              <h4 className="text-base font-['Poppins'] text-[#F5F5F5]" style={{ fontWeight: 600 }}>Recent Jobs</h4>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-[#1A1A1A]">
                  {["Job ID", "Category", "Customer", "Status", "Date", "Amount"].map((h) => (
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
                    <td className="px-5 py-3 text-sm text-[#F5F5F5]">{job.customer}</td>
                    <td className="px-5 py-3">
                      <span
                        className="inline-block px-2.5 py-1 rounded-full text-xs border"
                        style={{
                          backgroundColor: statusColors[job.status]?.bg || statusColors.Active.bg,
                          color: statusColors[job.status]?.text || statusColors.Active.text,
                          borderColor: statusColors[job.status]?.border || statusColors.Active.border,
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