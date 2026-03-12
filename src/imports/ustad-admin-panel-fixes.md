Fix and complete the following screens for "UstadOnCall" Admin Panel.
Theme: Ember Dark — BG #141414, Cards #1E1E1E, Primary #FF4500, 
Accent #FFB700, Text #F5F5F5, Muted #888888, Font Inter + Poppins.

FIX 1 — ADD MISSING LOGIN PAGE:
Full screen centered layout, background #141414 with subtle dark 
radial gradient center glow rgba(255,69,0,0.06).
Left panel (50%): 
  UstadOnCall logo top-left (white wordmark + ember icon)
  Large headline: Poppins 36px Bold #F5F5F5 
  "Control the Platform. Manage with Confidence."
  Subtext: Inter 15px #888888
  3 feature points with #FF4500 check icons
  Bottom: "© 2026 UstadOnCall. All rights reserved."
Right panel (50%): Login card #1E1E1E border #2A2A2A radius 16px padding 40px
  Title: "Admin Login" Poppins 24px Bold #F5F5F5
  Subtitle: "Sign in to your admin account" Inter #888888
  Fields:
    Email Address — input #252525 border #333333 focus-border #FF4500
    Password — input with show/hide toggle eye icon right
    "Remember me" checkbox left + "Forgot Password?" link right #FF4500
  Login Button: Full width #FF4500 height 48px "Sign In" 
    Hover: #E03E00, Active: scale 0.98
  Error state: Red border #FF4500 + error message below field
  Loading state: Spinner inside button, button disabled opacity 0.7
Forgot Password flow: separate card, email input + "Send Reset Link" button

FIX 2 — DASHBOARD HEADER (fully working):
Height 64px, Background #1C1C1C, Border-bottom 1px #2A2A2A
Left: Page title "Dashboard" Poppins 18px SemiBold #F5F5F5
  Breadcrumb below: "Home / Dashboard" 12px #888888
Right section (gap 16px, vertically centered):
  REMOVE global search bar from dashboard header entirely.

NOTIFICATION BELL (click state — design the dropdown):
  Bell icon 22px #888888, hover #F5F5F5
  Badge: #FF4500 circle 18px, white number inside, pulse animation
  ON CLICK — Dropdown panel appears below bell (320px wide, #1E1E1E, 
  border #2A2A2A, radius 12px, shadow 0px 8px 40px rgba(0,0,0,0.8)):
    Header row: "Notifications" Poppins 16px SemiBold left + 
      "Mark all read" #FF4500 text button right
    Filter tabs: All | Unread | Jobs | Users | System
      Tab height 32px, active tab underline #FF4500
    Notification items (each 72px, hover #242424):
      Left: Icon circle 36px (color per type: 
        Job=#FF4500 tint, User=#22C55E tint, System=#38BDF8 tint)
      Middle: Title 13px SemiBold #F5F5F5 (1 line)
        Description 12px #888888 (2 lines truncated)
      Right: Timestamp 11px #555555 + unread blue dot 6px
      Unread item: left border 2px #FF4500
    Empty state: icon + "You're all caught up!" centered
    Footer: "View All Notifications" full width button #FF4500 outlined

ADMIN PROFILE DROPDOWN (click state — fix):
  Avatar 36px circle + "Shaheer Alam" Inter 14px SemiBold #F5F5F5 + chevron
  ON CLICK — Dropdown (200px, #1E1E1E, border #2A2A2A, radius 10px):
    Top: Avatar + full name + role "Super Admin" small #888888
    Divider #2A2A2A
    Items (40px each, hover #242424, icon left #888888):
      👤 My Profile
      ⚙️ Account Settings  
      🔑 Change Password
    Divider #2A2A2A
    🚪 Logout — text #FF4500, hover BG rgba(255,69,0,0.08)

FIX 3 — DASHBOARD RECENT SECTIONS (fix eye icon + view all):
"Recent Job Requests" card:
  Each row has Actions column with:
    Eye icon button (20px): hover #FF4500, 
    ON CLICK → opens Job Detail right-side drawer (480px slide-in)
    Drawer shows: Job info, customer details, bids, status timeline
  "View All Jobs →" link bottom-right #FF4500 hover underline
  ON CLICK → navigates to Jobs & Requests page

"Recent Worker Registrations" card:
  Each item eye icon ON CLICK → opens Worker Profile full page navigation
  "View All Workers →" link bottom-right #FF4500
  Approve button (green outlined) on pending workers → 
    triggers confirmation modal then updates status inline

FIX 4 — NOTIFICATION FULL PAGE:
"/notifications" route — full page version
Same layout as dropdown but expanded:
  Left filter sidebar (200px): categories, read/unread, date range
  Right: Full notification list with pagination
  Each item expanded: shows full message + action button + timestamp