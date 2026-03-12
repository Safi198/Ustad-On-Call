import { useState } from "react";
import { TopBar } from "../components/layout/TopBar";
import { Plus, Pencil, Trash2, Zap, Droplets, Wind, Car, Paintbrush, Clock, X } from "lucide-react";

const categoriesData = [
  { id: 1, name: "Electrician", icon: Zap, color: "#FF4500", workers: 312, servicesCount: 8, active: true },
  { id: 2, name: "Plumber", icon: Droplets, color: "#38BDF8", workers: 218, servicesCount: 6, active: true },
  { id: 3, name: "AC Technician", icon: Wind, color: "#22C55E", workers: 175, servicesCount: 5, active: true },
  { id: 4, name: "Mechanic", icon: Car, color: "#9333EA", workers: 124, servicesCount: 7, active: true },
  { id: 5, name: "Painter", icon: Paintbrush, color: "#FFB700", workers: 89, servicesCount: 4, active: false },
];

const servicesMap: Record<number, Array<{ id: number; name: string; desc: string; minPrice: number; maxPrice: number; duration: string; active: boolean }>> = {
  1: [
    { id: 1, name: "Wiring & Rewiring", desc: "Complete house wiring, rewiring and circuit installation", minPrice: 1500, maxPrice: 8000, duration: "2-4 hours", active: true },
    { id: 2, name: "Short Circuit Repair", desc: "Diagnose and fix electrical short circuits", minPrice: 500, maxPrice: 2000, duration: "1-2 hours", active: true },
    { id: 3, name: "Fan Installation", desc: "Ceiling fan, exhaust fan installation and repair", minPrice: 300, maxPrice: 1000, duration: "30-60 min", active: true },
    { id: 4, name: "Switch & Socket Repair", desc: "Replace or repair switches, sockets, and boards", minPrice: 200, maxPrice: 800, duration: "30 min", active: true },
    { id: 5, name: "Generator Repair", desc: "Generator maintenance, repair and installation", minPrice: 2000, maxPrice: 10000, duration: "2-5 hours", active: true },
    { id: 6, name: "UPS Installation", desc: "UPS system setup, battery replacement", minPrice: 1000, maxPrice: 5000, duration: "1-3 hours", active: true },
  ],
  2: [
    { id: 7, name: "Pipe Repair", desc: "Fix leaking or burst pipes", minPrice: 500, maxPrice: 3000, duration: "1-3 hours", active: true },
    { id: 8, name: "Tap Installation", desc: "Install or replace taps and faucets", minPrice: 300, maxPrice: 1500, duration: "30-60 min", active: true },
    { id: 9, name: "Toilet Repair", desc: "Toilet flush, seat and drain repair", minPrice: 500, maxPrice: 2500, duration: "1-2 hours", active: true },
    { id: 10, name: "Water Pump", desc: "Water pump installation and repair", minPrice: 1000, maxPrice: 5000, duration: "1-3 hours", active: true },
  ],
  3: [
    { id: 11, name: "AC Gas Refill", desc: "Refrigerant gas refill and pressure check", minPrice: 1500, maxPrice: 4000, duration: "1-2 hours", active: true },
    { id: 12, name: "AC Maintenance", desc: "Full service including cleaning and filter wash", minPrice: 800, maxPrice: 2500, duration: "1-2 hours", active: true },
    { id: 13, name: "AC Installation", desc: "Split or window AC installation", minPrice: 2000, maxPrice: 6000, duration: "2-4 hours", active: true },
  ],
  4: [
    { id: 14, name: "Car Battery", desc: "Battery replacement and jump start", minPrice: 500, maxPrice: 3000, duration: "30-60 min", active: true },
    { id: 15, name: "Engine Repair", desc: "Engine diagnostics and repair", minPrice: 2000, maxPrice: 15000, duration: "3-8 hours", active: true },
    { id: 16, name: "Oil Change", desc: "Engine oil change and filter replacement", minPrice: 1000, maxPrice: 4000, duration: "30-60 min", active: true },
  ],
  5: [
    { id: 17, name: "Interior Painting", desc: "Walls and ceiling painting for rooms", minPrice: 3000, maxPrice: 20000, duration: "1-3 days", active: true },
    { id: 18, name: "Exterior Painting", desc: "Outer wall and boundary painting", minPrice: 5000, maxPrice: 30000, duration: "2-5 days", active: true },
  ],
};

export function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [showAddService, setShowAddService] = useState(false);
  const services = servicesMap[selectedCategory] || [];
  const activeCat = categoriesData.find((c) => c.id === selectedCategory);

  return (
    <>
      <TopBar title="Categories & Services" subtitle="Categories" />
      <div className="p-8">
        <div className="flex gap-6 h-[calc(100vh-160px)]">
          <div className="w-[360px] shrink-0">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-['Poppins'] text-base text-[#F5F5F5] font-semibold">Service Categories</h4>
              <button className="flex items-center gap-1.5 px-3 h-8 rounded-lg bg-[#FF4500] text-white text-xs font-semibold hover:bg-[#E03E00] transition-colors">
                <Plus size={14} /> Add Category
              </button>
            </div>
            <div className="space-y-2">
              {categoriesData.map((cat) => {
                const Icon = cat.icon;
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full flex items-center gap-3 p-4 rounded-lg transition-all text-left border ${
                      isSelected
                        ? "bg-[rgba(255,69,0,0.08)] border-l-[3px] border-l-[#FF4500] border-t-[#2A2A2A] border-r-[#2A2A2A] border-b-[#2A2A2A]"
                        : "bg-[#1E1E1E] border-[#2A2A2A] border-l-[3px] border-l-transparent hover:border-l-[#333333]"
                    }`}
                  >
                    <div className="p-2 rounded-lg shrink-0" style={{ backgroundColor: `${cat.color}20` }}>
                      <Icon size={20} style={{ color: cat.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-[#F5F5F5] font-semibold">{cat.name}</div>
                      <div className="text-xs text-[#888888]">{cat.servicesCount} services</div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-[rgba(255,69,0,0.12)] text-[#FF4500] font-semibold">
                        {cat.workers}
                      </span>
                      <div className={`w-8 h-5 rounded-full relative cursor-pointer transition-colors ${cat.active ? 'bg-[#22C55E]' : 'bg-[#555555]'}`}>
                        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${cat.active ? 'translate-x-3.5' : 'translate-x-0.5'}`} />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {activeCat && (
                  <>
                    <div className="p-2 rounded-lg" style={{ backgroundColor: `${activeCat.color}20` }}>
                      <activeCat.icon size={20} style={{ color: activeCat.color }} />
                    </div>
                    <h4 className="font-['Poppins'] text-base text-[#F5F5F5] font-semibold">{activeCat.name} Services</h4>
                    <span className="text-xs text-[#888888]">({services.length} services)</span>
                  </>
                )}
              </div>
              <button
                onClick={() => setShowAddService(true)}
                className="flex items-center gap-1.5 px-3 h-8 rounded-lg bg-[#FF4500] text-white text-xs font-semibold hover:bg-[#E03E00] transition-colors"
              >
                <Plus size={14} /> Add Service
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-lg p-4 hover:border-[#333333] transition-all group"
                >
                  <div className="flex items-start justify-between">
                    <h5 className="text-sm text-[#F5F5F5] font-semibold">{service.name}</h5>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1 rounded hover:bg-[#252525]"><Pencil size={14} className="text-[#888888]" /></button>
                      <button className="p-1 rounded hover:bg-[rgba(255,69,0,0.08)]"><Trash2 size={14} className="text-[#FF6B6B]" /></button>
                    </div>
                  </div>
                  <p className="text-xs text-[#888888] mt-1 line-clamp-2">{service.desc}</p>
                  <div className="mt-3 text-sm text-[#FF4500] font-bold">
                    PKR {service.minPrice.toLocaleString()}–{service.maxPrice.toLocaleString()}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1 text-xs text-[#888888]">
                      <Clock size={12} /> {service.duration}
                    </div>
                    <div className={`w-8 h-5 rounded-full relative cursor-pointer transition-colors ${service.active ? 'bg-[#22C55E]' : 'bg-[#555555]'}`}>
                      <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${service.active ? 'translate-x-3.5' : 'translate-x-0.5'}`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showAddService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/75" onClick={() => setShowAddService(false)} />
          <div className="relative bg-[#1E1E1E] border border-[#2A2A2A] rounded-2xl w-[520px] shadow-modal p-8">
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-['Poppins'] text-lg text-[#F5F5F5] font-bold">Add New Service</h4>
              <button onClick={() => setShowAddService(false)} className="p-1 hover:bg-[#252525] rounded-lg"><X size={18} className="text-[#888888]" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-[#888888] block mb-1.5 font-semibold uppercase tracking-wider">Service Name</label>
                <input className="w-full h-10 rounded-lg bg-[#252525] border border-[#333333] px-3 text-sm text-[#F5F5F5] outline-none focus:border-[#FF4500]" placeholder="e.g. Wiring Installation" />
              </div>
              <div>
                <label className="text-xs text-[#888888] block mb-1.5 font-semibold uppercase tracking-wider">Category</label>
                <select className="w-full h-10 rounded-lg bg-[#252525] border border-[#333333] px-3 text-sm text-[#F5F5F5] outline-none focus:border-[#FF4500]">
                  {categoriesData.map((c) => <option key={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-[#888888] block mb-1.5 font-semibold uppercase tracking-wider">Description</label>
                <textarea className="w-full h-20 rounded-lg bg-[#252525] border border-[#333333] px-3 py-2 text-sm text-[#F5F5F5] outline-none focus:border-[#FF4500] resize-none" placeholder="Brief description..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-[#888888] block mb-1.5 font-semibold uppercase tracking-wider">Min Price (PKR)</label>
                  <input type="number" className="w-full h-10 rounded-lg bg-[#252525] border border-[#333333] px-3 text-sm text-[#F5F5F5] outline-none focus:border-[#FF4500]" placeholder="500" />
                </div>
                <div>
                  <label className="text-xs text-[#888888] block mb-1.5 font-semibold uppercase tracking-wider">Max Price (PKR)</label>
                  <input type="number" className="w-full h-10 rounded-lg bg-[#252525] border border-[#333333] px-3 text-sm text-[#F5F5F5] outline-none focus:border-[#FF4500]" placeholder="5000" />
                </div>
              </div>
              <div>
                <label className="text-xs text-[#888888] block mb-1.5 font-semibold uppercase tracking-wider">Estimated Duration</label>
                <input className="w-full h-10 rounded-lg bg-[#252525] border border-[#333333] px-3 text-sm text-[#F5F5F5] outline-none focus:border-[#FF4500]" placeholder="e.g. 1-2 hours" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowAddService(false)} className="flex-1 h-10 rounded-lg border border-[#333333] text-sm text-[#F5F5F5] font-semibold hover:bg-[#252525]">Cancel</button>
              <button onClick={() => setShowAddService(false)} className="flex-1 h-10 rounded-lg bg-[#FF4500] text-white text-sm font-semibold hover:bg-[#E03E00]">Save Service</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
