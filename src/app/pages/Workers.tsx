import { useState } from "react";
import { TopBar } from "../components/layout/TopBar";
import { useNavigate } from "react-router";
import {
  Search, Filter, Plus, Eye, Pencil, MoreHorizontal,
  Star, ChevronLeft, ChevronRight, X, Check, Ban,
  MapPin, Phone, Mail, FileText, ArrowUpDown, Trash2, Pause, KeyRound, Upload
} from "lucide-react";

const workers = [
  { id: "W001", name: "Ali Ustad", phone: "+92 300 1234567", category: "Electrician", area: "Lahore", rating: 4.8, reviews: 47, jobs: 156, status: "Active", joined: "Jan 12, 2026", initials: "AU" },
  { id: "W002", name: "Kamran Shah", phone: "+92 301 9876543", category: "Plumber", area: "Karachi", rating: 4.5, reviews: 32, jobs: 98, status: "Active", joined: "Feb 3, 2026", initials: "KS" },
  { id: "W003", name: "Naveed Iqbal", phone: "+92 312 4567890", category: "AC Technician", area: "Islamabad", rating: 4.9, reviews: 61, jobs: 203, status: "Active", joined: "Dec 15, 2025", initials: "NI" },
  { id: "W004", name: "Faisal Raza", phone: "+92 333 1112233", category: "Mechanic", area: "Rawalpindi", rating: 3.8, reviews: 15, jobs: 42, status: "Pending", joined: "Mar 5, 2026", initials: "FR" },
  { id: "W005", name: "Tariq Mehmood", phone: "+92 345 6789012", category: "Painter", area: "Faisalabad", rating: 4.2, reviews: 28, jobs: 74, status: "Active", joined: "Nov 20, 2025", initials: "TM" },
  { id: "W006", name: "Hassan Javed", phone: "+92 300 5556677", category: "Electrician", area: "Multan", rating: 4.6, reviews: 38, jobs: 112, status: "Suspended", joined: "Oct 8, 2025", initials: "HJ" },
  { id: "W007", name: "Waqas Aslam", phone: "+92 321 3334455", category: "Plumber", area: "Lahore", rating: 4.3, reviews: 22, jobs: 67, status: "Active", joined: "Jan 28, 2026", initials: "WA" },
  { id: "W008", name: "Imran Malik", phone: "+92 311 7778899", category: "AC Technician", area: "Karachi", rating: 4.7, reviews: 53, jobs: 178, status: "Active", joined: "Sep 14, 2025", initials: "IM" },
  { id: "W009", name: "Sohail Khan", phone: "+92 302 4445566", category: "Mechanic", area: "Peshawar", rating: 4.1, reviews: 19, jobs: 51, status: "Pending", joined: "Mar 7, 2026", initials: "SK" },
  { id: "W010", name: "Zubair Ahmed", phone: "+92 334 8889900", category: "Painter", area: "Islamabad", rating: 4.4, reviews: 25, jobs: 83, status: "Active", joined: "Feb 18, 2026", initials: "ZA" },
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

const tabs = ["All Workers", "Pending Approval", "Active", "Suspended"];

export function WorkersPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All Workers");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [showFilter, setShowFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showContextMenu, setShowContextMenu] = useState<string | null>(null);
  const [showAddWorker, setShowAddWorker] = useState(false);

  const pendingCount = workers.filter(w => w.status === "Pending").length;

  const filteredWorkers = workers.filter((w) => {
    if (activeTab === "Pending Approval") return w.status === "Pending";
    if (activeTab === "Active") return w.status === "Active";
    if (activeTab === "Suspended") return w.status === "Suspended";
    return true;
  }).filter((w) =>
    w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.area.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  return (
    <>
      <TopBar title="Workers Management" subtitle="Workers" />
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex bg-[#252525] rounded-lg p-1 gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-md text-sm font-semibold transition-all flex items-center gap-2 ${
                    activeTab === tab
                      ? "bg-[#FF4500] text-white shadow-sm"
                      : "text-[#888888] hover:text-[#F5F5F5]"
                  }`}
                >
                  {tab}
                  {tab === "Pending Approval" && pendingCount > 0 && (
                    <span className="px-1.5 py-0.5 bg-[#FFB700] text-[#1C1C1C] rounded text-xs font-bold">
                      {pendingCount}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555555]" />
              <input
                type="text"
                placeholder="Search workers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-[220px] rounded-lg bg-[#252525] border border-[#333333] pl-10 pr-4 text-sm text-[#F5F5F5] placeholder:text-[#555555] focus:border-[#FF4500] focus:outline-none transition-all"
              />
            </div>
            <button
              onClick={() => setShowFilter(true)}
              className="flex items-center gap-2 px-4 h-10 rounded-lg border border-[#333333] text-sm text-[#888888] hover:text-[#F5F5F5] hover:bg-[#252525] transition-colors font-semibold"
            >
              <Filter size={16} /> Filter
            </button>
            <button className="flex items-center gap-2 px-4 h-10 rounded-lg bg-[#FF4500] text-white text-sm font-semibold hover:bg-[#E03E00] transition-all" onClick={() => setShowAddWorker(true)}>
              <Plus size={16} /> Add Worker
            </button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedRows.length > 0 && (
          <div className="flex items-center gap-4 px-6 py-3 bg-[rgba(255,69,0,0.08)] border border-[rgba(255,69,0,0.2)] rounded-lg">
            <span className="text-sm text-[#FF4500] font-semibold">{selectedRows.length} selected</span>
            <div className="flex gap-2 ml-auto">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#22C55E] text-white text-xs font-semibold">
                <Check size={14} /> Approve All
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#FF6B6B] text-white text-xs font-semibold">
                <Ban size={14} /> Suspend
              </button>
            </div>
          </div>
        )}

        {/* Workers Table */}
        <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl shadow-card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#1A1A1A] border-b border-[#2A2A2A]">
                <th className="px-4 py-3 w-12">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-[#333333] bg-[#252525] accent-[#FF4500]"
                    onChange={(e) => {
                      if (e.target.checked) setSelectedRows(filteredWorkers.map((w) => w.id));
                      else setSelectedRows([]);
                    }}
                    checked={selectedRows.length === filteredWorkers.length && filteredWorkers.length > 0}
                  />
                </th>
                {["Worker", "Category", "Service Area", "Rating", "Jobs Done", "Status", "Joined", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#888888] uppercase tracking-wider">
                    <div className="flex items-center gap-1 cursor-pointer hover:text-[#F5F5F5]">
                      {h} {!["Actions"].includes(h) && <ArrowUpDown size={12} />}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredWorkers.map((worker) => (
                <tr
                  key={worker.id}
                  className="border-b border-[#2A2A2A] last:border-0 hover:bg-[#242424] transition-colors h-16"
                >
                  <td className="px-4">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-[#333333] bg-[#252525] accent-[#FF4500]"
                      checked={selectedRows.includes(worker.id)}
                      onChange={() => toggleRow(worker.id)}
                    />
                  </td>
                  <td className="px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[rgba(255,69,0,0.12)] flex items-center justify-center text-xs text-[#FF4500] font-semibold shrink-0">
                        {worker.initials}
                      </div>
                      <div>
                        <div className="text-sm text-[#F5F5F5] font-semibold">{worker.name}</div>
                        <div className="text-xs text-[#888888]">{worker.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4">
                    <span
                      className="inline-block px-2.5 py-1 rounded text-xs font-semibold"
                      style={{
                        backgroundColor: categoryColors[worker.category]?.bg,
                        color: categoryColors[worker.category]?.text,
                      }}
                    >
                      {worker.category}
                    </span>
                  </td>
                  <td className="px-4 text-sm text-[#888888]">{worker.area}</td>
                  <td className="px-4">
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-[#FFB700] fill-[#FFB700]" />
                      <span className="text-sm text-[#F5F5F5] font-semibold">{worker.rating}</span>
                      <span className="text-xs text-[#888888]">({worker.reviews})</span>
                    </div>
                  </td>
                  <td className="px-4">
                    <span className="text-sm text-[#38BDF8] font-semibold">{worker.jobs}</span>
                  </td>
                  <td className="px-4">
                    <span
                      className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold border"
                      style={{
                        backgroundColor: statusColors[worker.status]?.bg,
                        color: statusColors[worker.status]?.text,
                        borderColor: statusColors[worker.status]?.border,
                      }}
                    >
                      {worker.status}
                    </span>
                  </td>
                  <td className="px-4 text-sm text-[#888888]">{worker.joined}</td>
                  <td className="px-4">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => navigate(`/workers/profile`)}
                        className="p-1.5 rounded-md hover:bg-[#252525] transition-colors group"
                      >
                        <Eye size={16} className="text-[#888888] group-hover:text-[#FF4500]" />
                      </button>
                      <button className="p-1.5 rounded-md hover:bg-[#252525] transition-colors group">
                        <Pencil size={16} className="text-[#888888] group-hover:text-[#FF4500]" />
                      </button>
                      <div className="relative">
                        <button
                          onClick={() => setShowContextMenu(showContextMenu === worker.id ? null : worker.id)}
                          className="p-1.5 rounded-md hover:bg-[#252525] transition-colors group"
                        >
                          <MoreHorizontal size={16} className="text-[#888888] group-hover:text-[#FF4500]" />
                        </button>
                        {showContextMenu === worker.id && (
                          <div className="absolute right-0 top-full mt-1 w-48 bg-[#252525] border border-[#333333] rounded-lg shadow-dropdown z-50 py-1 animate-in slide-in-from-top-2 duration-150">
                            <button onClick={() => { navigate(`/workers/profile`); setShowContextMenu(null); }} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#F5F5F5] hover:bg-[#1E1E1E] transition-colors">
                              <Eye size={16} className="text-[#888888]" /> View Profile
                            </button>
                            <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#F5F5F5] hover:bg-[#1E1E1E] transition-colors">
                              <Pencil size={16} className="text-[#888888]" /> Edit Details
                            </button>
                            <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#F5F5F5] hover:bg-[#1E1E1E] transition-colors">
                              <KeyRound size={16} className="text-[#888888]" /> Reset Password
                            </button>
                            <div className="my-1 border-t border-[#333333]" />
                            <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#FFB700] hover:bg-[#1E1E1E] transition-colors">
                              <Pause size={16} /> Suspend Account
                            </button>
                            <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#FF4500] hover:bg-[#1E1E1E] transition-colors">
                              <Ban size={16} /> Block Worker
                            </button>
                            <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#FF4500] hover:bg-[#1E1E1E] transition-colors">
                              <Trash2 size={16} /> Delete Account
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-between px-6 py-4 border-t border-[#2A2A2A]">
            <span className="text-sm text-[#888888]">Showing 1-{filteredWorkers.length} of {filteredWorkers.length}</span>
            <div className="flex items-center gap-1">
              <button className="p-2 rounded-md hover:bg-[#252525]">
                <ChevronLeft size={16} className="text-[#888888]" />
              </button>
              <button className="w-8 h-8 rounded-md bg-[#FF4500] text-white text-sm font-semibold">1</button>
              <button className="p-2 rounded-md hover:bg-[#252525]">
                <ChevronRight size={16} className="text-[#888888]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Drawer */}
      {showFilter && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowFilter(false)} />
          <div className="fixed right-0 top-0 bottom-0 w-80 bg-[#1E1E1E] border-l border-[#2A2A2A] shadow-modal z-50 animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-[#2A2A2A]">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-['Poppins'] font-bold text-[#F5F5F5]">Filters</h3>
                <button onClick={() => setShowFilter(false)} className="p-1 hover:bg-[#252525] rounded-lg">
                  <X className="w-5 h-5 text-[#888888]" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6 overflow-y-auto" style={{ height: "calc(100% - 140px)" }}>
              <div>
                <label className="block text-sm font-medium text-[#F5F5F5] mb-2">Category</label>
                <select className="w-full h-10 px-3 bg-[#252525] border border-[#333333] rounded-lg text-[#F5F5F5] text-sm">
                  <option>All Categories</option>
                  <option>Electrician</option>
                  <option>Plumber</option>
                  <option>AC Technician</option>
                  <option>Mechanic</option>
                  <option>Painter</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#F5F5F5] mb-2">City/Area</label>
                <select className="w-full h-10 px-3 bg-[#252525] border border-[#333333] rounded-lg text-[#F5F5F5] text-sm">
                  <option>All Cities</option>
                  <option>Lahore</option>
                  <option>Karachi</option>
                  <option>Islamabad</option>
                  <option>Rawalpindi</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#F5F5F5] mb-2">Status</label>
                <div className="space-y-2">
                  {["Active", "Pending", "Suspended"].map((s) => (
                    <label key={s} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded border-[#333333] bg-[#252525] accent-[#FF4500]" />
                      <span className="text-sm text-[#C0C0C0]">{s}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#F5F5F5] mb-2">Min Rating</label>
                <input type="range" min="0" max="5" step="0.5" defaultValue="0" className="w-full accent-[#FF4500]" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-[#2A2A2A] bg-[#1E1E1E]">
              <div className="flex gap-3">
                <button className="flex-1 h-10 px-4 rounded-lg border border-[#333333] text-[#F5F5F5] text-sm font-semibold hover:bg-[#252525]">
                  Reset
                </button>
                <button onClick={() => setShowFilter(false)} className="flex-1 h-10 px-4 rounded-lg bg-[#FF4500] hover:bg-[#E03E00] text-white text-sm font-semibold">
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Close context menu overlay */}
      {showContextMenu && (
        <div className="fixed inset-0 z-40" onClick={() => setShowContextMenu(null)} />
      )}

      {/* Add Worker Modal */}
      {showAddWorker && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowAddWorker(false)} />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#1E1E1E] border border-[#2A2A2A] rounded-2xl shadow-modal z-50 animate-in slide-in-from-bottom duration-300 w-full max-w-lg p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-['Poppins'] font-bold text-[#F5F5F5]">Add Worker</h3>
              <button onClick={() => setShowAddWorker(false)} className="p-1 hover:bg-[#252525] rounded-lg">
                <X className="w-5 h-5 text-[#888888]" />
              </button>
            </div>
            <div className="space-y-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-[#F5F5F5] mb-2">Name</label>
                <input type="text" className="w-full h-10 px-3 bg-[#252525] border border-[#333333] rounded-lg text-[#F5F5F5] text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#F5F5F5] mb-2">Phone</label>
                <input type="text" className="w-full h-10 px-3 bg-[#252525] border border-[#333333] rounded-lg text-[#F5F5F5] text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#F5F5F5] mb-2">Category</label>
                <select className="w-full h-10 px-3 bg-[#252525] border border-[#333333] rounded-lg text-[#F5F5F5] text-sm">
                  <option>Electrician</option>
                  <option>Plumber</option>
                  <option>AC Technician</option>
                  <option>Mechanic</option>
                  <option>Painter</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#F5F5F5] mb-2">Service Area</label>
                <select className="w-full h-10 px-3 bg-[#252525] border border-[#333333] rounded-lg text-[#F5F5F5] text-sm">
                  <option>Lahore</option>
                  <option>Karachi</option>
                  <option>Islamabad</option>
                  <option>Rawalpindi</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button className="flex-1 h-10 px-4 rounded-lg border border-[#333333] text-[#F5F5F5] text-sm font-semibold hover:bg-[#252525]">
                Cancel
              </button>
              <button className="flex-1 h-10 px-4 rounded-lg bg-[#FF4500] hover:bg-[#E03E00] text-white text-sm font-semibold">
                Add Worker
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}