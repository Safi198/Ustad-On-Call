import { useState } from "react";
import { TopBar } from "../components/layout/TopBar";
import { Star, Search, Filter, ChevronDown, ChevronUp, Eye, Flag, EyeOff, Trash2 } from "lucide-react";

const reviews = [
  { id: "R001", jobId: "UC1040", category: "AC Repair", customer: "Bilal Ahmed", custInit: "BA", worker: "Naveed Iqbal", workerInit: "NI", rating: 5, text: "Excellent service! Fixed my AC in no time. Very professional and polite. Cleaned up after work was done. Highly recommend!", date: "Mar 8, 2026", status: "Published" },
  { id: "R002", jobId: "UC1038", category: "Electrical", customer: "Usman Tariq", custInit: "UT", worker: "Ali Ustad", workerInit: "AU", rating: 4, text: "Good work, completed the wiring properly. Was a bit late though.", date: "Mar 8, 2026", status: "Published" },
  { id: "R003", jobId: "UC1035", category: "Painter", customer: "Zainab Bibi", custInit: "ZB", worker: "Tariq Mehmood", workerInit: "TM", rating: 3, text: "Average work. Paint quality was okay but missed some spots on the ceiling. Had to call back for touch ups.", date: "Mar 7, 2026", status: "Flagged" },
  { id: "R004", jobId: "UC1037", category: "Plumbing", customer: "Sana Malik", custInit: "SM", worker: "Kamran Shah", workerInit: "KS", rating: 5, text: "Perfect job installing the water pump. Very knowledgeable and efficient.", date: "Mar 7, 2026", status: "Published" },
  { id: "R005", jobId: "UC1033", category: "Electrical", customer: "Hamza Ali", custInit: "HA", worker: "Ali Ustad", workerInit: "AU", rating: 2, text: "Not satisfied. Work was incomplete and had to hire someone else to finish the job. Would not recommend.", date: "Mar 6, 2026", status: "Under Review" },
  { id: "R006", jobId: "UC1032", category: "AC Repair", customer: "Rehan Shah", custInit: "RS", worker: "Imran Malik", workerInit: "IM", rating: 4, text: "Good service overall. AC is working fine now.", date: "Mar 5, 2026", status: "Published" },
  { id: "R007", jobId: "UC1030", category: "Plumbing", customer: "Fatima Noor", custInit: "FN", worker: "Waqas Aslam", workerInit: "WA", rating: 1, text: "Terrible experience. Rude behavior and overcharged. The pipe started leaking again the next day.", date: "Mar 5, 2026", status: "Hidden" },
];

const statusColors: Record<string, { bg: string; text: string; border: string }> = {
  Published: { bg: "rgba(34,197,94,0.12)", text: "#22C55E", border: "rgba(34,197,94,0.2)" },
  Flagged: { bg: "rgba(255,183,0,0.12)", text: "#FFB700", border: "rgba(255,183,0,0.2)" },
  Hidden: { bg: "rgba(136,136,136,0.12)", text: "#888888", border: "rgba(136,136,136,0.2)" },
  "Under Review": { bg: "rgba(56,189,248,0.12)", text: "#38BDF8", border: "rgba(56,189,248,0.2)" },
};

const categoryColors: Record<string, { bg: string; text: string }> = {
  Electrical: { bg: "rgba(255,69,0,0.12)", text: "#FF4500" },
  Plumbing: { bg: "rgba(56,189,248,0.12)", text: "#38BDF8" },
  "AC Repair": { bg: "rgba(34,197,94,0.12)", text: "#22C55E" },
  Mechanic: { bg: "rgba(147,51,234,0.12)", text: "#9333EA" },
  Painter: { bg: "rgba(255,183,0,0.12)", text: "#FFB700" },
};

export function ReviewsPage() {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const avgRating = (reviews.reduce((a, b) => a + b.rating, 0) / reviews.length).toFixed(1);
  const fiveStars = reviews.filter((r) => r.rating === 5).length;
  const lowStars = reviews.filter((r) => r.rating <= 2).length;
  const flagged = reviews.filter((r) => r.status === "Flagged").length;
  const underReview = reviews.filter((r) => r.status === "Under Review").length;

  const filtered = reviews.filter((r) =>
    r.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.worker.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.jobId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <TopBar title="Reviews & Ratings" subtitle="Reviews" />
      <div className="p-8 space-y-6">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="font-['Poppins'] text-4xl text-[#F5F5F5] font-bold">{avgRating}</span>
            <div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={20} className={s <= Math.round(Number(avgRating)) ? "text-[#FFB700] fill-[#FFB700]" : "text-[#333333]"} />
                ))}
              </div>
              <div className="text-sm text-[#888888] mt-0.5">(1,284 reviews)</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "5-Star Reviews", value: fiveStars, color: "#22C55E" },
            { label: "1-2 Star Reviews", value: lowStars, color: "#FF6B6B" },
            { label: "Flagged Reviews", value: flagged, color: "#FFB700" },
            { label: "Pending Review", value: underReview, color: "#38BDF8" },
          ].map((card) => (
            <div key={card.label} className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl p-4">
              <div className="text-xl font-['Poppins'] font-bold" style={{ color: card.color }}>{card.value}</div>
              <div className="text-xs text-[#888888] mt-0.5">{card.label}</div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-[400px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555555]" />
            <input
              type="text"
              placeholder="Search reviews..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-lg bg-[#252525] border border-[#333333] pl-10 pr-4 text-sm text-[#F5F5F5] placeholder:text-[#555555] focus:border-[#FF4500] outline-none transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 h-10 rounded-lg border border-[#333333] text-sm text-[#888888] hover:text-[#F5F5F5] hover:bg-[#252525] transition-colors font-semibold">
            <Filter size={16} /> Filters
          </button>
        </div>

        <div className="bg-[#1E1E1E] border border-[#2A2A2A] rounded-xl shadow-card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#1A1A1A] border-b border-[#2A2A2A]">
                {["ID", "Job", "Customer", "Worker", "Rating", "Review", "Date", "Status", ""].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#888888] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((review) => (
                <>
                  <tr
                    key={review.id}
                    className="border-b border-[#2A2A2A] hover:bg-[#242424] transition-colors h-16 cursor-pointer"
                    onClick={() => setExpandedRow(expandedRow === review.id ? null : review.id)}
                  >
                    <td className="px-4 text-xs text-[#888888] font-mono">{review.id}</td>
                    <td className="px-4">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-[#FF4500] font-mono font-semibold">#{review.jobId}</span>
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold" style={{ backgroundColor: categoryColors[review.category]?.bg, color: categoryColors[review.category]?.text }}>
                          {review.category}
                        </span>
                      </div>
                    </td>
                    <td className="px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[rgba(255,69,0,0.12)] flex items-center justify-center text-[9px] text-[#FF4500] font-semibold">{review.custInit}</div>
                        <span className="text-sm text-[#F5F5F5]">{review.customer}</span>
                      </div>
                    </td>
                    <td className="px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[rgba(56,189,248,0.12)] flex items-center justify-center text-[9px] text-[#38BDF8] font-semibold">{review.workerInit}</div>
                        <span className="text-sm text-[#888888]">{review.worker}</span>
                      </div>
                    </td>
                    <td className="px-4">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} size={13} className={s <= review.rating ? "text-[#FFB700] fill-[#FFB700]" : "text-[#333333]"} />
                        ))}
                        <span className="text-xs text-[#F5F5F5] ml-1 font-semibold">{review.rating}</span>
                      </div>
                    </td>
                    <td className="px-4 max-w-[200px]">
                      <p className="text-xs text-[#888888] truncate">{review.text}</p>
                    </td>
                    <td className="px-4 text-xs text-[#888888]">{review.date}</td>
                    <td className="px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold border" style={{ backgroundColor: statusColors[review.status]?.bg, color: statusColors[review.status]?.text, borderColor: statusColors[review.status]?.border }}>
                        {review.status}
                      </span>
                    </td>
                    <td className="px-4">
                      {expandedRow === review.id ? <ChevronUp size={16} className="text-[#888888]" /> : <ChevronDown size={16} className="text-[#888888]" />}
                    </td>
                  </tr>
                  {expandedRow === review.id && (
                    <tr key={`${review.id}-expanded`} className="bg-[#1A1A1A]">
                      <td colSpan={9} className="px-6 py-4">
                        <div className="flex gap-6">
                          <div className="flex-1">
                            <h5 className="text-xs text-[#888888] mb-2 font-semibold uppercase tracking-wider">Full Review</h5>
                            <p className="text-sm text-[#C0C0C0] leading-relaxed">{review.text}</p>
                          </div>
                          <div className="flex flex-col gap-2 shrink-0">
                            <button className="flex items-center gap-1.5 px-3 h-8 rounded-md bg-[#22C55E] text-white text-xs font-semibold">
                              <Eye size={13} /> Approve & Publish
                            </button>
                            <button className="flex items-center gap-1.5 px-3 h-8 rounded-md bg-[#252525] text-[#888888] text-xs font-semibold">
                              <EyeOff size={13} /> Hide Review
                            </button>
                            <button className="flex items-center gap-1.5 px-3 h-8 rounded-md bg-[rgba(255,183,0,0.12)] text-[#FFB700] text-xs font-semibold">
                              <Flag size={13} /> Flag
                            </button>
                            <button className="flex items-center gap-1.5 px-3 h-8 rounded-md text-[#FF6B6B] text-xs font-semibold hover:bg-[rgba(255,69,0,0.08)]">
                              <Trash2 size={13} /> Delete
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}