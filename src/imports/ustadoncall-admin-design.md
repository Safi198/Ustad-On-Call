Design the Jobs Management, Bidding Activity, and Category/Services management 
screens for "UstadOnCall" Admin Panel.
Design system: Primary #1A73E8, Accent #FF6D00, BG #F4F6FB, Cards white, 
Font Inter + Poppins. All cards: border-radius 12px, shadow 0px 2px 12px rgba(0,0,0,0.07).

SCREEN 1 — JOBS & REQUESTS PAGE:
Page Header: "Jobs & Requests" + Live count badge (pulsing green dot + count)
Sub-header stats row (5 mini cards, equal width, 80px height):
  All Jobs | Active | Pending | Completed | Cancelled
  Active card highlighted with #E3F2FD border and blue count

JOBS TABLE (main card):
Columns:
  - Job ID (#UCxxxx format, monospace 13px #1A73E8)
  - Customer (avatar + name)
  - Category (colored category pill)
  - Location (pin icon + area name)
  - Posted Date/Time (relative: "2 hours ago", tooltip shows exact)
  - Bids (count badge — orange if >0, gray if 0)
  - Assigned Worker (avatar+name if assigned, "Unassigned" gray if not)
  - Status (pill badges — color coded)
  - Actions (View Details, Track, More)

JOB DETAIL DRAWER (right side panel, 480px, slides in):
Drawer header: "Job #UC1042" + Close X + Status badge (top right)
Section 1 — Job Info:
  Category icon (large 48px colored circle) + Category name + Service type
  Description text block (customer's notes), gray bg card
  Location map thumbnail (static map image) + full address below
  Posted: date/time | Urgency: Normal/Urgent tag

Section 2 — Customer Info:
  Mini profile card: avatar + name + phone + rating + "View Profile" link

Section 3 — Bids Received (collapsible):
  Each bid card:
    Worker avatar + name + category badge
    Bid amount: Poppins 18px Bold #1A73E8
    Note from worker (italic, truncated)
    Timestamp + "Selected" green badge if chosen
    Admin actions: "View Worker" link
  Empty state: illustration + "No bids yet" message

Section 4 — Timeline:
  Vertical timeline with status steps:
  Job Posted → Bids Received → Worker Assigned → In Progress → Completed
  Each step: circle dot (filled if done, outlined if pending) + label + timestamp
  Connecting line: solid for completed, dashed for pending

Drawer footer: 
  "Cancel Job" outlined red | "Reassign Worker" outlined blue | "Mark Complete" filled green

SCREEN 2 — BIDDING ACTIVITY PAGE:
Page purpose: View all bids across platform for transparency/dispute management
Filter bar: Date range | Category | Worker | Job ID search | Status
Table columns:
  Bid ID | Job ID (linked) | Worker (avatar+name) | Bid Amount | 
  Customer's Budget | Variance (+ or - % colored) | Status | Timestamp | Action
Status options: Pending Review | Accepted | Rejected | Withdrawn
Row with accepted bid: Left border accent 3px #2E7D32

SCREEN 3 — CATEGORIES & SERVICES MANAGEMENT:
Layout: Left category list (360px) + Right services detail panel

LEFT — CATEGORY LIST:
Header: "Service Categories" + "Add Category" button (+ icon, #1A73E8)
Each category item (72px height, white card, border-radius 8px, margin-bottom 8px):
  Left: Category icon (32px colored circle background per category)
    Electrician: #FFF3E0 / #FF6D00 icon
    Plumber: #E3F2FD / #1A73E8 icon  
    AC Technician: #E8F5E9 / #2E7D32 icon
    Mechanic: #F3E5F5 / #9C27B0 icon
    Painter: #FCE4EC / #E91E63 icon
  Middle: Category name (15px SemiBold) + services count (12px #9E9E9E)
  Right: Worker count badge + toggle switch (active/inactive) + drag handle

Active category item: Left border 3px #1A73E8, background #F8FBFF

RIGHT — SERVICES PANEL:
Header: Selected category name + "Add Service" button
Service cards grid (2 columns):
  Each service card (white, border-radius 8px, padding 16px):
    Service name: 15px SemiBold
    Description: 12px #9E9E9E, 2 lines max
    Base Price Range: #1A73E8 Bold "PKR 500–1500"
    Duration estimate: clock icon + "1–2 hours"
    Active toggle switch
    Edit (pencil) + Delete (trash) icon buttons top-right

ADD/EDIT CATEGORY MODAL:
Fields: Category Name | Icon selector (emoji/icon picker grid) | 
Color picker (preset swatches) | Description | Status toggle
Icon picker: grid of 20 icons, hover highlight, selected = blue border

ADD/EDIT SERVICE MODAL:
Fields: Service Name | Category (dropdown) | Description (textarea) | 
Min Price (PKR) | Max Price (PKR) | Estimated Duration | Status toggle
Footer: Cancel + Save Service (#1A73E8)

ANIMATION SPECS:
Job drawer: Slide in from right 300ms ease-out, overlay fade 200ms
Bid cards: Stagger appear 40ms each, slide up 8px + fade
Timeline step completion: Dot fills with color + connecting line draws, 400ms
Category drag-reorder: Ghost element + smooth repositioning, spring physics
Service card hover: Lift shadow + slight Y translate -2px, 150ms
Add modal: Center scale 0.95→1.0 + backdrop blur fade, 200ms
Status pill change: Cross-fade between colors, 200ms