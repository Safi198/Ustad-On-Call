import { useState } from "react";
import { TopBar } from "../components/layout/TopBar";
import { Check, X, Clock, MapPin, Phone, FileText } from "lucide-react";

const pendingWorkers = [
  { id: "W004", name: "Faisal Raza", phone: "+92 333 1112233", category: "Mechanic", area: "Rawalpindi", submitted: "Mar 5, 2026", initials: "FR", cnic: true, phone_v: true, docs: 3 },
  { id: "W009", name: "Sohail Khan", phone: "+92 302 4445566", category: "Mechanic", area: "Peshawar", submitted: "Mar 7, 2026", initials: "SK", cnic: true, phone_v: false, docs: 2 },
  { id: "W011", name: "Adeel Hussain", phone: "+92 310 8889900", category: "Electrician", area: "Lahore", submitted: "Mar 8, 2026", initials: "AH", cnic: true, phone_v: true, docs: 4 },
  { id: "W012", name: "Bilal Qasim", phone: "+92 323 5554433", category: "Plumber", area: "Karachi", submitted: "Mar 8, 2026", initials: "BQ", cnic: false, phone_v: true, docs: 2 },
  { id: "W013", name: "Rashid Ali", phone: "+92 341 2223344", category: "AC Technician", area: "Islamabad", submitted: "Mar 9, 2026", initials: "RA", cnic: true, phone_v: true, docs: 5 },
];

const categoryColors: Record<string, { bg: string; text: string }> = {
  Electrician: { bg: "rgba(255,69,0,0.12)", text: "#FF4500" },
  Plumber: { bg: "rgba(56,189,248,0.12)", text: "#38BDF8" },
  "AC Technician": { bg: "rgba(34,197,94,0.12)", text: "#22C55E" },
  Mechanic: { bg: "rgba(147,51,234,0.12)", text: "#9333EA" },
};

export function PendingApprovalsPage() {
  const [workers, setWorkers] = useState(pendingWorkers);

  const approveWorker = (id: string) => {
    setWorkers((prev) => prev.filter((w) => w.id !== id));
  };

  return (
    <>
      <TopBar title="Pending Approvals" subtitle="Pending Approvals" />
      <div className="p-8 space-y-6">
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[rgba(255,183,0,0.12)] flex items-center justify-center">
                <Clock size={20} className="text-[#FFB700]" />
              </div>
              <div>
                <div className="text-2xl font-['Poppins'] text-[#F5F5F5] font-bold">{workers.length}</div>
                <div className="text-sm text-[#888888]">Awaiting Review</div>
              </div>
            </div>
          </div>
          <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[rgba(34,197,94,0.12)] flex items-center justify-center">
                <Check size={20} className="text-[#22C55E]" />
              </div>
              <div>
                <div className="text-2xl font-['Poppins'] text-[#F5F5F5] font-bold">42</div>
                <div className="text-sm text-[#888888]">Approved This Week</div>
              </div>
            </div>
          </div>
          <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[rgba(255,69,0,0.12)] flex items-center justify-center">
                <X size={20} className="text-[#FF6B6B]" />
              </div>
              <div>
                <div className="text-2xl font-['Poppins'] text-[#F5F5F5] font-bold">7</div>
                <div className="text-sm text-[#888888]">Rejected This Week</div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {workers.map((worker) => (
            <div
              key={worker.id}
              className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl p-6 hover:border-[#333333] transition-all border-l-[3px] border-l-[#FFB700]"
            >
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-full bg-[rgba(255,69,0,0.12)] flex items-center justify-center text-lg text-[#FF4500] font-bold shrink-0">
                  {worker.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <h4 className="text-base text-[#F5F5F5] font-semibold">{worker.name}</h4>
                    <span className="px-2.5 py-0.5 rounded text-xs font-semibold" style={{ backgroundColor: categoryColors[worker.category]?.bg, color: categoryColors[worker.category]?.text }}>
                      {worker.category}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs bg-[rgba(255,183,0,0.12)] text-[#FFB700] font-semibold">
                      Pending Review
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-sm text-[#888888]">
                    <span className="flex items-center gap-1"><Phone size={13} /> {worker.phone}</span>
                    <span className="flex items-center gap-1"><MapPin size={13} /> {worker.area}</span>
                    <span className="flex items-center gap-1"><Clock size={13} /> Submitted: {worker.submitted}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${worker.cnic ? 'bg-[rgba(34,197,94,0.12)]' : 'bg-[rgba(255,69,0,0.12)]'}`}>
                        {worker.cnic ? <Check size={12} className="text-[#22C55E]" /> : <X size={12} className="text-[#FF6B6B]" />}
                      </div>
                      <span className="text-xs text-[#888888]">CNIC</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${worker.phone_v ? 'bg-[rgba(34,197,94,0.12)]' : 'bg-[rgba(255,69,0,0.12)]'}`}>
                        {worker.phone_v ? <Check size={12} className="text-[#22C55E]" /> : <X size={12} className="text-[#FF6B6B]" />}
                      </div>
                      <span className="text-xs text-[#888888]">Phone</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FileText size={14} className="text-[#FF4500]" />
                      <span className="text-xs text-[#888888]">{worker.docs} documents</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => approveWorker(worker.id)}
                    className="flex items-center gap-1.5 px-4 h-9 rounded-lg bg-[#22C55E] text-white text-sm font-semibold hover:bg-[#16A34A] transition-colors"
                  >
                    <Check size={16} /> Approve
                  </button>
                  <button className="flex items-center gap-1.5 px-4 h-9 rounded-lg border border-[#FF6B6B] text-[#FF6B6B] text-sm font-semibold hover:bg-[rgba(255,69,0,0.08)] transition-colors">
                    <X size={16} /> Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
          {workers.length === 0 && (
            <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-[rgba(34,197,94,0.12)] flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-[#22C55E]" />
              </div>
              <h4 className="text-lg font-['Poppins'] text-[#F5F5F5] font-semibold">All Caught Up!</h4>
              <p className="text-sm text-[#888888] mt-2">No pending approvals at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}