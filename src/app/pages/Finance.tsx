import { useState } from "react";
import { TopBar } from "../components/layout/TopBar";
import {
  TrendingUp, Percent, Wallet, BarChart3, Download, Search, Filter, ArrowUpRight
} from "lucide-react";
import {
  Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ComposedChart
} from "recharts";

const kpis = [
  { label: "Total Platform Revenue", value: "PKR 2,84,500", trend: "+12.4%", up: true, icon: TrendingUp, color: "#FF4500" },
  { label: "15% Commission Collected", value: "PKR 42,675", trend: "", up: true, icon: Percent, color: "#FFB700", sub: "From 142 completed jobs" },
  { label: "Worker Payouts Pending", value: "PKR 18,200", trend: "", up: false, icon: Wallet, color: "#38BDF8", sub: "Process Payouts →" },
  { label: "Average Completed Job", value: "PKR 2,003", trend: "+5.2%", up: true, icon: BarChart3, color: "#22C55E" },
];

const revenueData = [
  { month: "Apr", gross: 180000, commission: 27000 },
  { month: "May", gross: 220000, commission: 33000 },
  { month: "Jun", gross: 195000, commission: 29250 },
  { month: "Jul", gross: 260000, commission: 39000 },
  { month: "Aug", gross: 310000, commission: 46500 },
  { month: "Sep", gross: 280000, commission: 42000 },
  { month: "Oct", gross: 340000, commission: 51000 },
  { month: "Nov", gross: 290000, commission: 43500 },
  { month: "Dec", gross: 380000, commission: 57000 },
  { month: "Jan", gross: 350000, commission: 52500 },
  { month: "Feb", gross: 320000, commission: 48000 },
  { month: "Mar", gross: 284500, commission: 42675 },
];

const transactions = [
  { txnId: "TXN-9001", jobId: "UC1040", customer: "Bilal Ahmed", worker: "Naveed Iqbal", gross: 3200, commission: 480, earnings: 2720, method: "JazzCash", date: "Mar 8, 2026", payout: "Paid Out" },
  { txnId: "TXN-9002", jobId: "UC1038", customer: "Usman Tariq", worker: "Ali Ustad", gross: 4000, commission: 600, earnings: 3400, method: "Bank Transfer", date: "Mar 8, 2026", payout: "Processing" },
  { txnId: "TXN-9003", jobId: "UC1037", customer: "Sana Malik", worker: "Kamran Shah", gross: 2200, commission: 330, earnings: 1870, method: "Easypaisa", date: "Mar 7, 2026", payout: "Pending" },
  { txnId: "TXN-9004", jobId: "UC1035", customer: "Zainab Bibi", worker: "Tariq Mehmood", gross: 15000, commission: 2250, earnings: 12750, method: "Bank Transfer", date: "Mar 6, 2026", payout: "Paid Out" },
  { txnId: "TXN-9005", jobId: "UC1033", customer: "Hamza Ali", worker: "Ali Ustad", gross: 2500, commission: 375, earnings: 2125, method: "JazzCash", date: "Mar 6, 2026", payout: "Paid Out" },
  { txnId: "TXN-9006", jobId: "UC1032", customer: "Rehan Shah", worker: "Imran Malik", gross: 1800, commission: 270, earnings: 1530, method: "Cash", date: "Mar 5, 2026", payout: "On Hold" },
  { txnId: "TXN-9007", jobId: "UC1030", customer: "Fatima Noor", worker: "Waqas Aslam", gross: 5500, commission: 825, earnings: 4675, method: "Easypaisa", date: "Mar 5, 2026", payout: "Paid Out" },
];

const payoutStatusColors: Record<string, { bg: string; text: string; border: string }> = {
  "Paid Out": { bg: "rgba(34,197,94,0.12)", text: "#22C55E", border: "rgba(34,197,94,0.2)" },
  Pending: { bg: "rgba(255,183,0,0.12)", text: "#FFB700", border: "rgba(255,183,0,0.2)" },
  Processing: { bg: "rgba(56,189,248,0.12)", text: "#38BDF8", border: "rgba(56,189,248,0.2)" },
  "On Hold": { bg: "rgba(255,69,0,0.12)", text: "#FF6B6B", border: "rgba(255,69,0,0.2)" },
};

const dateFilters = ["Today", "This Week", "This Month", "Custom"];

export function FinancePage() {
  const [activePeriod, setActivePeriod] = useState("This Month");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTxns = transactions.filter((t) =>
    t.txnId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.worker.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <TopBar title="Finance & Revenue" subtitle="Finance" />
      <div className="p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex bg-[#252525] rounded-lg p-1 gap-1">
            {dateFilters.map((f) => (
              <button
                key={f}
                onClick={() => setActivePeriod(f)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${activePeriod === f ? 'bg-[#FF4500] text-white' : 'text-[#888888] hover:text-[#F5F5F5]'}`}
              >
                {f}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 h-9 rounded-lg border border-[#333333] text-sm text-[#888888] hover:text-[#F5F5F5] hover:bg-[#252525] transition-colors font-semibold">
            <Download size={16} /> Export Report
          </button>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl p-5 shadow-card">
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${kpi.color}20` }}>
                  <kpi.icon size={20} style={{ color: kpi.color }} />
                </div>
                {kpi.trend && (
                  <div className={`flex items-center gap-0.5 text-xs font-semibold ${kpi.up ? 'text-[#22C55E]' : 'text-[#FF6B6B]'}`}>
                    <ArrowUpRight size={14} /> {kpi.trend}
                  </div>
                )}
              </div>
              <div className="mt-3 font-['Poppins'] text-2xl text-[#F5F5F5] font-bold">{kpi.value}</div>
              <div className="text-sm text-[#888888]">{kpi.label}</div>
              {kpi.sub && (
                <div className={`text-xs mt-1 ${kpi.sub.includes('→') ? 'text-[#FF4500] cursor-pointer hover:underline' : 'text-[#888888]'}`}>
                  {kpi.sub}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl p-6 shadow-card">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-['Poppins'] text-base text-[#F5F5F5] font-semibold">Revenue Trend</h4>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-[#FF4500] opacity-60" /> <span className="text-[#C0C0C0]">Gross Volume</span></div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-[#FFB700]" /> <span className="text-[#C0C0C0]">Net Commission</span></div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={revenueData}>
              <CartesianGrid key="fin-grid" strokeDasharray="3 3" stroke="#2A2A2A" />
              <XAxis key="fin-xaxis" dataKey="month" tick={{ fontSize: 11, fill: '#555555' }} tickLine={false} axisLine={{ stroke: '#2A2A2A' }} />
              <YAxis key="fin-yaxis" tick={{ fontSize: 11, fill: '#555555' }} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
              <Tooltip key="fin-tooltip" contentStyle={{ backgroundColor: '#252525', border: '1px solid #333333', borderRadius: 8, color: '#F5F5F5' }} formatter={(value: number, name: string) => [`PKR ${value.toLocaleString()}`, name === 'gross' ? 'Gross Volume' : 'Commission']} />
              <Bar key="gross-bar" dataKey="gross" fill="#FF4500" opacity={0.6} radius={[4, 4, 0, 0]} name="gross" />
              <Line key="commission-line" type="monotone" dataKey="commission" stroke="#FFB700" strokeWidth={2} dot={{ fill: '#FFB700', r: 4 }} name="commission" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl shadow-card">
          <div className="flex items-center justify-between p-6 pb-4">
            <h4 className="font-['Poppins'] text-base text-[#F5F5F5] font-semibold">All Transactions</h4>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555555]" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-9 w-[200px] rounded-lg bg-[#252525] border border-[#333333] pl-9 pr-3 text-xs text-[#F5F5F5] placeholder:text-[#555555] outline-none focus:border-[#FF4500]"
                />
              </div>
              <button className="flex items-center gap-1.5 px-3 h-9 rounded-lg border border-[#333333] text-xs text-[#888888] hover:bg-[#252525] font-semibold">
                <Filter size={14} /> Filter
              </button>
              <button className="flex items-center gap-1.5 px-3 h-9 rounded-lg border border-[#333333] text-xs text-[#888888] hover:bg-[#252525] font-semibold">
                <Download size={14} /> CSV
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#1A1A1A] border-b border-[#2A2A2A]">
                  {["Txn ID", "Job ID", "Customer", "Worker", "Gross", "Commission", "Earnings", "Method", "Date", "Payout"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#888888] uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredTxns.map((txn) => (
                  <tr key={txn.txnId} className="border-b border-[#2A2A2A] last:border-0 hover:bg-[#242424] transition-colors h-14">
                    <td className="px-4 text-xs text-[#FF4500] font-mono font-semibold">{txn.txnId}</td>
                    <td className="px-4 text-xs text-[#FF4500] font-mono cursor-pointer hover:underline">#{txn.jobId}</td>
                    <td className="px-4 text-sm text-[#F5F5F5]">{txn.customer}</td>
                    <td className="px-4 text-sm text-[#888888]">{txn.worker}</td>
                    <td className="px-4 text-sm text-[#F5F5F5] font-semibold">PKR {txn.gross.toLocaleString()}</td>
                    <td className="px-4 text-sm text-[#FFB700] font-semibold">PKR {txn.commission.toLocaleString()}</td>
                    <td className="px-4 text-sm text-[#22C55E] font-semibold">PKR {txn.earnings.toLocaleString()}</td>
                    <td className="px-4 text-xs text-[#888888]">{txn.method}</td>
                    <td className="px-4 text-xs text-[#888888]">{txn.date}</td>
                    <td className="px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold border" style={{ backgroundColor: payoutStatusColors[txn.payout]?.bg, color: payoutStatusColors[txn.payout]?.text, borderColor: payoutStatusColors[txn.payout]?.border }}>
                        {txn.payout}
                      </span>
                    </td>
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