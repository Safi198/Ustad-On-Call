import { TopBar } from "../components/layout/TopBar";
import { Percent, TrendingUp, ArrowUpRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const commissionData = [
  { category: "Electrical", jobs: 342, gross: 856000, commission: 128400 },
  { category: "Plumbing", jobs: 218, gross: 523000, commission: 78450 },
  { category: "AC Repair", jobs: 175, gross: 612000, commission: 91800 },
  { category: "Mechanic", jobs: 124, gross: 496000, commission: 74400 },
  { category: "Painter", jobs: 89, gross: 357000, commission: 53550 },
];

const monthlyData = [
  { month: "Oct", commission: 38000 },
  { month: "Nov", commission: 43500 },
  { month: "Dec", commission: 57000 },
  { month: "Jan", commission: 52500 },
  { month: "Feb", commission: 48000 },
  { month: "Mar", commission: 42675 },
];

const categoryColors: Record<string, string> = {
  Electrical: "#FF4500",
  Plumbing: "#38BDF8",
  "AC Repair": "#22C55E",
  Mechanic: "#9333EA",
  Painter: "#FFB700",
};

export function CommissionsPage() {
  const totalCommission = commissionData.reduce((a, b) => a + b.commission, 0);

  return (
    <>
      <TopBar title="Commissions" subtitle="Commissions" />
      <div className="p-8 space-y-6">
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl p-5 shadow-card">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-lg bg-[rgba(255,183,0,0.12)] flex items-center justify-center">
                <Percent size={20} className="text-[#FFB700]" />
              </div>
              <div className="flex items-center gap-0.5 text-xs text-[#22C55E] font-semibold">
                <ArrowUpRight size={14} /> +8.3%
              </div>
            </div>
            <div className="mt-3 font-['Poppins'] text-2xl text-[#F5F5F5] font-bold">PKR {totalCommission.toLocaleString()}</div>
            <div className="text-sm text-[#888888]">Total Commission Earned</div>
          </div>
          <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl p-5 shadow-card">
            <div className="w-10 h-10 rounded-lg bg-[rgba(255,69,0,0.12)] flex items-center justify-center">
              <TrendingUp size={20} className="text-[#FF4500]" />
            </div>
            <div className="mt-3 font-['Poppins'] text-2xl text-[#F5F5F5] font-bold">15%</div>
            <div className="text-sm text-[#888888]">Commission Rate</div>
          </div>
          <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl p-5 shadow-card">
            <div className="w-10 h-10 rounded-lg bg-[rgba(34,197,94,0.12)] flex items-center justify-center">
              <TrendingUp size={20} className="text-[#22C55E]" />
            </div>
            <div className="mt-3 font-['Poppins'] text-2xl text-[#F5F5F5] font-bold">948</div>
            <div className="text-sm text-[#888888]">Total Jobs Processed</div>
          </div>
        </div>

        <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl p-6 shadow-card">
          <h4 className="font-['Poppins'] text-base text-[#F5F5F5] font-semibold mb-6">Monthly Commission Trend</h4>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={monthlyData}>
              <CartesianGrid key="com-grid" strokeDasharray="3 3" stroke="#2A2A2A" />
              <XAxis key="com-xaxis" dataKey="month" tick={{ fontSize: 11, fill: '#555555' }} tickLine={false} axisLine={{ stroke: '#2A2A2A' }} />
              <YAxis key="com-yaxis" tick={{ fontSize: 11, fill: '#555555' }} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
              <Tooltip key="com-tooltip" contentStyle={{ backgroundColor: '#252525', border: '1px solid #333333', borderRadius: 8, color: '#F5F5F5' }} formatter={(v: number) => [`PKR ${v.toLocaleString()}`, 'Commission']} />
              <Bar key="commission-bar" dataKey="commission" fill="#FF4500" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl shadow-card">
          <div className="p-6 pb-4">
            <h4 className="font-['Poppins'] text-base text-[#F5F5F5] font-semibold">Commission by Category</h4>
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-[#1A1A1A] border-b border-[#2A2A2A]">
                {["Category", "Jobs", "Gross Revenue", "Commission (15%)", "Share"].map((h) => (
                  <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-[#888888] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {commissionData.map((c) => (
                <tr key={c.category} className="border-b border-[#2A2A2A] last:border-0 hover:bg-[#242424] transition-colors h-16">
                  <td className="px-6">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: categoryColors[c.category] }} />
                      <span className="text-sm text-[#F5F5F5] font-semibold">{c.category}</span>
                    </div>
                  </td>
                  <td className="px-6 text-sm text-[#888888]">{c.jobs}</td>
                  <td className="px-6 text-sm text-[#F5F5F5] font-semibold">PKR {c.gross.toLocaleString()}</td>
                  <td className="px-6 text-sm text-[#FFB700] font-bold">PKR {c.commission.toLocaleString()}</td>
                  <td className="px-6">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 rounded-full bg-[#252525] overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${(c.commission / totalCommission) * 100}%`, backgroundColor: categoryColors[c.category] }} />
                      </div>
                      <span className="text-xs text-[#888888]">{((c.commission / totalCommission) * 100).toFixed(1)}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}