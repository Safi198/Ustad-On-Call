import { useState } from "react";
import { TopBar } from "../components/layout/TopBar";
import { Search, Eye, TrendingUp, TrendingDown } from "lucide-react";

const bids = [
  { bidId: "B0501", jobId: "UC1042", worker: "Ali Ustad", workerInit: "AU", amount: 2500, budget: 3000, status: "Accepted", time: "Mar 8, 11:30 AM" },
  { bidId: "B0502", jobId: "UC1042", worker: "Imran Malik", workerInit: "IM", amount: 2800, budget: 3000, status: "Rejected", time: "Mar 8, 11:45 AM" },
  { bidId: "B0503", jobId: "UC1041", worker: "Kamran Shah", workerInit: "KS", amount: 1600, budget: 1800, status: "Pending Review", time: "Mar 8, 12:00 PM" },
  { bidId: "B0504", jobId: "UC1041", worker: "Waqas Aslam", workerInit: "WA", amount: 2000, budget: 1800, status: "Pending Review", time: "Mar 8, 12:15 PM" },
  { bidId: "B0505", jobId: "UC1038", worker: "Ali Ustad", workerInit: "AU", amount: 3800, budget: 4000, status: "Accepted", time: "Mar 7, 3:00 PM" },
  { bidId: "B0506", jobId: "UC1037", worker: "Kamran Shah", workerInit: "KS", amount: 2200, budget: 2500, status: "Accepted", time: "Mar 7, 4:30 PM" },
  { bidId: "B0507", jobId: "UC1036", worker: "Naveed Iqbal", workerInit: "NI", amount: 1100, budget: 1200, status: "Pending Review", time: "Mar 7, 5:00 PM" },
  { bidId: "B0508", jobId: "UC1035", worker: "Tariq Mehmood", workerInit: "TM", amount: 14000, budget: 15000, status: "Accepted", time: "Mar 6, 10:00 AM" },
  { bidId: "B0509", jobId: "UC1040", worker: "Naveed Iqbal", workerInit: "NI", amount: 3200, budget: 3500, status: "Accepted", time: "Mar 6, 2:00 PM" },
  { bidId: "B0510", jobId: "UC1039", worker: "Faisal Raza", workerInit: "FR", amount: 1800, budget: 1500, status: "Withdrawn", time: "Mar 6, 3:00 PM" },
];

const statusColors: Record<string, { bg: string; text: string; border: string }> = {
  "Pending Review": { bg: "rgba(56,189,248,0.12)", text: "#38BDF8", border: "rgba(56,189,248,0.2)" },
  Accepted: { bg: "rgba(34,197,94,0.12)", text: "#22C55E", border: "rgba(34,197,94,0.2)" },
  Rejected: { bg: "rgba(255,69,0,0.12)", text: "#FF6B6B", border: "rgba(255,69,0,0.2)" },
  Withdrawn: { bg: "rgba(136,136,136,0.12)", text: "#888888", border: "rgba(136,136,136,0.2)" },
};

export function BiddingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = bids.filter((b) => {
    if (statusFilter !== "All" && b.status !== statusFilter) return false;
    return b.bidId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.jobId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.worker.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <>
      <TopBar title="Bidding Activity" subtitle="Bidding" />
      <div className="p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-[400px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555555]" />
            <input
              type="text"
              placeholder="Search by Bid ID, Job ID, or Worker..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-lg bg-[#252525] border border-[#333333] pl-10 pr-4 text-sm text-[#F5F5F5] placeholder:text-[#555555] focus:border-[#FF4500] outline-none transition-all"
            />
          </div>
          <div className="flex bg-[#252525] rounded-lg p-1 gap-1">
            {["All", "Pending Review", "Accepted", "Rejected", "Withdrawn"].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${statusFilter === s ? 'bg-[#FF4500] text-white' : 'text-[#888888] hover:text-[#F5F5F5]'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl shadow-card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#1A1A1A] border-b border-[#2A2A2A]">
                {["Bid ID", "Job ID", "Worker", "Bid Amount", "Customer Budget", "Variance", "Status", "Timestamp", ""].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#888888] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((bid) => {
                const variance = ((bid.amount - bid.budget) / bid.budget) * 100;
                const isUnder = variance <= 0;
                return (
                  <tr
                    key={bid.bidId}
                    className={`border-b border-[#2A2A2A] last:border-0 hover:bg-[#242424] transition-colors h-16 ${bid.status === "Accepted" ? 'border-l-[3px] border-l-[#22C55E]' : ''}`}
                  >
                    <td className="px-4 text-sm text-[#888888] font-mono">{bid.bidId}</td>
                    <td className="px-4 text-sm text-[#FF4500] font-mono font-semibold">#{bid.jobId}</td>
                    <td className="px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[rgba(255,69,0,0.12)] flex items-center justify-center text-[10px] text-[#FF4500] font-semibold">{bid.workerInit}</div>
                        <span className="text-sm text-[#F5F5F5]">{bid.worker}</span>
                      </div>
                    </td>
                    <td className="px-4 text-sm text-[#F5F5F5] font-semibold">PKR {bid.amount.toLocaleString()}</td>
                    <td className="px-4 text-sm text-[#888888]">PKR {bid.budget.toLocaleString()}</td>
                    <td className="px-4">
                      <div className={`flex items-center gap-1 text-xs font-semibold ${isUnder ? 'text-[#22C55E]' : 'text-[#FF6B6B]'}`}>
                        {isUnder ? <TrendingDown size={14} /> : <TrendingUp size={14} />}
                        {variance > 0 ? "+" : ""}{variance.toFixed(1)}%
                      </div>
                    </td>
                    <td className="px-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold border" style={{ backgroundColor: statusColors[bid.status]?.bg, color: statusColors[bid.status]?.text, borderColor: statusColors[bid.status]?.border }}>
                        {bid.status}
                      </span>
                    </td>
                    <td className="px-4 text-xs text-[#888888]">{bid.time}</td>
                    <td className="px-4">
                      <button className="p-1.5 rounded-md hover:bg-[#252525] transition-colors group">
                        <Eye size={16} className="text-[#888888] group-hover:text-[#FF4500]" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
