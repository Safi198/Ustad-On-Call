import { useState } from "react";
import { TopBar } from "../components/layout/TopBar";
import { Wallet, Clock, AlertTriangle, Check } from "lucide-react";

const payoutWorkers = [
  { id: "W001", name: "Ali Ustad", initials: "AU", category: "Electrician", jobs: 8, gross: 16400, commission: 2460, net: 13940, lastPayout: "Mar 1, 2026", status: "Pending" },
  { id: "W002", name: "Kamran Shah", initials: "KS", category: "Plumber", jobs: 5, gross: 11000, commission: 1650, net: 9350, lastPayout: "Mar 1, 2026", status: "Pending" },
  { id: "W003", name: "Naveed Iqbal", initials: "NI", category: "AC Technician", jobs: 12, gross: 38400, commission: 5760, net: 32640, lastPayout: "Feb 28, 2026", status: "Pending" },
  { id: "W005", name: "Tariq Mehmood", initials: "TM", category: "Painter", jobs: 3, gross: 45000, commission: 6750, net: 38250, lastPayout: "Feb 25, 2026", status: "Overdue" },
  { id: "W007", name: "Waqas Aslam", initials: "WA", category: "Plumber", jobs: 6, gross: 13200, commission: 1980, net: 11220, lastPayout: "Mar 2, 2026", status: "Pending" },
  { id: "W008", name: "Imran Malik", initials: "IM", category: "AC Technician", jobs: 10, gross: 32000, commission: 4800, net: 27200, lastPayout: "Feb 28, 2026", status: "Processed" },
  { id: "W010", name: "Zubair Ahmed", initials: "ZA", category: "Painter", jobs: 4, gross: 20000, commission: 3000, net: 17000, lastPayout: "Mar 3, 2026", status: "Pending" },
];

const statusColors: Record<string, { bg: string; text: string; border: string }> = {
  Pending: { bg: "rgba(255,183,0,0.12)", text: "#FFB700", border: "rgba(255,183,0,0.2)" },
  Processed: { bg: "rgba(34,197,94,0.12)", text: "#22C55E", border: "rgba(34,197,94,0.2)" },
  Overdue: { bg: "rgba(255,69,0,0.12)", text: "#FF6B6B", border: "rgba(255,69,0,0.2)" },
};

const categoryColors: Record<string, { bg: string; text: string }> = {
  Electrician: { bg: "rgba(255,69,0,0.12)", text: "#FF4500" },
  Plumber: { bg: "rgba(56,189,248,0.12)", text: "#38BDF8" },
  "AC Technician": { bg: "rgba(34,197,94,0.12)", text: "#22C55E" },
  Painter: { bg: "rgba(255,183,0,0.12)", text: "#FFB700" },
};

const tabs = ["All", "Pending", "Processed", "Overdue"];

export function PayoutsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedWorkers, setSelectedWorkers] = useState<string[]>([]);

  const filtered = payoutWorkers.filter((w) => {
    if (activeTab !== "All" && w.status !== activeTab) return false;
    return true;
  });

  const pendingTotal = payoutWorkers.filter((w) => w.status === "Pending").reduce((a, b) => a + b.net, 0);
  const pendingCount = payoutWorkers.filter((w) => w.status === "Pending").length;
  const overdueCount = payoutWorkers.filter((w) => w.status === "Overdue").length;

  const toggleWorker = (id: string) => {
    setSelectedWorkers((prev) => prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]);
  };

  const selectedTotal = payoutWorkers.filter((w) => selectedWorkers.includes(w.id)).reduce((a, b) => a + b.net, 0);

  return (
    <>
      <TopBar title="Worker Payouts" subtitle="Payouts" />
      <div className="p-8 space-y-6">
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-[rgba(255,183,0,0.12)] flex items-center justify-center">
              <Wallet size={20} className="text-[#FFB700]" />
            </div>
            <div>
              <div className="font-['Poppins'] text-xl text-[#F5F5F5] font-bold">PKR {pendingTotal.toLocaleString()}</div>
              <div className="text-xs text-[#888888]">Total Pending</div>
            </div>
          </div>
          <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-[rgba(56,189,248,0.12)] flex items-center justify-center">
              <Clock size={20} className="text-[#38BDF8]" />
            </div>
            <div>
              <div className="font-['Poppins'] text-xl text-[#F5F5F5] font-bold">{pendingCount}</div>
              <div className="text-xs text-[#888888]">Workers Awaiting</div>
            </div>
          </div>
          <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-[rgba(255,69,0,0.12)] flex items-center justify-center">
              <AlertTriangle size={20} className="text-[#FF6B6B]" />
            </div>
            <div>
              <div className="font-['Poppins'] text-xl text-[#FF6B6B] font-bold">{overdueCount}</div>
              <div className="text-xs text-[#888888]">Overdue (&gt;7 days)</div>
            </div>
          </div>
        </div>

        <div className="flex bg-[#252525] rounded-lg p-1 gap-1 w-fit">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${activeTab === t ? 'bg-[#FF4500] text-white' : 'text-[#888888] hover:text-[#F5F5F5]'}`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filtered.map((worker) => (
            <div
              key={worker.id}
              className={`bg-[#1E1E1E] border rounded-xl p-5 transition-all flex items-center gap-5 ${
                selectedWorkers.includes(worker.id) ? 'border-l-[3px] border-l-[#FF4500] border-t-[#2A2A2A] border-r-[#2A2A2A] border-b-[#2A2A2A] bg-[rgba(255,69,0,0.04)]' : 'border-[#2A2A2A] border-l-[3px] border-l-transparent hover:border-l-[#333333]'
              }`}
            >
              {worker.status !== "Processed" && (
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-[#333333] bg-[#252525] accent-[#FF4500] shrink-0"
                  checked={selectedWorkers.includes(worker.id)}
                  onChange={() => toggleWorker(worker.id)}
                />
              )}
              <div className="flex items-center gap-3 w-[200px] shrink-0">
                <div className="w-10 h-10 rounded-full bg-[rgba(255,69,0,0.12)] flex items-center justify-center text-sm text-[#FF4500] font-semibold">
                  {worker.initials}
                </div>
                <div>
                  <div className="text-sm text-[#F5F5F5] font-semibold">{worker.name}</div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold" style={{ backgroundColor: categoryColors[worker.category]?.bg, color: categoryColors[worker.category]?.text }}>
                    {worker.category}
                  </span>
                </div>
              </div>

              <div className="flex-1 grid grid-cols-4 gap-4">
                <div>
                  <div className="text-xs text-[#555555]">Completed Jobs</div>
                  <div className="text-sm text-[#F5F5F5] font-semibold">{worker.jobs} jobs</div>
                </div>
                <div>
                  <div className="text-xs text-[#555555]">Gross Earned</div>
                  <div className="text-sm text-[#F5F5F5]">PKR {worker.gross.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs text-[#555555]">Commission (15%)</div>
                  <div className="text-sm text-[#FF6B6B]">- PKR {worker.commission.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs text-[#555555]">Net Payable</div>
                  <div className="font-['Poppins'] text-lg text-[#FF4500] font-bold">PKR {worker.net.toLocaleString()}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <div className="text-xs text-[#555555]">Last payout</div>
                  <div className="text-xs text-[#888888]">{worker.lastPayout}</div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold border" style={{ backgroundColor: statusColors[worker.status]?.bg, color: statusColors[worker.status]?.text, borderColor: statusColors[worker.status]?.border }}>
                  {worker.status}
                </span>
                {worker.status === "Pending" || worker.status === "Overdue" ? (
                  <button className="px-4 h-9 rounded-lg bg-[#22C55E] text-white text-xs font-semibold hover:bg-[#16A34A] transition-colors">
                    Process Payout
                  </button>
                ) : (
                  <button className="px-4 h-9 rounded-lg border border-[#333333] text-xs text-[#888888] hover:bg-[#252525] font-semibold">
                    View History
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {selectedWorkers.length > 0 && (
          <div className="fixed bottom-0 left-[260px] right-0 bg-[#1E1E1E] border-t border-[#2A2A2A] px-8 py-4 flex items-center justify-between z-40">
            <div className="text-sm text-[#F5F5F5]">
              <span className="font-semibold">{selectedWorkers.length} workers</span> selected — Total: <span className="font-['Poppins'] text-[#FF4500] font-bold">PKR {selectedTotal.toLocaleString()}</span>
            </div>
            <button className="px-6 h-10 rounded-lg bg-[#FF4500] text-white text-sm font-semibold hover:bg-[#E03E00] transition-colors">
              Process Selected Payouts
            </button>
          </div>
        )}
      </div>
    </>
  );
}
