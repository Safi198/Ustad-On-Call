Design the Finance Management and Analytics screens for "UstadOnCall" Admin Panel.
Design system: Primary #1A73E8, Accent #FF6D00, Success #2E7D32, 
BG #F4F6FB, Card white #FFFFFF, Font Inter + Poppins.

SCREEN 1 — FINANCIAL OVERVIEW PAGE:
Page title: "Finance & Revenue" + Export button (download icon + "Export Report")
Date range selector (top right): pill toggles — Today | This Week | This Month | Custom
Custom: calendar date range picker dropdown

TOP KPI CARDS ROW (4 cards, equal width):
Card 1 — Total Revenue:
  Icon: trending-up in #E3F2FD square
  Value: "PKR 2,84,500" Poppins 28px Bold
  Label: "Total Platform Revenue" 13px #9E9E9E
  Trend: ▲ 12.4% vs last period (green)

Card 2 — Commission Earned:
  Icon: percentage in #FFF3E0 square (#FF6D00 icon)
  Value: "PKR 42,675"
  Label: "15% Commission Collected"
  Sub: "From 142 completed jobs"

Card 3 — Pending Payouts:
  Icon: wallet in #FFF8E1 square (#F57F17 icon)
  Value: "PKR 18,200"
  Label: "Worker Payouts Pending"
  Action link: "Process Payouts →" #1A73E8

Card 4 — Avg Job Value:
  Icon: chart-bar in #E8F5E9 square
  Value: "PKR 2,003"
  Label: "Average Completed Job"
  Trend: ▲ 5.2%

REVENUE CHART (full width card):
Title: "Revenue Trend" + line/bar toggle (2 icon buttons)
Chart: Dual-axis bar + line chart
  Bars: Gross Transaction Volume (#1A73E8, 60% opacity)
  Line: Net Commission (#FF6D00, solid, 2px stroke, dot markers)
X-axis: Last 12 months abbreviated
Y-axis: PKR amounts, formatted (K suffix)
Hover tooltip: Card showing date + Gross + Commission + Jobs count
Chart legend: colored dot + label, top right of chart

TRANSACTIONS TABLE (full card below chart):
Header: "All Transactions" + search + filter button + CSV export
Columns:
  Txn ID (monospace #1A73E8) | Job ID (linked) | Customer | Worker | 
  Gross Amount | Commission (15%) | Worker Earnings | Payment Method | 
  Date | Payout Status
  
Payout Status badges:
  Paid Out: #E8F5E9 / #2E7D32
  Pending: #FFF8E1 / #F57F17
  Processing: #E3F2FD / #1A73E8
  On Hold: #FFEBEE / #C62828

Row expand (click to expand inline):
  Shows: Full transaction breakdown, job summary, customer & worker mini cards

SCREEN 2 — WORKER PAYOUTS PAGE:
Summary bar: Total Pending PKR X | Workers Awaiting: N | Overdue (>7 days): N (red)
Filter: All | Pending | Processed | Overdue | By Category

Payout List Cards (not table — card per worker):
Each card (horizontal, white, border-radius 12px, padding 16px):
  Left: Worker avatar + name + category tag
  Middle: 
    Completed jobs (period): "8 jobs"
    Gross earned: "PKR 16,400"
    Commission deducted: "- PKR 2,460 (15%)"
    Net Payable: "PKR 13,940" Poppins 18px Bold #1A73E8
  Right:
    Last payout date (small, #9E9E9E)
    Status badge
    "Process Payout" button — #2E7D32 filled when pending
    "View History" text button

Bulk Process Payouts:
  Select all checkbox in header
  Sticky bottom action bar when items selected:
    "X workers selected — Total: PKR XX,XXX"
    "Process Selected Payouts" large #1A73E8 button

SCREEN 3 — ANALYTICS PAGE:
Masonry-style dashboard with draggable widgets

Widget 1 — Jobs by Category (donut, 50% width)
Widget 2 — Top Workers by Completed Jobs (horizontal bar, 50% width)
  Each bar: worker avatar + name left, colored bar, count right
Widget 3 — Customer Acquisition over time (area chart, full width)
  Area fill: gradient #1A73E8 100%→0% opacity
Widget 4 — Top Cities by Activity (table: city, jobs, revenue, workers)
Widget 5 — Hourly Job Requests Heatmap (7 days x 24 hours grid)
  Cell color: white (0) → light blue → #1A73E8 (peak)
  Hover tooltip: exact count

Widget header style (all widgets):
  Card padding 24px, title Poppins 16px SemiBold left, 
  filter/options dots icon right

ANIMATION SPECS:
KPI cards: Count-up numbers on load, 1000ms ease-out
Revenue chart: Bars grow from bottom (scale Y 0→1), 600ms staggered
Line draws left to right, 800ms ease-out
Payout card: Hover shadow elevation + border-left 3px #1A73E8 appear, 150ms
Heatmap cells: Fade in staggered by column, 20ms each, 400ms total
Donut chart: Segments draw clockwise from top, 700ms ease-out
Processing state: Spinner overlay on payout card, 300ms fade