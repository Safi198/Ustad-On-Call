Fix Jobs, Bidding, Categories, Finance, Commissions and Payouts 
screens for "UstadOnCall" Admin Panel.
Theme: Ember Dark — BG #141414, Cards #1E1E1E, Primary #FF4500,
Accent #FFB700, Text #F5F5F5, Muted #888888, Font Inter + Poppins.

FIX 1 — JOBS & REQUESTS PAGE:
Add full filter bar (horizontal card above table, #1E1E1E border #2A2A2A):
  Row of filter controls:
    Search input (Job ID or customer name, 240px)
    Category dropdown (multi-select with category icons)
    Status dropdown (Active/Pending/Completed/Cancelled/Disputed)
    City/Area dropdown
    Date Range picker (posted from → to)
    Worker Assigned (Assigned / Unassigned toggle pills)
    "Apply" #FF4500 filled + "Reset" text button
  Active filters display as removable chips below bar
  Each chip: label + X remove button, #FF4500 tint bg

FIX 2 — BIDDING ACTIVITY PAGE (more accurate):
Page purpose banner (info card top): 
  "This page shows all bids placed by workers on customer job requests. 
  Admins can monitor bidding activity, identify pricing patterns, 
  and investigate disputes. No editing permitted."
  Icon: info circle #38BDF8

Filter bar:
  Job ID search | Worker name search | Category dropdown |
  Bid Status (Pending/Accepted/Rejected/Withdrawn) | Date range |
  Price range slider (PKR 0 to 50,000)

TABLE COLUMNS (redesigned for accuracy):
  Bid # | Job ID (clickable → job drawer) | 
  Worker (avatar + name + rating stars) | 
  Customer (avatar + name) |
  Category (colored pill) |
  Bid Amount (PKR, Bold #FFB700) |
  Job Budget (PKR, #888888) |
  Difference (+ or - PKR, colored green/red) |
  Bid Note (truncated 120px, expand on hover) |
  Bid Time | Job Status | Bid Status | Actions

Actions column (eye icon — FIX):
  Eye icon ON CLICK → Bid Detail modal (480px, centered):
    Top: Job info card (ID, category, customer, location)
    Middle: Worker info card (avatar, name, rating, completed jobs)
    Bid section: Amount large #FFB700, Note full text, Timestamp
    All bids on this job listed below (comparison view):
      Each bid row: worker name + amount + status
      Accepted bid highlighted #22C55E left border
    Footer: "View Full Job" button + "View Worker Profile" button
    NO edit/modify options — read-only monitoring

FIX 3 — CATEGORIES & SERVICES PAGE:
Layout: Two separate full-width sections (stacked, not side by side)

SECTION 1 — CATEGORIES:
Section header: "Service Categories" Poppins 18px + 
  "Add Category" button #FF4500 — ON CLICK → Add Category Modal:
    Fields: Category Name | Icon picker (grid of icons, 
    select highlights with #FF4500 border) | 
    Color (preset swatches: 8 colors) | Description | Status toggle
    Footer: Cancel + "Save Category" #FF4500
Categories displayed as horizontal card grid (3 per row):
  Each card #1E1E1E border #2A2A2A radius 12px padding 20px:
    Icon circle (category color) + Name + Services count badge
    Worker count + Active jobs count
    Status toggle switch
    Edit icon + Delete icon (top right)

SECTION 2 — SERVICES (below, separated by divider):
Section header: "Services" + Category filter dropdown (left) + 
  "Add Service" button #FF4500 — ON CLICK → Add Service Modal:
    Fields: Service Name | Category dropdown | 
    Description textarea | Min Price PKR | Max Price PKR |
    Estimated Duration (dropdown) | Status toggle
    Footer: Cancel + "Save Service" #FF4500
Services grid (4 per row, #1E1E1E cards):
  Service name + Category pill + Price range #FFB700 bold +
  Duration + Status toggle + Edit/Delete icons

FIX 4 — FINANCE & REVENUE (fix filters):
Filter bar completely rebuilt (same style as Jobs filter bar):
  Date Range picker | Category | Payment Status | 
  Min Amount | Max Amount | Worker search | Customer search
  Apply + Reset buttons, removable filter chips

FIX 5 — COMMISSIONS PAGE (make logical):
Remove confusing content. Rebuild as:

Page title: "Commission Management" 
Explanation banner: "UstadOnCall charges 15% commission on every 
completed job. This page shows commission collected, breakdowns 
per worker and category, and pending amounts."

Top cards row:
  Total Commission Collected | This Month Commission | 
  Avg Commission per Job | Highest Earning Category

Commission Breakdown Table:
  Worker | Jobs Completed | Total Job Value | 
  Commission (15%) | Paid Out | Pending | Status
  Each row expandable → shows individual job commission breakdown

Category Commission Chart:
  Bar chart: each category bar showing commission earned
  Hover tooltip: jobs count + total value + commission

FIX 6 — WORKER PAYOUTS PAGE (rebuild logically):
Explanation banner: "Process payments owed to workers after 
deducting 15% platform commission from completed jobs."

Top summary cards:
  Total Pending Payouts | Overdue (>7 days, red) | 
  Paid This Week | Next Batch Date

Payout cards list (one card per worker):
  Worker info left | Jobs this period | Gross | -Commission | 
  Net Payable #22C55E bold | Last Paid date | Status badge |
  "Process Payout" button #22C55E (if pending) | 
  "View History" button outlined

VIEW HISTORY (fix — working button):
  ON CLICK → right drawer slides in (400px):
    Worker name + avatar header
    Payout history table:
      Date | Jobs Count | Gross | Commission | Net | Method | Receipt
    Total row at bottom (bold)
    "Export History" button top-right of drawer
    Close X button