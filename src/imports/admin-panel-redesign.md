Fix and redesign the Customers and Workers management screens for 
"UstadOnCall" Admin Panel.
Theme: Ember Dark — BG #141414, Cards #1E1E1E, Primary #FF4500,
Text #F5F5F5, Muted #888888, Border #2A2A2A, Font Inter + Poppins.

FIX 1 — CUSTOMERS PAGE (complete rebuild):
DEFAULT TAB ORDER — reorder tabs to:
  1st tab: "Pending Approval" (with orange count badge #FFB700)
  2nd tab: "All Customers"
  3rd tab: "Active"  
  4th tab: "Blocked/Suspended"
Tab style: pill tabs, active #FF4500 bg white text, count badge per tab

TOP ACTION BAR:
  Left: Tab switcher (as above)
  Right: 
    Filter button (sliders icon + "Filter" #888888 outlined, 
      ON CLICK → filter drawer slides from right 320px)
    "Add Customer" button #FF4500 filled, white text, + icon left
    
FILTER DRAWER (right slide-in, 320px, #1E1E1E):
  Fields: City/Area dropdown, Status multi-select, 
  Registration Date range picker (from/to calendar), 
  Total Jobs range slider, Total Spent range
  Footer: "Reset" outlined + "Apply Filters" #FF4500 filled

ADD CUSTOMER MODAL (missing — add this):
  Title: "Add New Customer" Poppins 18px + close X
  Fields (stacked, full width):
    Full Name (text input) | Phone Number (with +92 prefix)
    Email Address | City (dropdown: Karachi, Lahore, Islamabad etc.)
    Password | Confirm Password
    Profile Photo (drag-drop upload area, dashed border #333333)
    Account Status toggle (Active default)
  Footer: "Cancel" outlined + "Create Customer" #FF4500 filled
  Success state: Green checkmark animation + "Customer added successfully"

CUSTOMERS TABLE — FIX ACTIONS COLUMN:
  3 action buttons per row:
  1. Eye icon → ON CLICK: navigate to full Customer Profile page
  2. Edit icon → ON CLICK: opens Edit Customer slide-in drawer (same 
     fields as Add Customer modal, pre-populated)
  3. Three dots (⋮) → ON CLICK: context menu appears (160px, 
     #252525, border #333333, radius 8px, shadow level 2):
       View Profile (eye icon)
       Edit Details (pencil icon)
       Reset Password (key icon)
       ── divider ──
       Suspend Account (pause icon, #FFB700 text)
       Block Customer (ban icon, #FF4500 text)
       Delete Account (trash icon, #FF4500 text, requires confirm)

CUSTOMER PROFILE PAGE (missing — full separate page):
URL: /customers/[id]
Layout: Left profile card 320px + Right tabbed content fluid

LEFT PROFILE CARD (#1E1E1E, border #2A2A2A, radius 12px):
  Cover: gradient #FF4500 → #1C1C1C, 100px
  Avatar: 72px circle, border 3px #FF4500, overlapping cover
  Name: Poppins 20px Bold #F5F5F5
  Phone + Email: 13px #888888
  City: map-pin + city name
  Member since: calendar icon + date
  Status badge: Active/Suspended pill
  3 stat boxes: Total Requests | Total Spent | Ratings Given
  Action buttons full width:
    "Edit Profile" #FF4500 filled
    "Send Message" outlined #FF4500
    "Suspend Account" outlined #FFB700
    "Delete Account" outlined red

RIGHT — TABS: 
  Overview | Job History | Payments | Reviews Given | Activity

FIX 2 — WORKERS PAGE:
DEFAULT TAB ORDER:
  1st: "Pending Approval" (orange badge count)
  2nd: "All Workers"
  3rd: "Active"
  4th: "Suspended"

FILTER PANEL (redesign — right drawer 320px):
  Category (multi-select checkboxes with category icons)
  Service City (multi-select)
  Rating (star range: 1★ to 5★ slider)
  Jobs Completed (range: 0 to 500+)
  Registration Date (date range picker from/to)
  Verification Status (CNIC Verified / Not Verified toggles)
  Payout Status (Pending / Up to date)
  Footer: Reset + Apply #FF4500

WORKER PROFILE — SEPARATE FULL PAGE (not drawer):
URL: /workers/[id]
Each worker row eye icon + name click → navigates to full page
Full page layout same structure as described in previous prompts
  but styled in Ember Dark theme
Back button top-left: "← Back to Workers" #888888 hover #F5F5F5

FIX 3 — PENDING APPROVALS PAGE:
Rename page title to: "Pending Registrations" 
Rename sidebar label to: "Pending Registrations"

Add missing summary cards row:
  Pending Review (count, #FFB700) | Approved This Week (count, #22C55E) 
  | Rejected This Week (count, #FF4500) | Avg Review Time (hours, #38BDF8)

Filter bar (horizontal, above table):
  Date Range picker (from/to) | Category dropdown | City dropdown
  Search by name/phone

Each worker card in list:
  Eye icon → opens Worker Preview modal (full profile preview, read-only)
  "Approve" button → #22C55E filled + confirm modal:
    "Approve [Name]? This will notify them via SMS."
    Cancel + Confirm Approve
  "Reject" button → #FF4500 outlined + reject modal:
    Reason dropdown (required): 
      Incomplete Documents | Fake Information | 
      Duplicate Account | Other
    Notes textarea optional
    Cancel + Confirm Reject
  Both actions update row status inline with animation
  Rejected row fades out after 2s with slide-up collapse