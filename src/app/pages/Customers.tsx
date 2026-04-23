import { useState } from "react";
import { TopBar } from "../components/layout/TopBar";
import { useNavigate } from "react-router";
import { 
  Search, Filter, Eye, Pencil, MoreHorizontal, ChevronLeft, ChevronRight, 
  ArrowUpDown, X, Plus, Upload, Ban, Trash2, KeyRound, Pause
} from "lucide-react";

const customers = [
  { id: "C001", name: "Hamza Ali", phone: "+92 300 1111222", city: "Lahore", requests: 12, spent: "PKR 24,500", status: "Active", joined: "Jan 5, 2026", initials: "HA" },
  { id: "C002", name: "Fatima Noor", phone: "+92 301 3334444", city: "Karachi", requests: 8, spent: "PKR 16,200", status: "Active", joined: "Feb 12, 2026", initials: "FN" },
  { id: "C003", name: "Bilal Ahmed", phone: "+92 312 5556666", city: "Islamabad", requests: 15, spent: "PKR 31,800", status: "Active", joined: "Nov 20, 2025", initials: "BA" },
  { id: "C004", name: "Ayesha Khan", phone: "+92 333 7778888", city: "Rawalpindi", requests: 3, spent: "PKR 5,400", status: "Pending", joined: "Mar 1, 2026", initials: "AK" },
  { id: "C005", name: "Usman Tariq", phone: "+92 345 9990000", city: "Faisalabad", requests: 22, spent: "PKR 48,700", status: "Active", joined: "Sep 15, 2025", initials: "UT" },
  { id: "C006", name: "Sana Malik", phone: "+92 300 2223333", city: "Multan", requests: 6, spent: "PKR 11,300", status: "Active", joined: "Dec 8, 2025", initials: "SM" },
  { id: "C007", name: "Rehan Shah", phone: "+92 321 4445555", city: "Peshawar", requests: 9, spent: "PKR 19,600", status: "Active", joined: "Jan 22, 2026", initials: "RS" },
  { id: "C008", name: "Zainab Bibi", phone: "+92 311 6667777", city: "Lahore", requests: 4, spent: "PKR 8,900", status: "Blocked", joined: "Feb 28, 2026", initials: "ZB" },
];

const statusColors: Record<string, { bg: string; text: string; border: string }> = {
  Active: { bg: "rgba(34,197,94,0.12)", text: "#22C55E", border: "rgba(34,197,94,0.2)" },
  Pending: { bg: "rgba(255,183,0,0.12)", text: "#FFB700", border: "rgba(255,183,0,0.2)" },
  Blocked: { bg: "rgba(255,69,0,0.12)", text: "#FF6B6B", border: "rgba(255,69,0,0.2)" },
};

export function CustomersPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Pending Approval");
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState<string | null>(null);
  const [showEditDrawer, setShowEditDrawer] = useState<string | null>(null);
  
  const tabs = ["Pending Approval", "All Customers", "Active", "Blocked/Suspended"];

  const filtered = customers.filter((c) => {
    if (activeTab === "Pending Approval" && c.status !== "Pending") return false;
    if (activeTab === "All Customers") return true;
    if (activeTab === "Active" && c.status !== "Active") return false;
    if (activeTab === "Blocked/Suspended" && c.status !== "Blocked") return false;
    return c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.city.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const pendingCount = customers.filter(c => c.status === "Pending").length;

  return (
    <>
      <TopBar title="Customers" subtitle="Customers" />
      <div className="p-8 space-y-6">
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
            <button 
              onClick={() => setShowFilterDrawer(true)}
              className="flex items-center gap-2 px-4 h-10 rounded-lg border border-[#333333] text-sm text-[#888888] hover:text-[#F5F5F5] hover:bg-[#252525] transition-colors font-semibold"
            >
              <Filter size={16} /> Filter
            </button>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555555]" />
              <input
                type="text"
                placeholder="Search customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-[200px] rounded-lg bg-[#252525] border border-[#333333] pl-10 pr-4 text-sm text-[#F5F5F5] placeholder:text-[#555555] focus:border-[#FF4500] focus:outline-none transition-all"
              />
            </div>
            <button 
              onClick={() => setShowAddCustomer(true)}
              className="flex items-center gap-2 px-4 h-10 rounded-lg bg-[#FF4500] text-white text-sm font-semibold hover:bg-[#E03E00] transition-all"
            >
              <Plus size={16} /> Add Customer
            </button>
          </div>
        </div>

        <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl shadow-card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#1A1A1A] border-b border-[#2A2A2A]">
                {["Customer", "Phone", "City", "Total Requests", "Total Spent", "Status", "Joined", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-[#888888] uppercase tracking-wider">
                    <div className="flex items-center gap-1 cursor-pointer hover:text-[#F5F5F5]">
                      {h} {!["Actions"].includes(h) && <ArrowUpDown size={12} />}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-b border-[#2A2A2A] last:border-0 hover:bg-[#242424] transition-colors h-16">
                  <td className="px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[rgba(255,69,0,0.12)] flex items-center justify-center text-xs text-[#FF4500] font-semibold">
                        {c.initials}
                      </div>
                      <span className="text-sm text-[#F5F5F5] font-semibold">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-5 text-sm text-[#888888]">{c.phone}</td>
                  <td className="px-5 text-sm text-[#888888]">{c.city}</td>
                  <td className="px-5 text-sm text-[#38BDF8] font-semibold">{c.requests}</td>
                  <td className="px-5 text-sm text-[#F5F5F5] font-semibold">{c.spent}</td>
                  <td className="px-5">
                    <span 
                      className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold border"
                      style={{
                        backgroundColor: statusColors[c.status]?.bg,
                        color: statusColors[c.status]?.text,
                        borderColor: statusColors[c.status]?.border,
                      }}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="px-5 text-sm text-[#888888]">{c.joined}</td>
                  <td className="px-5">
                    <div className="flex items-center gap-1">
                      <button 
                        onClick={() => navigate(`/dashboard/customers/profile`)}
                        className="p-1.5 rounded-md hover:bg-[#252525] transition-colors group"
                      >
                        <Eye size={16} className="text-[#888888] group-hover:text-[#FF4500]" />
                      </button>
                      <button 
                        onClick={() => setShowEditDrawer(c.id)}
                        className="p-1.5 rounded-md hover:bg-[#252525] transition-colors group"
                      >
                        <Pencil size={16} className="text-[#888888] group-hover:text-[#FF4500]" />
                      </button>
                      <div className="relative">
                        <button 
                          onClick={() => setShowContextMenu(showContextMenu === c.id ? null : c.id)}
                          className="p-1.5 rounded-md hover:bg-[#252525] transition-colors group"
                        >
                          <MoreHorizontal size={16} className="text-[#888888] group-hover:text-[#FF4500]" />
                        </button>
                        
                        {/* Context Menu */}
                        {showContextMenu === c.id && (
                          <div className="absolute right-0 top-full mt-1 w-48 bg-[#252525] border border-[#333333] rounded-lg shadow-dropdown z-50 py-1 animate-in slide-in-from-top-2 duration-150">
                            <button 
                              onClick={() => {
                                navigate(`/dashboard/customers/profile`);
                                setShowContextMenu(null);
                              }}
                              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#F5F5F5] hover:bg-[#1E1E1E] transition-colors"
                            >
                              <Eye size={16} className="text-[#888888]" />
                              View Profile
                            </button>
                            <button 
                              onClick={() => {
                                setShowEditDrawer(c.id);
                                setShowContextMenu(null);
                              }}
                              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#F5F5F5] hover:bg-[#1E1E1E] transition-colors"
                            >
                              <Pencil size={16} className="text-[#888888]" />
                              Edit Details
                            </button>
                            <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#F5F5F5] hover:bg-[#1E1E1E] transition-colors">
                              <KeyRound size={16} className="text-[#888888]" />
                              Reset Password
                            </button>
                            <div className="my-1 border-t border-[#333333]" />
                            <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#FFB700] hover:bg-[#1E1E1E] transition-colors">
                              <Pause size={16} />
                              Suspend Account
                            </button>
                            <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#FF4500] hover:bg-[#1E1E1E] transition-colors">
                              <Ban size={16} />
                              Block Customer
                            </button>
                            <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-[#FF4500] hover:bg-[#1E1E1E] transition-colors">
                              <Trash2 size={16} />
                              Delete Account
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
            <span className="text-sm text-[#888888]">Showing 1-{filtered.length} of {filtered.length}</span>
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

      {/* Add Customer Modal */}
      {showAddCustomer && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-2xl p-8 w-full max-w-2xl shadow-modal animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-['Poppins'] font-bold text-[#F5F5F5]">Add New Customer</h3>
              <button onClick={() => setShowAddCustomer(false)} className="p-1 hover:bg-[#252525] rounded-lg transition-colors">
                <X className="w-5 h-5 text-[#888888]" />
              </button>
            </div>
            
            <form className="space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-[#F5F5F5] mb-2">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter full name"
                    className="w-full h-11 px-4 bg-[#252525] border border-[#333333] rounded-lg text-[#F5F5F5] placeholder:text-[#555555] focus:border-[#FF4500] focus:outline-none focus:ring-2 focus:ring-[rgba(255,69,0,0.25)] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#F5F5F5] mb-2">Phone Number</label>
                  <input
                    type="text"
                    placeholder="+92 300 0000000"
                    className="w-full h-11 px-4 bg-[#252525] border border-[#333333] rounded-lg text-[#F5F5F5] placeholder:text-[#555555] focus:border-[#FF4500] focus:outline-none focus:ring-2 focus:ring-[rgba(255,69,0,0.25)] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#F5F5F5] mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="customer@email.com"
                  className="w-full h-11 px-4 bg-[#252525] border border-[#333333] rounded-lg text-[#F5F5F5] placeholder:text-[#555555] focus:border-[#FF4500] focus:outline-none focus:ring-2 focus:ring-[rgba(255,69,0,0.25)] transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#F5F5F5] mb-2">City</label>
                <select className="w-full h-11 px-4 bg-[#252525] border border-[#333333] rounded-lg text-[#F5F5F5] focus:border-[#FF4500] focus:outline-none focus:ring-2 focus:ring-[rgba(255,69,0,0.25)] transition-all">
                  <option>Select city</option>
                  <option>Karachi</option>
                  <option>Lahore</option>
                  <option>Islamabad</option>
                  <option>Rawalpindi</option>
                  <option>Faisalabad</option>
                  <option>Multan</option>
                  <option>Peshawar</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-[#F5F5F5] mb-2">Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full h-11 px-4 bg-[#252525] border border-[#333333] rounded-lg text-[#F5F5F5] placeholder:text-[#555555] focus:border-[#FF4500] focus:outline-none focus:ring-2 focus:ring-[rgba(255,69,0,0.25)] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#F5F5F5] mb-2">Confirm Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full h-11 px-4 bg-[#252525] border border-[#333333] rounded-lg text-[#F5F5F5] placeholder:text-[#555555] focus:border-[#FF4500] focus:outline-none focus:ring-2 focus:ring-[rgba(255,69,0,0.25)] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#F5F5F5] mb-2">Profile Photo</label>
                <div className="border-2 border-dashed border-[#333333] rounded-lg p-8 text-center hover:border-[#FF4500] transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-[#888888]" />
                  <p className="text-sm text-[#888888] mb-1">Click to upload or drag and drop</p>
                  <p className="text-xs text-[#555555]">PNG, JPG up to 5MB</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="active" className="w-4 h-4 rounded border-[#333333] bg-[#252525] text-[#FF4500]" />
                <label htmlFor="active" className="text-sm text-[#C0C0C0]">Account Active</label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddCustomer(false)}
                  className="flex-1 h-11 px-4 rounded-lg border border-[#333333] text-[#F5F5F5] font-semibold hover:bg-[#252525] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowAddCustomer(false);
                  }}
                  className="flex-1 h-11 px-4 rounded-lg bg-[#FF4500] hover:bg-[#E03E00] text-white font-semibold transition-all active:scale-[0.98]"
                >
                  Create Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Filter Drawer */}
      {showFilterDrawer && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setShowFilterDrawer(false)} />
          <div className="fixed right-0 top-0 bottom-0 w-80 bg-[#1E1E1E] border-l border-[#2A2A2A] shadow-modal z-50 animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-[#2A2A2A]">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-['Poppins'] font-bold text-[#F5F5F5]">Filters</h3>
                <button onClick={() => setShowFilterDrawer(false)} className="p-1 hover:bg-[#252525] rounded-lg">
                  <X className="w-5 h-5 text-[#888888]" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6 overflow-y-auto" style={{ height: "calc(100% - 140px)" }}>
              <div>
                <label className="block text-sm font-medium text-[#F5F5F5] mb-2">City/Area</label>
                <select className="w-full h-10 px-3 bg-[#252525] border border-[#333333] rounded-lg text-[#F5F5F5] text-sm">
                  <option>All Cities</option>
                  <option>Karachi</option>
                  <option>Lahore</option>
                  <option>Islamabad</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#F5F5F5] mb-2">Status</label>
                <div className="space-y-2">
                  {["Active", "Pending", "Blocked"].map((s) => (
                    <label key={s} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded border-[#333333] bg-[#252525] text-[#FF4500]" />
                      <span className="text-sm text-[#C0C0C0]">{s}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-[#2A2A2A] bg-[#1E1E1E]">
              <div className="flex gap-3">
                <button className="flex-1 h-10 px-4 rounded-lg border border-[#333333] text-[#F5F5F5] text-sm font-semibold hover:bg-[#252525]">
                  Reset
                </button>
                <button className="flex-1 h-10 px-4 rounded-lg bg-[#FF4500] hover:bg-[#E03E00] text-white text-sm font-semibold">
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Close context menu when clicking outside */}
      {showContextMenu && (
        <div className="fixed inset-0 z-40" onClick={() => setShowContextMenu(null)} />
      )}
    </>
  );
}