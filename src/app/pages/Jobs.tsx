import { useState } from "react";
import { TopBar } from "../components/layout/TopBar";
import { useNavigate } from "react-router";
import {
  Search, Filter, Eye, MapPin, Clock, X, MessageSquare,
  CheckCircle2, Circle, ChevronRight, Briefcase
} from "lucide-react";

const jobStats = [
  { label: "All Jobs", count: 948 },
  { label: "Active", count: 186 },
  { label: "Pending", count: 43 },
  { label: "Completed", count: 682 },
  { label: "Cancelled", count: 37 },
];

const jobs = [
  { id: "UC1042", customer: "Hamza Ali", custInit: "HA", category: "Electrical", location: "DHA Phase 5, Lahore", posted: "2 hours ago", bids: 4, worker: "Ali Ustad", workerInit: "AU", status: "Active", amount: "PKR 2,500", desc: "Need to fix short circuit in kitchen wiring" },
  { id: "UC1041", customer: "Fatima Noor", custInit: "FN", category: "Plumbing", location: "Gulshan, Karachi", posted: "3 hours ago", bids: 2, worker: null, workerInit: null, status: "Pending", amount: "PKR 1,800", desc: "Leaking tap in bathroom, needs replacement" },
  { id: "UC1040", customer: "Bilal Ahmed", custInit: "BA", category: "AC Repair", location: "F-10, Islamabad", posted: "5 hours ago", bids: 5, worker: "Naveed Iqbal", workerInit: "NI", status: "Completed", amount: "PKR 3,200", desc: "AC not cooling, gas refill needed" },
  { id: "UC1039", customer: "Ayesha Khan", custInit: "AK", category: "Mechanic", location: "Satellite Town, Rawalpindi", posted: "6 hours ago", bids: 0, worker: null, workerInit: null, status: "Cancelled", amount: "PKR 1,500", desc: "Car won't start, battery issue suspected" },
  { id: "UC1038", customer: "Usman Tariq", custInit: "UT", category: "Electrical", location: "Peoples Colony, Faisalabad", posted: "8 hours ago", bids: 3, worker: "Ali Ustad", workerInit: "AU", status: "Active", amount: "PKR 4,000", desc: "Complete house wiring for 2 rooms" },
  { id: "UC1037", customer: "Sana Malik", custInit: "SM", category: "Plumbing", location: "Bosan Road, Multan", posted: "10 hours ago", bids: 6, worker: "Kamran Shah", workerInit: "KS", status: "Active", amount: "PKR 2,200", desc: "Install new water pump" },
  { id: "UC1036", customer: "Rehan Shah", custInit: "RS", category: "AC Repair", location: "University Road, Peshawar", posted: "12 hours ago", bids: 1, worker: null, workerInit: null, status: "Pending", amount: "PKR 1,200", desc: "AC maintenance and cleaning" },
  { id: "UC1035", customer: "Zainab Bibi", custInit: "ZB", category: "Painter", location: "Model Town, Lahore", posted: "1 day ago", bids: 7, worker: "Tariq Mehmood", workerInit: "TM", status: "Completed", amount: "PKR 15,000", desc: "Paint 3 rooms, ceiling and walls" },
];

const statusColors: Record<string, { bg: string; text: string; border: string }> = {
  Active: { bg: "rgba(34,197,94,0.12)", text: "#22C55E", border: "rgba(34,197,94,0.2)" },
  Completed: { bg: "rgba(34,197,94,0.12)", text: "#22C55E", border: "rgba(34,197,94,0.2)" },
  Pending: { bg: "rgba(255,183,0,0.12)", text: "#FFB700", border: "rgba(255,183,0,0.2)" },
  Cancelled: { bg: "rgba(255,69,0,0.12)", text: "#FF6B6B", border: "rgba(255,69,0,0.2)" },
};

const categoryColors: Record<string, { bg: string; text: string }> = {
  Electrical: { bg: "rgba(255,69,0,0.12)", text: "#FF4500" },
  Plumbing: { bg: "rgba(56,189,248,0.12)", text: "#38BDF8" },
  "AC Repair": { bg: "rgba(34,197,94,0.12)", text: "#22C55E" },
  Mechanic: { bg: "rgba(147,51,234,0.12)", text: "#9333EA" },
  Painter: { bg: "rgba(255,183,0,0.12)", text: "#FFB700" },
};

const timeline = [
  { label: "Job Posted", done: true, time: "Mar 8, 10:30 AM" },
  { label: "Bids Received", done: true, time: "Mar 8, 11:15 AM" },
  { label: "Worker Assigned", done: true, time: "Mar 8, 12:00 PM" },
  { label: "In Progress", done: true, time: "Mar 8, 2:00 PM" },
  { label: "Completed", done: false, time: "Pending" },
];

export function JobsPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All Jobs");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  const filtered = jobs.filter((j) => {
    if (activeFilter === "Active" && j.status !== "Active") return false;
    if (activeFilter === "Pending" && j.status !== "Pending") return false;
    if (activeFilter === "Completed" && j.status !== "Completed") return false;
    if (activeFilter === "Cancelled" && j.status !== "Cancelled") return false;
    return j.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.category.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const job = jobs.find((j) => j.id === selectedJob);

  return (
    <>
      <TopBar title="Jobs & Requests" subtitle="Jobs" />
      <div className="p-8 space-y-6">
        {/* Stats Row */}
        <div className="grid grid-cols-5 gap-4">
          {jobStats.map((s) => (
            <button
              key={s.label}
              onClick={() => setActiveFilter(s.label)}
              className={`p-4 rounded-xl text-center transition-all border ${
                activeFilter === s.label
                  ? "bg-[#1E1E1E] border-[#FF4500] shadow-glow"
                  : "bg-[#1E1E1E] border-[#2A2A2A] hover:border-[#333333]"
              }`}
            >
              <div className={`text-2xl font-['Poppins'] font-bold ${activeFilter === s.label ? 'text-[#FF4500]' : 'text-[#F5F5F5]'}`}>
                {s.count}
              </div>
              <div className="text-xs text-[#888888] mt-0.5">{s.label}</div>
              {s.label === "Active" && (
                <div className="flex items-center justify-center gap-1.5 mt-1">
                  <div className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
                  <span className="text-[10px] text-[#22C55E] font-semibold">Live</span>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Search & Filter */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555555]" />
            <input
              type="text"
              placeholder="Search by Job ID, customer, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-lg bg-[#252525] border border-[#333333] pl-10 pr-4 text-sm text-[#F5F5F5] placeholder:text-[#555555] focus:border-[#FF4500] outline-none transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 h-10 rounded-lg border border-[#333333] text-sm text-[#888888] hover:text-[#F5F5F5] hover:bg-[#252525] transition-colors font-semibold">
            <Filter size={16} /> Filters
          </button>
        </div>

        {/* Jobs Table */}
        <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl shadow-card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#1A1A1A] border-b border-[#2A2A2A]">
                {["Job ID", "Customer", "Category", "Location", "Posted", "Bids", "Worker", "Status", ""].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#888888] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((j) => (
                <tr key={j.id} className="border-b border-[#2A2A2A] last:border-0 hover:bg-[#242424] transition-colors h-16 cursor-pointer" onClick={() => setSelectedJob(j.id)}>
                  <td className="px-4 text-sm text-[#FF4500] font-mono font-semibold">#{j.id}</td>
                  <td className="px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[rgba(255,69,0,0.12)] flex items-center justify-center text-[10px] text-[#FF4500] font-semibold">{j.custInit}</div>
                      <span className="text-sm text-[#F5F5F5]">{j.customer}</span>
                    </div>
                  </td>
                  <td className="px-4">
                    <span className="px-2 py-0.5 rounded text-xs font-semibold" style={{ backgroundColor: categoryColors[j.category]?.bg, color: categoryColors[j.category]?.text }}>
                      {j.category}
                    </span>
                  </td>
                  <td className="px-4">
                    <div className="flex items-center gap-1 text-xs text-[#888888]">
                      <MapPin size={12} className="text-[#555555] shrink-0" />
                      <span className="truncate max-w-[140px]">{j.location}</span>
                    </div>
                  </td>
                  <td className="px-4 text-xs text-[#888888]">{j.posted}</td>
                  <td className="px-4">
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold ${j.bids > 0 ? 'bg-[rgba(255,69,0,0.12)] text-[#FF4500]' : 'bg-[#252525] text-[#555555]'}`}>
                      {j.bids}
                    </span>
                  </td>
                  <td className="px-4">
                    {j.worker ? (
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[rgba(56,189,248,0.12)] flex items-center justify-center text-[9px] text-[#38BDF8] font-semibold">{j.workerInit}</div>
                        <span className="text-xs text-[#F5F5F5]">{j.worker}</span>
                      </div>
                    ) : (
                      <span className="text-xs text-[#555555]">Unassigned</span>
                    )}
                  </td>
                  <td className="px-4">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold border" style={{ backgroundColor: statusColors[j.status]?.bg, color: statusColors[j.status]?.text, borderColor: statusColors[j.status]?.border }}>
                      {j.status}
                    </span>
                  </td>
                  <td className="px-4">
                    <ChevronRight size={16} className="text-[#555555]" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Job Detail Drawer */}
      {selectedJob && job && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedJob(null)} />
          <div className="relative w-[480px] bg-[#1E1E1E] h-full border-l border-[#2A2A2A] overflow-y-auto animate-in slide-in-from-right duration-300">
            <div className="sticky top-0 bg-[#1E1E1E] border-b border-[#2A2A2A] px-6 py-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <h4 className="font-['Poppins'] text-lg text-[#F5F5F5] font-semibold">Job #{job.id}</h4>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold border" style={{ backgroundColor: statusColors[job.status]?.bg, color: statusColors[job.status]?.text, borderColor: statusColors[job.status]?.border }}>
                  {job.status}
                </span>
              </div>
              <button onClick={() => setSelectedJob(null)} className="p-2 rounded-lg hover:bg-[#252525] transition-colors">
                <X size={18} className="text-[#888888]" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: categoryColors[job.category]?.bg }}>
                    <Briefcase size={24} style={{ color: categoryColors[job.category]?.text }} />
                  </div>
                  <div>
                    <div className="text-base text-[#F5F5F5] font-semibold">{job.category}</div>
                    <div className="text-sm text-[#888888]">{job.amount}</div>
                  </div>
                </div>
                <div className="bg-[#252525] rounded-lg p-4 text-sm text-[#C0C0C0]">{job.desc}</div>
                <div className="flex items-center gap-1.5 mt-3 text-sm text-[#888888]">
                  <MapPin size={14} className="text-[#555555]" /> {job.location}
                </div>
                <div className="flex items-center gap-4 mt-2 text-xs text-[#555555]">
                  <span className="flex items-center gap-1"><Clock size={12} /> {job.posted}</span>
                </div>
              </div>

              <div>
                <h5 className="text-xs text-[#888888] mb-3 font-semibold uppercase tracking-wider">Customer</h5>
                <div className="flex items-center gap-3 p-3 bg-[#252525] rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-[rgba(255,69,0,0.12)] flex items-center justify-center text-sm text-[#FF4500] font-semibold">{job.custInit}</div>
                  <div className="flex-1">
                    <div className="text-sm text-[#F5F5F5] font-semibold">{job.customer}</div>
                    <div className="text-xs text-[#888888]">+92 300 XXXXXXX</div>
                  </div>
                  <button onClick={() => navigate(`/customers/C001`)} className="text-xs text-[#FF4500] font-semibold hover:text-[#FFB700]">View Profile</button>
                </div>
              </div>

              <div>
                <h5 className="text-xs text-[#888888] mb-3 font-semibold uppercase tracking-wider">Bids Received ({job.bids})</h5>
                {job.bids > 0 ? (
                  <div className="space-y-2">
                    {Array.from({ length: Math.min(job.bids, 3) }).map((_, i) => (
                      <div key={i} className={`p-3 rounded-lg border ${i === 0 && job.worker ? 'border-[rgba(34,197,94,0.3)] bg-[rgba(34,197,94,0.06)]' : 'border-[#2A2A2A] bg-[#252525]'}`}>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[rgba(56,189,248,0.12)] flex items-center justify-center text-[10px] text-[#38BDF8] font-semibold">
                            {i === 0 && job.workerInit ? job.workerInit : ["IM", "WA", "SK"][i]}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-[#F5F5F5] font-semibold">{i === 0 && job.worker ? job.worker : ["Imran Malik", "Waqas Aslam", "Sohail Khan"][i]}</span>
                              {i === 0 && job.worker && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] bg-[rgba(34,197,94,0.12)] text-[#22C55E] font-semibold">Selected</span>
                              )}
                            </div>
                            <div className="text-xs text-[#555555] italic mt-0.5">Ready to work, have experience.</div>
                          </div>
                          <div className="text-base font-['Poppins'] text-[#FF4500] font-bold">
                            PKR {(2000 + i * 500).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-[#555555] text-sm">No bids yet</div>
                )}
              </div>

              <div>
                <h5 className="text-xs text-[#888888] mb-3 font-semibold uppercase tracking-wider">Timeline</h5>
                <div className="space-y-0">
                  {timeline.map((step, i) => (
                    <div key={step.label} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        {step.done ? (
                          <CheckCircle2 size={20} className="text-[#22C55E] shrink-0" />
                        ) : (
                          <Circle size={20} className="text-[#333333] shrink-0" />
                        )}
                        {i < timeline.length - 1 && (
                          <div className={`w-[2px] h-8 ${step.done ? 'bg-[#22C55E]' : 'border-l-2 border-dashed border-[#333333]'}`} />
                        )}
                      </div>
                      <div className="pb-4">
                        <div className={`text-sm font-semibold ${step.done ? 'text-[#F5F5F5]' : 'text-[#555555]'}`}>{step.label}</div>
                        <div className="text-xs text-[#555555]">{step.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-[#1E1E1E] border-t border-[#2A2A2A] px-6 py-4 flex gap-3">
              <button className="px-4 h-9 rounded-lg border border-[#FF6B6B] text-[#FF6B6B] text-sm font-semibold hover:bg-[rgba(255,69,0,0.08)] transition-colors">
                Cancel Job
              </button>
              <button className="px-4 h-9 rounded-lg border border-[#38BDF8] text-[#38BDF8] text-sm font-semibold hover:bg-[rgba(56,189,248,0.08)] transition-colors">
                Reassign Worker
              </button>
              <button className="px-4 h-9 rounded-lg bg-[#22C55E] text-white text-sm font-semibold hover:bg-[#16A34A] transition-colors ml-auto">
                Mark Complete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
