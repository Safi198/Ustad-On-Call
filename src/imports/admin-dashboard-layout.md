Design the main Admin Dashboard screen and global navigation layout for "UstadOnCall" 
Admin Web Platform. Use the established design system: Primary #1A73E8, Accent #FF6D00, 
Dark Sidebar #1C1C2E, Background #F4F6FB, Font Inter + Poppins.

LAYOUT STRUCTURE:
Canvas: 1440px wide desktop layout
Left Sidebar: Fixed, 260px wide, dark navy #1C1C2E
Main Content Area: Fluid, starts at 260px, padding 32px
Top Header Bar: 64px tall, white #FFFFFF, border-bottom #E0E0E0

LEFT SIDEBAR DESIGN:
Top section: UstadOnCall logo (white version), 24px padding, 72px height
Navigation items grouped with subtle section labels:
  Section "OVERVIEW": Dashboard
  Section "USERS": Customers, Workers, Pending Approvals
  Section "OPERATIONS": Jobs & Requests, Bidding Activity, Categories & Services
  Section "FINANCE": Transactions, Commissions, Worker Payouts
  Section "PLATFORM": Reviews & Ratings, Chat Monitor, Notifications, Activity Logs
  Section "SETTINGS": Platform Settings, Admin Accounts
  
Nav item height: 44px, border-radius 8px, horizontal padding 16px
Active item: Background #1A73E8, text white, left accent bar 3px #FF6D00
Hover item: Background rgba(255,255,255,0.06)
Icon left 20px, label 14px Inter SemiBold
Section labels: 10px Inter SemiBold Uppercase #B0BEC5, padding-top 20px
Sidebar bottom: Admin profile avatar + name + "Logout" button

TOP HEADER BAR:
Left: Current page breadcrumb — "Dashboard" in Poppins 18px SemiBold
Right group (gap 16px):
  - Search bar (280px, rounded pill, #F4F6FB background, search icon)
  - Notification bell icon with orange badge count pill
  - Admin avatar circle (36px) + name + dropdown chevron

DASHBOARD CONTENT — STATS ROW (4 cards):
Card dimensions: flex-1, min 240px, height 120px, border-radius 12px, white bg
Each stat card contains:
  - Icon in colored square (40px, border-radius 8px, tinted background)
  - Metric value: Poppins 28px Bold #1C1C2E
  - Metric label: Inter 13px #9E9E9E
  - Trend indicator: small arrow + percentage in green or red, 12px

Cards:
  1. Total Workers — icon: wrench — accent #1A73E8 tint
  2. Total Customers — icon: users — accent #FF6D00 tint
  3. Active Jobs — icon: briefcase — accent green tint
  4. Platform Revenue — icon: currency — accent purple tint

DASHBOARD — CHARTS ROW (below stats):
Left card (60% width): "Jobs Overview" — Line chart showing 30-day job activity
  Two lines: Posted Jobs (#1A73E8) and Completed Jobs (#2E7D32)
  X-axis: dates, Y-axis: count, grid lines subtle #F0F0F0
  Chart header: title left, date filter dropdown right (7d / 30d / 90d)

Right card (38% width): "Jobs by Category" — Donut chart
  Segments: Electrical #1A73E8, Plumbing #FF6D00, AC Repair #2E7D32, 
  Mechanic #9C27B0, Other #9E9E9E
  Legend below with color dot + category name + count
  Center of donut: total job count in Poppins 24px Bold

DASHBOARD — BOTTOM ROW:
Left (50%): "Recent Job Requests" table
  Columns: Job ID, Customer, Category, Status badge, Date, Action button
  Status badges: pill shape, color-coded
    Active: #E3F2FD text #1A73E8
    Completed: #E8F5E9 text #2E7D32
    Pending: #FFF8E1 text #F57F17
    Cancelled: #FFEBEE text #C62828
  5 rows visible, "View All" link bottom right

Right (48%): "Recent Worker Registrations"
  List of 5 workers: avatar circle + name + category tag + join date + 
  Status (Approved/Pending) + quick action icons (approve/view)

ANIMATION SPECS:
Stat cards: Stagger fade-in from bottom, 50ms delay each, 200ms duration
Charts: Draw animation on load, 600ms ease-out
Table rows: Fade in staggered 30ms each
Sidebar active state transition: 150ms background fill
Number counters: Animate from 0 to value on first load, 800ms ease-out