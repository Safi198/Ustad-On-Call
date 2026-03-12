import { useState } from "react";
import { TopBar } from "../components/layout/TopBar";
import { Megaphone, AlertTriangle, Lightbulb, PartyPopper, Send, Clock, Smartphone, Mail, Bell } from "lucide-react";

const notifTypes = [
  { id: "announcement", label: "Announcement", icon: Megaphone, color: "#38BDF8" },
  { id: "alert", label: "Alert", icon: AlertTriangle, color: "#FFB700" },
  { id: "tip", label: "Tip", icon: Lightbulb, color: "#22C55E" },
  { id: "promotion", label: "Promotion", icon: PartyPopper, color: "#9333EA" },
];

const audiences = ["All Users", "All Workers", "All Customers", "Specific Category", "Custom Selection"];
const channels = ["In-App", "SMS", "Email"];

const history = [
  { title: "Eid Special Discount!", type: "promotion", audience: "All Users", sentVia: "In-App, SMS", recipients: 5090, openRate: 72, date: "Mar 7, 2026", status: "Sent" },
  { title: "Scheduled Maintenance", type: "alert", audience: "All Workers", sentVia: "In-App", recipients: 1248, openRate: 85, date: "Mar 6, 2026", status: "Sent" },
  { title: "New AC Repair Feature", type: "tip", audience: "AC Technicians", sentVia: "In-App, Email", recipients: 175, openRate: 68, date: "Mar 5, 2026", status: "Sent" },
  { title: "Weekly Performance Update", type: "announcement", audience: "All Workers", sentVia: "In-App", recipients: 1248, openRate: 0, date: "Mar 10, 2026", status: "Scheduled" },
  { title: "Payment Processing Update", type: "alert", audience: "All Users", sentVia: "SMS", recipients: 5090, openRate: 91, date: "Mar 3, 2026", status: "Sent" },
  { title: "Service Area Expansion", type: "announcement", audience: "All Users", sentVia: "In-App, SMS, Email", recipients: 5090, openRate: 64, date: "Mar 1, 2026", status: "Sent" },
];

const typeColors: Record<string, { color: string }> = {
  announcement: { color: "#38BDF8" },
  alert: { color: "#FFB700" },
  tip: { color: "#22C55E" },
  promotion: { color: "#9333EA" },
};

const statusColors: Record<string, { bg: string; text: string; border: string }> = {
  Sent: { bg: "rgba(34,197,94,0.12)", text: "#22C55E", border: "rgba(34,197,94,0.2)" },
  Scheduled: { bg: "rgba(56,189,248,0.12)", text: "#38BDF8", border: "rgba(56,189,248,0.2)" },
  Failed: { bg: "rgba(255,69,0,0.12)", text: "#FF6B6B", border: "rgba(255,69,0,0.2)" },
};

export function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<"send" | "history">("send");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [audience, setAudience] = useState("All Users");
  const [selectedType, setSelectedType] = useState("announcement");
  const [selectedChannels, setSelectedChannels] = useState<string[]>(["In-App"]);
  const [sendNow, setSendNow] = useState(true);

  const toggleChannel = (ch: string) => {
    setSelectedChannels((prev) => prev.includes(ch) ? prev.filter((c) => c !== ch) : [...prev, ch]);
  };

  const getRecipientCount = () => {
    if (audience === "All Users") return 5090;
    if (audience === "All Workers") return 1248;
    if (audience === "All Customers") return 3842;
    return 0;
  };

  return (
    <>
      <TopBar title="Notifications" subtitle="Notifications" />
      <div className="p-8 space-y-6">
        <div className="flex bg-[#252525] rounded-lg p-1 gap-1 w-fit">
          <button onClick={() => setActiveTab("send")} className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${activeTab === "send" ? 'bg-[#FF4500] text-white' : 'text-[#888888] hover:text-[#F5F5F5]'}`}>
            Send Notification
          </button>
          <button onClick={() => setActiveTab("history")} className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${activeTab === "history" ? 'bg-[#FF4500] text-white' : 'text-[#888888] hover:text-[#F5F5F5]'}`}>
            Notification History
          </button>
        </div>

        {activeTab === "send" ? (
          <div className="flex gap-6">
            <div className="flex-1 max-w-[640px] bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl p-8">
              <h4 className="font-['Poppins'] text-lg text-[#F5F5F5] font-bold mb-6">Create Platform Notification</h4>
              <div className="space-y-5">
                <div>
                  <label className="text-xs text-[#888888] block mb-1.5 font-semibold uppercase tracking-wider">Notification Title</label>
                  <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full h-10 rounded-lg bg-[#252525] border border-[#333333] px-3 text-sm text-[#F5F5F5] placeholder:text-[#555555] outline-none focus:border-[#FF4500]" placeholder="Enter notification title..." />
                </div>
                <div>
                  <label className="text-xs text-[#888888] block mb-1.5 font-semibold uppercase tracking-wider">Message Body</label>
                  <div className="relative">
                    <textarea value={message} onChange={(e) => setMessage(e.target.value.slice(0, 280))} className="w-full h-[120px] rounded-lg bg-[#252525] border border-[#333333] px-3 py-2 text-sm text-[#F5F5F5] placeholder:text-[#555555] outline-none focus:border-[#FF4500] resize-none" placeholder="Write your notification message..." />
                    <span className="absolute bottom-2 right-3 text-xs text-[#555555]">{message.length}/280</span>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-[#888888] block mb-2 font-semibold uppercase tracking-wider">Target Audience</label>
                  <div className="flex flex-wrap gap-2">
                    {audiences.map((a) => (
                      <button key={a} onClick={() => setAudience(a)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${audience === a ? 'border-[#FF4500] bg-[rgba(255,69,0,0.12)] text-[#FF4500]' : 'border-[#333333] text-[#888888] hover:bg-[#252525]'}`}>
                        {a}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs text-[#888888] block mb-2 font-semibold uppercase tracking-wider">Notification Type</label>
                  <div className="grid grid-cols-4 gap-2">
                    {notifTypes.map((t) => (
                      <button key={t.id} onClick={() => setSelectedType(t.id)} className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-all border ${selectedType === t.id ? 'border-[#FF4500] bg-[rgba(255,69,0,0.08)]' : 'border-[#2A2A2A] hover:bg-[#252525]'}`}>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${t.color}20` }}>
                          <t.icon size={16} style={{ color: t.color }} />
                        </div>
                        <span className="text-xs text-[#888888] font-semibold">{t.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs text-[#888888] block mb-2 font-semibold uppercase tracking-wider">Send Via</label>
                  <div className="flex gap-2">
                    {channels.map((ch) => {
                      const icons = { "In-App": Bell, SMS: Smartphone, Email: Mail };
                      const Icon = icons[ch as keyof typeof icons];
                      return (
                        <button key={ch} onClick={() => toggleChannel(ch)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${selectedChannels.includes(ch) ? 'border-[#FF4500] bg-[rgba(255,69,0,0.12)] text-[#FF4500]' : 'border-[#333333] text-[#888888] hover:bg-[#252525]'}`}>
                          <Icon size={14} /> {ch}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <label className="text-xs text-[#888888] block mb-2 font-semibold uppercase tracking-wider">Schedule</label>
                  <div className="flex items-center gap-4">
                    <button onClick={() => setSendNow(true)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${sendNow ? 'border-[#FF4500] bg-[rgba(255,69,0,0.12)] text-[#FF4500]' : 'border-[#333333] text-[#888888]'}`}>
                      <Send size={14} /> Send Now
                    </button>
                    <button onClick={() => setSendNow(false)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border ${!sendNow ? 'border-[#FF4500] bg-[rgba(255,69,0,0.12)] text-[#FF4500]' : 'border-[#333333] text-[#888888]'}`}>
                      <Clock size={14} /> Schedule
                    </button>
                    {!sendNow && (
                      <input type="datetime-local" className="h-9 rounded-lg bg-[#252525] border border-[#333333] px-3 text-xs text-[#F5F5F5] outline-none focus:border-[#FF4500]" />
                    )}
                  </div>
                </div>
                <button className="w-full h-11 rounded-lg bg-[#FF4500] text-white text-sm font-semibold hover:bg-[#E03E00] transition-colors">
                  <Send size={16} className="inline mr-2 -mt-0.5" />
                  Send to {getRecipientCount().toLocaleString()} Users
                </button>
              </div>
            </div>

            <div className="w-[300px] shrink-0">
              <h5 className="text-xs text-[#888888] mb-3 font-semibold uppercase tracking-wider">Preview</h5>
              <div className="bg-[#252525] rounded-[24px] p-3 border border-[#333333]">
                <div className="bg-[#1E1E1E] rounded-[20px] p-4 min-h-[200px]">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-md bg-[#FF4500] flex items-center justify-center">
                      <span className="text-white text-[8px] font-bold">UC</span>
                    </div>
                    <span className="text-xs text-[#888888] font-semibold">UstadOnCall</span>
                    <span className="text-[10px] text-[#555555] ml-auto">now</span>
                  </div>
                  <div className="bg-[#252525] rounded-xl p-3 border border-[#333333]">
                    {title ? (
                      <>
                        <div className="text-sm text-[#F5F5F5] font-semibold">{title}</div>
                        {message && <p className="text-xs text-[#888888] mt-1">{message}</p>}
                      </>
                    ) : (
                      <div className="text-xs text-[#555555] italic">Start typing to see preview...</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl shadow-card overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-[#1A1A1A] border-b border-[#2A2A2A]">
                  {["Title", "Type", "Audience", "Sent Via", "Recipients", "Open Rate", "Date", "Status"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#888888] uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {history.map((item, i) => {
                  const typeInfo = typeColors[item.type];
                  const icons: Record<string, typeof Megaphone> = { announcement: Megaphone, alert: AlertTriangle, tip: Lightbulb, promotion: PartyPopper };
                  const Icon = icons[item.type] || Megaphone;
                  return (
                    <tr key={i} className="border-b border-[#2A2A2A] last:border-0 hover:bg-[#242424] transition-colors h-14">
                      <td className="px-4 text-sm text-[#F5F5F5] font-semibold">{item.title}</td>
                      <td className="px-4">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${typeInfo.color}20` }}>
                          <Icon size={14} style={{ color: typeInfo.color }} />
                        </div>
                      </td>
                      <td className="px-4 text-xs text-[#888888]">{item.audience}</td>
                      <td className="px-4 text-xs text-[#888888]">{item.sentVia}</td>
                      <td className="px-4 text-sm text-[#F5F5F5] font-semibold">{item.recipients.toLocaleString()}</td>
                      <td className="px-4">
                        {item.openRate > 0 ? (
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 rounded-full bg-[#252525] overflow-hidden">
                              <div className="h-full rounded-full bg-[#FF4500]" style={{ width: `${item.openRate}%` }} />
                            </div>
                            <span className="text-xs text-[#888888]">{item.openRate}%</span>
                          </div>
                        ) : (
                          <span className="text-xs text-[#555555]">—</span>
                        )}
                      </td>
                      <td className="px-4 text-xs text-[#888888]">{item.date}</td>
                      <td className="px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold border" style={{ backgroundColor: statusColors[item.status]?.bg, color: statusColors[item.status]?.text, borderColor: statusColors[item.status]?.border }}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
