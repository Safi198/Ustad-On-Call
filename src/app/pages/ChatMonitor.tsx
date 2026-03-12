import { useState } from "react";
import { TopBar } from "../components/layout/TopBar";
import { Search, Flag, Download, Eye } from "lucide-react";

const conversations = [
  { id: 1, jobId: "UC1042", category: "Electrical", customer: "Hamza Ali", custInit: "HA", worker: "Ali Ustad", workerInit: "AU", lastMsg: "Ji ustad, main ghar pe hi hun", time: "10:32 AM", flagged: false, active: true, unread: 0, messages: [
    { from: "system", text: "Job #UC1042 was created", time: "9:00 AM" },
    { from: "customer", text: "Assalam o Alaikum, mujhe kitchen ki wiring fix karwani hai", time: "9:05 AM" },
    { from: "worker", text: "Walaikum Assalam, kya masla hai exactly?", time: "9:10 AM" },
    { from: "customer", text: "Short circuit ho raha hai bar bar", time: "9:12 AM" },
    { from: "worker", text: "Ok, main aa sakta hun. Address share kijiye", time: "9:15 AM" },
    { from: "system", text: "Worker assigned to job", time: "9:20 AM" },
    { from: "customer", text: "Ji ustad, main ghar pe hi hun", time: "10:32 AM" },
  ]},
  { id: 2, jobId: "UC1041", category: "Plumbing", customer: "Fatima Noor", custInit: "FN", worker: "Kamran Shah", workerInit: "KS", lastMsg: "Main aaj sham ko aa sakta hun", time: "10:15 AM", flagged: false, active: true, unread: 2, messages: [
    { from: "customer", text: "Bathroom ka tap leak ho raha hai", time: "9:30 AM" },
    { from: "worker", text: "Kaunsa tap hai? Hot ya cold?", time: "9:35 AM" },
    { from: "customer", text: "Cold water wala, bohot tez leak hai", time: "9:40 AM" },
    { from: "worker", text: "Main aaj sham ko aa sakta hun", time: "10:15 AM" },
  ]},
  { id: 3, jobId: "UC1038", category: "Electrical", customer: "Usman Tariq", custInit: "UT", worker: "Ali Ustad", workerInit: "AU", lastMsg: "Payment kab milega?", time: "9:45 AM", flagged: true, active: false, unread: 0, messages: [
    { from: "worker", text: "Kaam complete ho gaya hai", time: "Yesterday, 5:00 PM" },
    { from: "customer", text: "Theek hai, lekin quality achi nahi hai", time: "Yesterday, 5:30 PM" },
    { from: "worker", text: "Payment kab milega?", time: "9:45 AM" },
  ]},
  { id: 4, jobId: "UC1035", category: "Painter", customer: "Zainab Bibi", custInit: "ZB", worker: "Tariq Mehmood", workerInit: "TM", lastMsg: "Shukriya, bohot acha kaam kiya", time: "Yesterday", flagged: false, active: false, unread: 0, messages: [
    { from: "system", text: "Job Completed", time: "Yesterday, 4:00 PM" },
    { from: "customer", text: "Shukriya, bohot acha kaam kiya", time: "Yesterday, 4:30 PM" },
  ]},
];

const tabs = ["All", "Active Jobs", "Reported", "Flagged"];
const categoryColors: Record<string, { bg: string; text: string }> = {
  Electrical: { bg: "rgba(255,69,0,0.12)", text: "#FF4500" },
  Plumbing: { bg: "rgba(56,189,248,0.12)", text: "#38BDF8" },
  Painter: { bg: "rgba(255,183,0,0.12)", text: "#FFB700" },
};

export function ChatMonitorPage() {
  const [activeChat, setActiveChat] = useState(1);
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = conversations.filter((c) => {
    if (activeTab === "Active Jobs") return c.active;
    if (activeTab === "Flagged") return c.flagged;
    return true;
  }).filter((c) =>
    c.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.worker.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.jobId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const chat = conversations.find((c) => c.id === activeChat);

  return (
    <>
      <TopBar title="Chat Monitor" subtitle="Chat" />
      <div className="p-8">
        <div className="flex bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl h-[calc(100vh-160px)] overflow-hidden">
          <div className="w-[380px] border-r border-[#2A2A2A] flex flex-col">
            <div className="p-4 border-b border-[#2A2A2A]">
              <div className="relative mb-3">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555555]" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10 w-full rounded-lg bg-[#252525] border border-[#333333] pl-10 pr-4 text-sm text-[#F5F5F5] placeholder:text-[#555555] focus:border-[#FF4500] outline-none"
                />
              </div>
              <div className="flex gap-1">
                {tabs.map((t) => (
                  <button key={t} onClick={() => setActiveTab(t)} className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${activeTab === t ? 'bg-[#FF4500] text-white' : 'text-[#888888] hover:text-[#F5F5F5]'}`}>
                    {t}
                    {t === "Flagged" && <span className="ml-1 w-1.5 h-1.5 rounded-full bg-[#FF6B6B] inline-block" />}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {filtered.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setActiveChat(conv.id)}
                  className={`w-full text-left px-4 py-3 border-b border-[#2A2A2A] hover:bg-[#242424] transition-colors ${
                    activeChat === conv.id ? 'bg-[rgba(255,69,0,0.08)] border-l-[3px] border-l-[#FF4500]' : 'border-l-[3px] border-l-transparent'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative shrink-0">
                      <div className="w-8 h-8 rounded-full bg-[rgba(255,69,0,0.12)] flex items-center justify-center text-[10px] text-[#FF4500] font-semibold">{conv.custInit}</div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[rgba(56,189,248,0.12)] flex items-center justify-center text-[8px] text-[#38BDF8] border-2 border-[#1E1E1E] font-semibold">{conv.workerInit}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#FF4500] font-mono font-semibold">#{conv.jobId}</span>
                        <span className="px-1.5 py-0 rounded text-[9px] font-semibold" style={{ backgroundColor: categoryColors[conv.category]?.bg, color: categoryColors[conv.category]?.text }}>
                          {conv.category}
                        </span>
                      </div>
                      <p className="text-xs text-[#888888] truncate mt-0.5">{conv.lastMsg}</p>
                      <div className="text-xs text-[#555555] mt-0.5">{conv.customer} ↔ {conv.worker}</div>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className="text-[10px] text-[#555555]">{conv.time}</span>
                      {conv.flagged && <Flag size={12} className="text-[#FF6B6B] fill-[#FF6B6B]" />}
                      {conv.unread > 0 && (
                        <span className="w-4 h-4 rounded-full bg-[#FF4500] text-white text-[9px] flex items-center justify-center font-bold">{conv.unread}</span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {chat ? (
            <div className="flex-1 flex flex-col">
              <div className="px-6 py-3 border-b border-[#2A2A2A] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[#FF4500] font-mono font-semibold">Job #{chat.jobId}</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold" style={{ backgroundColor: categoryColors[chat.category]?.bg, color: categoryColors[chat.category]?.text }}>
                      {chat.category}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${chat.active ? 'bg-[rgba(34,197,94,0.12)] text-[#22C55E]' : 'bg-[#252525] text-[#555555]'}`}>
                      {chat.active ? "Active" : "Closed"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-[#888888]">
                    {chat.customer} ↔ {chat.worker}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className={`flex items-center gap-1.5 px-3 h-8 rounded-lg text-xs font-semibold transition-colors ${chat.flagged ? 'bg-[#FF6B6B] text-white' : 'border border-[#333333] text-[#888888] hover:bg-[#252525]'}`}>
                    <Flag size={13} /> {chat.flagged ? "Flagged" : "Flag"}
                  </button>
                  <button className="flex items-center gap-1.5 px-3 h-8 rounded-lg border border-[#333333] text-xs text-[#888888] hover:bg-[#252525] font-semibold">
                    <Download size={13} /> Export
                  </button>
                  <button className="flex items-center gap-1.5 px-3 h-8 rounded-lg border border-[#333333] text-xs text-[#888888] hover:bg-[#252525] font-semibold">
                    <Eye size={13} /> Job Details
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 bg-[#141414] space-y-3">
                {chat.messages.map((msg, i) => {
                  if (msg.from === "system") {
                    return (
                      <div key={i} className="flex justify-center">
                        <span className="px-3 py-1 rounded-full bg-[#252525] text-xs text-[#555555]">{msg.text}</span>
                      </div>
                    );
                  }
                  const isCustomer = msg.from === "customer";
                  return (
                    <div key={i} className={`flex ${isCustomer ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[320px] px-4 py-2.5 ${
                        isCustomer
                          ? 'bg-[rgba(255,69,0,0.12)] text-[#FF4500] rounded-[12px_12px_2px_12px]'
                          : 'bg-[#1E1E1E] text-[#C0C0C0] rounded-[12px_12px_12px_2px] border border-[#2A2A2A]'
                      }`}>
                        <p className="text-sm">{msg.text}</p>
                        <p className="text-[10px] mt-1 opacity-60">{msg.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-[#2A2A2A] p-4 bg-[rgba(255,183,0,0.04)]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-[#FFB700] px-2 py-0.5 bg-[rgba(255,183,0,0.12)] rounded font-semibold">Admin Only</span>
                  <span className="text-xs text-[#555555]">Notes are not visible to users</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add internal admin note..."
                    className="flex-1 h-9 rounded-lg bg-[#252525] border border-[#333333] px-3 text-xs text-[#F5F5F5] placeholder:text-[#555555] outline-none focus:border-[#FF4500]"
                  />
                  <button className="px-4 h-9 rounded-lg bg-[#FF4500] text-white text-xs font-semibold hover:bg-[#E03E00] transition-colors">
                    Save Note
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-[#555555] text-sm">
              Select a conversation to view
            </div>
          )}
        </div>
      </div>
    </>
  );
}
