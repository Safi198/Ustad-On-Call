import { useState } from "react";
import { TopBar } from "../components/layout/TopBar";
import { Save, Globe, Percent, Bell, Shield, MapPin, Plus } from "lucide-react";

const sections = [
  { id: "general", label: "General", icon: Globe },
  { id: "commission", label: "Commission", icon: Percent },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "locations", label: "Service Areas", icon: MapPin },
];

export function SettingsPage() {
  const [activeSection, setActiveSection] = useState("general");
  const [commissionRate, setCommissionRate] = useState(15);

  return (
    <>
      <TopBar title="Platform Settings" subtitle="Settings" />
      <div className="p-8">
        <div className="flex gap-6">
          <div className="w-[240px] shrink-0 space-y-1">
            {sections.map((s) => {
              const isActive = activeSection === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all text-left font-semibold ${
                    isActive ? 'bg-[rgba(255,69,0,0.12)] text-[#FF4500]' : 'text-[#888888] hover:bg-[#252525]'
                  }`}
                >
                  <s.icon size={18} /> {s.label}
                </button>
              );
            })}
          </div>

          <div className="flex-1 max-w-[720px]">
            {activeSection === "general" && (
              <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl p-6 space-y-6">
                <h4 className="font-['Poppins'] text-lg text-[#F5F5F5] font-bold">General Settings</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-[#888888] block mb-1.5 font-semibold uppercase tracking-wider">Platform Name</label>
                    <input defaultValue="UstadOnCall" className="w-full h-10 rounded-lg bg-[#252525] border border-[#333333] px-3 text-sm text-[#F5F5F5] outline-none focus:border-[#FF4500]" />
                  </div>
                  <div>
                    <label className="text-xs text-[#888888] block mb-1.5 font-semibold uppercase tracking-wider">Tagline</label>
                    <input defaultValue="Skilled Workers, One Tap Away" className="w-full h-10 rounded-lg bg-[#252525] border border-[#333333] px-3 text-sm text-[#F5F5F5] outline-none focus:border-[#FF4500]" />
                  </div>
                  <div>
                    <label className="text-xs text-[#888888] block mb-1.5 font-semibold uppercase tracking-wider">Support Email</label>
                    <input defaultValue="support@ustadoncall.pk" className="w-full h-10 rounded-lg bg-[#252525] border border-[#333333] px-3 text-sm text-[#F5F5F5] outline-none focus:border-[#FF4500]" />
                  </div>
                  <div>
                    <label className="text-xs text-[#888888] block mb-1.5 font-semibold uppercase tracking-wider">Support Phone</label>
                    <input defaultValue="+92 42 111-USTAD" className="w-full h-10 rounded-lg bg-[#252525] border border-[#333333] px-3 text-sm text-[#F5F5F5] outline-none focus:border-[#FF4500]" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-[#888888] block mb-1.5 font-semibold uppercase tracking-wider">Default Currency</label>
                  <select className="w-full h-10 rounded-lg bg-[#252525] border border-[#333333] px-3 text-sm text-[#F5F5F5] outline-none focus:border-[#FF4500]">
                    <option>PKR - Pakistani Rupee</option>
                  </select>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#252525] rounded-lg">
                  <div>
                    <div className="text-sm text-[#F5F5F5] font-semibold">Maintenance Mode</div>
                    <div className="text-xs text-[#888888]">Temporarily disable the platform</div>
                  </div>
                  <div className="w-10 h-6 rounded-full bg-[#555555] relative cursor-pointer">
                    <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow" />
                  </div>
                </div>
                <button className="flex items-center gap-2 px-5 h-10 rounded-lg bg-[#FF4500] text-white text-sm font-semibold hover:bg-[#E03E00] transition-colors">
                  <Save size={16} /> Save Changes
                </button>
              </div>
            )}

            {activeSection === "commission" && (
              <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl p-6 space-y-6">
                <h4 className="font-['Poppins'] text-lg text-[#F5F5F5] font-bold">Commission Settings</h4>
                <div className="p-5 bg-[#252525] rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-sm text-[#F5F5F5] font-semibold">Platform Commission Rate</div>
                      <div className="text-xs text-[#888888]">Percentage deducted from each completed job</div>
                    </div>
                    <div className="font-['Poppins'] text-3xl text-[#FF4500] font-bold">{commissionRate}%</div>
                  </div>
                  <input type="range" min="5" max="25" value={commissionRate} onChange={(e) => setCommissionRate(Number(e.target.value))} className="w-full accent-[#FF4500]" />
                  <div className="flex justify-between text-xs text-[#555555] mt-1"><span>5%</span><span>25%</span></div>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#252525] rounded-lg">
                  <div>
                    <div className="text-sm text-[#F5F5F5] font-semibold">Category-Based Rates</div>
                    <div className="text-xs text-[#888888]">Set different commission rates per category</div>
                  </div>
                  <div className="w-10 h-6 rounded-full bg-[#555555] relative cursor-pointer">
                    <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow" />
                  </div>
                </div>
                <button className="flex items-center gap-2 px-5 h-10 rounded-lg bg-[#FF4500] text-white text-sm font-semibold hover:bg-[#E03E00] transition-colors">
                  <Save size={16} /> Save Changes
                </button>
              </div>
            )}

            {activeSection === "notifications" && (
              <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl p-6 space-y-4">
                <h4 className="font-['Poppins'] text-lg text-[#F5F5F5] font-bold">Notification Settings</h4>
                {[
                  { label: "New Worker Registration", desc: "Get notified when a new worker signs up", on: true },
                  { label: "Job Completion", desc: "Notify when a job is marked complete", on: true },
                  { label: "Payment Processed", desc: "Alert on successful payment processing", on: false },
                  { label: "Flagged Content", desc: "Immediate alert for flagged reviews or chats", on: true },
                  { label: "Daily Summary Email", desc: "Receive daily platform summary via email", on: false },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between p-4 bg-[#252525] rounded-lg">
                    <div>
                      <div className="text-sm text-[#F5F5F5] font-semibold">{item.label}</div>
                      <div className="text-xs text-[#888888]">{item.desc}</div>
                    </div>
                    <div className={`w-10 h-6 rounded-full relative cursor-pointer transition-colors ${item.on ? 'bg-[#22C55E]' : 'bg-[#555555]'}`}>
                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${item.on ? 'translate-x-5' : 'translate-x-1'}`} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeSection === "security" && (
              <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl p-6 space-y-4">
                <h4 className="font-['Poppins'] text-lg text-[#F5F5F5] font-bold">Security Settings</h4>
                {[
                  { label: "Two-Factor Authentication", desc: "Require 2FA for all admin accounts", on: true },
                  { label: "Session Timeout", desc: "Auto-logout after 30 minutes of inactivity", on: true },
                  { label: "IP Whitelisting", desc: "Restrict admin access to specific IP addresses", on: false },
                  { label: "Login Notifications", desc: "Email alert on every admin login", on: true },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between p-4 bg-[#252525] rounded-lg">
                    <div>
                      <div className="text-sm text-[#F5F5F5] font-semibold">{item.label}</div>
                      <div className="text-xs text-[#888888]">{item.desc}</div>
                    </div>
                    <div className={`w-10 h-6 rounded-full relative cursor-pointer transition-colors ${item.on ? 'bg-[#22C55E]' : 'bg-[#555555]'}`}>
                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${item.on ? 'translate-x-5' : 'translate-x-1'}`} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeSection === "locations" && (
              <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl p-6 space-y-4">
                <h4 className="font-['Poppins'] text-lg text-[#F5F5F5] font-bold">Service Areas</h4>
                <p className="text-sm text-[#888888]">Manage cities where UstadOnCall operates</p>
                {["Lahore", "Karachi", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Peshawar"].map((city) => (
                  <div key={city} className="flex items-center justify-between p-4 bg-[#252525] rounded-lg">
                    <div className="flex items-center gap-3">
                      <MapPin size={16} className="text-[#FF4500]" />
                      <span className="text-sm text-[#F5F5F5] font-semibold">{city}</span>
                    </div>
                    <div className="w-10 h-6 rounded-full bg-[#22C55E] relative cursor-pointer">
                      <div className="absolute top-1 translate-x-5 w-4 h-4 rounded-full bg-white shadow" />
                    </div>
                  </div>
                ))}
                <button className="flex items-center gap-2 px-4 h-9 rounded-lg border border-dashed border-[#FF4500] text-[#FF4500] text-sm font-semibold hover:bg-[rgba(255,69,0,0.08)] transition-colors w-full justify-center">
                  <Plus size={16} /> Add New City
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
