import { useState } from "react";
import { TopBar } from "../components/layout/TopBar";
import { useNavigate } from "react-router";
import {
  Wrench, Users, Briefcase, TrendingUp, ArrowUpRight, ArrowDownRight, Eye, DollarSign, ArrowRight, X
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";

const stats = [
  { label: "Total Workers", value: "1,248", trend: "+12.4%", up: true, icon: Wrench },
  { label: "Total Customers", value: "3,842", trend: "+8.7%", up: true, icon: Users },
  { label: "Active Jobs", value: "186", trend: "+23.1%", up: true, icon: Briefcase },
  { label: "Platform Revenue", value: "PKR 2.84M", trend: "-2.3%", up: false, icon: DollarSign },
];

const lineData = Array.from({ length: 30 }, (_, i) => ({
  date: `Mar ${i + 1}`,
  posted: Math.floor(Math.random() * 40 + 20),
  completed: Math.floor(Math.random() * 30 + 10),
}));

const donutData = [
  { name: "Electrical", value: 342, color: "#FF4500" },
  { name: "Plumbing", value: 218, color: "#FFB700" },
  { name: "AC Repair", value: 175, color: "#22C55E" },
  { name: "Mechanic", value: 124, color: "#38BDF8" },
  { name: "Other", value: 89, color: "#888888" },
];

const recentJobs = [
  { id: "UC1042", customer: "Hamza Ali", category: "Electrical", status: "Active", date: "2 hours ago" },
  { id: "UC1041", customer: "Fatima Noor", category: "Plumbing", status: "Pending", date: "3 hours ago" },
  { id: "UC1040", customer: "Bilal Ahmed", category: "AC Repair", status: "Completed", date: "5 hours ago" },
  { id: "UC1039", customer: "Ayesha Khan", category: "Mechanic", status: "Cancelled", date: "6 hours ago" },
  { id: "UC1038", customer: "Usman Tariq", category: "Electrical", status: "Active", date: "8 hours ago" },
];

const recentWorkers = [
  { name: "Ali Ustad", category: "Electrician", date: "Mar 8, 2026", status: "Approved", initials: "AU" },
  { name: "Kamran Shah", category: "Plumber", date: "Mar 7, 2026", status: "Pending", initials: "KS" },
  { name: "Naveed Iqbal", category: "AC Tech", date: "Mar 7, 2026", status: "Approved", initials: "NI" },
  { name: "Faisal Raza", category: "Mechanic", date: "Mar 6, 2026", status: "Pending", initials: "FR" },
  { name: "Tariq Mehmood", category: "Painter", date: "Mar 6, 2026", status: "Approved", initials: "TM" },
];

const statusColors: Record<string, { bg: string; text: string; border: string }> = {
  Active: { bg: "rgba(34,197,94,0.12)", text: "#22C55E", border: "rgba(34,197,94,0.2)" },
  Completed: { bg: "rgba(34,197,94,0.12)", text: "#22C55E", border: "rgba(34,197,94,0.2)" },
  Pending: { bg: "rgba(255,183,0,0.12)", text: "#FFB700", border: "rgba(255,183,0,0.2)" },
  Cancelled: { bg: "rgba(255,69,0,0.12)", text: "#FF6B6B", border: "rgba(255,69,0,0.2)" },
  Approved: { bg: "rgba(34,197,94,0.12)", text: "#22C55E", border: "rgba(34,197,94,0.2)" },
};

export function Dashboard() {
  const navigate = useNavigate();
  const [chartPeriod, setChartPeriod] = useState("30d");
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const totalJobs = donutData.reduce((a, b) => a + b.value, 0);

  return (
    <>
      <TopBar title="Dashboard" subtitle="Dashboard" />
      <div className="p-8 space-y-6">
        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl p-5 shadow-card hover:shadow-glow transition-all duration-150"
            >
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-lg bg-[rgba(255,69,0,0.12)] flex items-center justify-center">
                  <stat.icon size={20} className="text-[#FF4500]" />
                </div>
                <div className={`flex items-center gap-1 text-xs font-semibold ${stat.up ? 'text-[#22C55E]' : 'text-[#FF6B6B]'}`}>
                  {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {stat.trend}
                </div>
              </div>
              <div className="mt-3 font-['Poppins'] text-3xl font-bold text-[#F5F5F5]">
                {stat.value}
              </div>
              <div className="text-sm text-[#888888]">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-5 gap-6">
          {/* Line Chart */}
          <div className="col-span-3 bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl p-6 shadow-card">
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-['Poppins'] text-base font-semibold text-[#F5F5F5]">Jobs Overview</h4>
              <div className="flex gap-1 bg-[#252525] rounded-lg p-1">
                {["7d", "30d", "90d"].map((p) => (
                  <button
                    key={p}
                    onClick={() => setChartPeriod(p)}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                      chartPeriod === p
                        ? "bg-[#FF4500] text-white"
                        : "text-[#888888] hover:text-[#F5F5F5]"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={lineData}>
                <CartesianGrid key="grid" strokeDasharray="3 3" stroke="#2A2A2A" />
                <XAxis 
                  key="xaxis"
                  dataKey="date" 
                  tick={{ fontSize: 11, fill: '#555555' }} 
                  tickLine={false} 
                  axisLine={{ stroke: '#2A2A2A' }} 
                />
                <YAxis 
                  key="yaxis"
                  tick={{ fontSize: 11, fill: '#555555' }} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <Tooltip
                  key="tooltip"
                  contentStyle={{ 
                    backgroundColor: '#252525',
                    border: '1px solid #333333',
                    borderRadius: 8,
                    color: '#F5F5F5'
                  }}
                />
                <Line key="posted-line" type="monotone" dataKey="posted" stroke="#FF4500" strokeWidth={2} dot={false} name="Posted Jobs" />
                <Line key="completed-line" type="monotone" dataKey="completed" stroke="#22C55E" strokeWidth={2} dot={false} name="Completed Jobs" />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex items-center gap-6 mt-4 justify-center">
              <div className="flex items-center gap-2 text-xs text-[#C0C0C0]">
                <div className="w-3 h-0.5 bg-[#FF4500] rounded" /> Posted Jobs
              </div>
              <div className="flex items-center gap-2 text-xs text-[#C0C0C0]">
                <div className="w-3 h-0.5 bg-[#22C55E] rounded" /> Completed Jobs
              </div>
            </div>
          </div>

          {/* Donut Chart */}
          <div className="col-span-2 bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl p-6 shadow-card">
            <h4 className="font-['Poppins'] text-base font-semibold text-[#F5F5F5] mb-4">Jobs by Category</h4>
            <div className="relative">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    key="pie-categories"
                    data={donutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={85}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {donutData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    key="pie-tooltip"
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        const percent = ((data.value / totalJobs) * 100).toFixed(1);
                        return (
                          <div style={{
                            backgroundColor: '#252525',
                            border: '1px solid #333333',
                            borderRadius: 8,
                            padding: '10px 14px',
                            color: '#F5F5F5',
                          }}>
                            <div style={{ fontWeight: 600, marginBottom: 4, color: data.color }}>{data.name}</div>
                            <div style={{ fontSize: 13 }}>{data.value} jobs ({percent}%)</div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <div className="font-['Poppins'] text-2xl font-bold text-[#F5F5F5]">{totalJobs}</div>
                  <div className="text-xs text-[#888888]">Total</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {donutData.map((d) => (
                <div key={d.name} className="flex items-center gap-2 text-xs">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="text-[#C0C0C0]">{d.name}</span>
                  <span className="text-[#888888] ml-auto">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-2 gap-6">
          {/* Recent Jobs */}
          <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl shadow-card">
            <div className="flex items-center justify-between p-6 pb-4 border-b border-[#2A2A2A]">
              <h4 className="font-['Poppins'] text-base font-semibold text-[#F5F5F5]">Recent Job Requests</h4>
              <button 
                onClick={() => navigate("/jobs")}
                className="text-sm text-[#FF4500] hover:text-[#FFB700] font-semibold flex items-center gap-1 transition-colors"
              >
                View All <ArrowRight size={14} />
              </button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-[#1A1A1A]">
                  {["Job ID", "Customer", "Category", "Status", "Date", "Actions"].map((h) => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-[#888888] uppercase tracking-wider">
                      {h === "Actions" ? "" : h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentJobs.map((job, idx) => (
                  <tr key={job.id} className={`border-b border-[#2A2A2A] last:border-0 hover:bg-[#242424] transition-colors ${idx === recentJobs.length - 1 ? '' : ''}`}>
                    <td className="px-6 py-3 text-sm text-[#FF4500] font-mono font-semibold">#{job.id}</td>
                    <td className="px-6 py-3 text-sm text-[#F5F5F5]">{job.customer}</td>
                    <td className="px-6 py-3">
                      <span
                        className="inline-block px-2.5 py-1 rounded text-xs font-semibold"
                        style={{
                          backgroundColor: `${donutData.find(d => d.name === job.category)?.color || '#888888'}20`,
                          color: donutData.find(d => d.name === job.category)?.color || '#888888',
                        }}
                      >
                        {job.category}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <span
                        className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold border"
                        style={{
                          backgroundColor: statusColors[job.status].bg,
                          color: statusColors[job.status].text,
                          borderColor: statusColors[job.status].border,
                        }}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-sm text-[#888888]">{job.date}</td>
                    <td className="px-6 py-3">
                      <button 
                        onClick={() => navigate(`/jobs`)}
                        className="p-1.5 rounded-md hover:bg-[#252525] transition-colors">
                        <Eye size={16} className="text-[#888888] hover:text-[#FF4500]" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Recent Workers */}
          <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl shadow-card">
            <div className="flex items-center justify-between p-6 pb-4 border-b border-[#2A2A2A]">
              <h4 className="font-['Poppins'] text-base font-semibold text-[#F5F5F5]">Recent Worker Registrations</h4>
              <button 
                onClick={() => navigate("/workers")}
                className="text-sm text-[#FF4500] hover:text-[#FFB700] font-semibold flex items-center gap-1 transition-colors"
              >
                View All <ArrowRight size={14} />
              </button>
            </div>
            <div className="px-6 py-4 space-y-1">
              {recentWorkers.map((w) => (
                <div key={w.name} className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#242424] transition-colors">
                  <div className="w-9 h-9 rounded-full bg-[rgba(255,69,0,0.12)] flex items-center justify-center text-xs text-[#FF4500] font-semibold">
                    {w.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-[#F5F5F5]">{w.name}</div>
                    <div className="text-xs text-[#888888]">{w.date}</div>
                  </div>
                  <span
                    className="px-2 py-1 rounded text-xs font-semibold"
                    style={{
                      backgroundColor: `${donutData[0].color}20`,
                      color: donutData[0].color,
                    }}
                  >
                    {w.category}
                  </span>
                  {w.status === "Pending" && (
                    <button className="px-3 py-1 rounded-md border border-[#22C55E] text-[#22C55E] text-xs font-semibold hover:bg-[rgba(34,197,94,0.08)] transition-colors">
                      Approve
                    </button>
                  )}
                  {w.status === "Approved" && (
                    <span
                      className="px-2.5 py-1 rounded-full text-xs font-semibold border"
                      style={{
                        backgroundColor: statusColors[w.status].bg,
                        color: statusColors[w.status].text,
                        borderColor: statusColors[w.status].border,
                      }}
                    >
                      {w.status}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}