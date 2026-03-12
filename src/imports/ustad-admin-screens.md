Design the Communication Monitoring, Review Management, Notifications, and 
Activity Log screens for "UstadOnCall" Admin Panel.
Design system: Primary #1A73E8, Accent #FF6D00, BG #F4F6FB, 
Cards white, Font Inter + Poppins, Border radius 8–12px.

SCREEN 1 — CHAT MONITOR PAGE:
Purpose: Admin can read all conversations between customers and workers for safety.
Layout: Left conversation list (380px) + Right chat viewer (fluid)

LEFT — CONVERSATION LIST:
Header: "Chat Monitor" + search bar (full width, 40px, rounded)
Filter tabs: All | Active Jobs | Reported | Flagged
  Flagged tab: red dot indicator badge

Each conversation item (76px height, hover #F8F9FF):
  Left: Two overlapping avatars (customer + worker, 32px each)
  Middle:
    Job ID + Category tag (small pill)
    Last message preview: 13px #9E9E9E truncated 1 line
    Participants: "Hamza ↔ Ali Ustad" 12px
  Right:
    Timestamp 12px #9E9E9E
    Unread badge (if flagged): red pill
    Flag icon: outlined (normal) / filled red (flagged)
  
Active conversation: left border 3px #1A73E8, bg #F8FBFF

RIGHT — CHAT VIEWER:
Top bar:
  Job card: Job #UC1042 | Electrician | Date | Status badge
  Participants: customer mini card + ↔ icon + worker mini card
  Action buttons: "Flag Conversation" (flag icon) | "Export Chat" | 
  "View Job Details" | "Contact Users"

Chat messages area (scrollable, #F4F6FB background):
  Customer messages: Right-aligned, #E3F2FD bubble, #1A73E8 text, 
    border-radius 12px 12px 2px 12px
  Worker messages: Left-aligned, white bubble, shadow level 1,
    border-radius 12px 12px 12px 2px
  Message: text content + timestamp 11px below + read receipt
  System messages: Centered, gray pill — "Job was assigned" / "Job Completed"
  
  Date separators: centered gray label "Today", "Yesterday", specific dates
  
Flagged message highlight: Yellow left border 3px #F57F17 + 
  subtle #FFFDE7 background on that bubble

Admin Note panel (below chat, collapsible 100px):
  Textarea "Add internal admin note about this conversation..." 
  + Save Note button (notes NOT visible to users, label: "Admin Only")

SCREEN 2 — REVIEWS & RATINGS PAGE:
Page header: "Reviews & Ratings" + average platform rating display
  Large star rating: Poppins 40px Bold "4.3" + star icons + "(1,284 reviews)"

Summary row (4 mini cards):
  5★ Reviews | 1–2★ Reviews | Flagged Reviews | Pending Review

REVIEWS TABLE:
Columns:
  Review ID | Job (ID + category pill) | Customer (name+avatar) | 
  Worker (name+avatar) | Rating (star display 1–5) | Review Text (truncated) |
  Date | Status | Actions

Review text cell: 200px max, truncated with "Read more" expand inline
Rating display: filled stars #F57F17 + number

Status badges:
  Published: #E8F5E9 / #2E7D32
  Flagged: #FFF3E0 / #FF6D00
  Hidden: #F5F5F5 / #9E9E9E
  Under Review: #E3F2FD / #1A73E8

Row expand (click) shows full review + admin actions:
  "Approve & Publish" | "Hide Review" | "Flag as Inappropriate" | 
  "Request Edit" | "Delete Review"
  
Each action styled: Approve=green, Hide=gray, Flag=orange, Delete=red text buttons

WORKER RATING BREAKDOWN (side panel, opens on worker name click):
  Donut showing 5★/4★/3★/2★/1★ distribution with counts
  Average score trend line (last 6 months)
  All reviews list filtered to that worker

SCREEN 3 — NOTIFICATIONS MANAGEMENT:
Two-tab layout: "Send Notification" | "Notification History"

SEND NOTIFICATION TAB:
Form card (640px centered, white, border-radius 12px, padding 32px):
  Title: "Create Platform Notification"
  Fields:
    Notification Title (text input)
    Message Body (textarea, 120px, char counter bottom right)
    Target Audience (segmented control):
      All Users | All Workers | All Customers | Specific Category | 
      Custom Selection
    If Custom: multi-select user search field with chips
    Notification Type (icon radio group):
      📢 Announcement | ⚠️ Alert | 💡 Tip | 🎉 Promotion
    Send via: toggle chips — In-App | SMS | Email (multi-select)
    Schedule: Send Now toggle OR date/time picker (shows when toggle off)
  Preview card (right side or below): 
    Mobile notification mockup showing how it appears on phone
  Footer: "Send to X Users" button (#1A73E8 filled, shows target count)

NOTIFICATION HISTORY TAB:
Table: Title | Type (icon) | Audience | Sent Via | Recipients | Open Rate | 
  Date Sent | Status (Sent/Scheduled/Failed)
Open rate: mini horizontal bar inside cell, colored #1A73E8

SCREEN 4 — ACTIVITY LOG PAGE:
Purpose: Full audit trail of all admin actions

Filter bar: Admin User selector | Action Type multi-select | Date range | Search

Log entries (timeline list style):
Each entry (48px, hover bg #F8F9FF, border-bottom #F0F0F0):
  Left: Admin avatar (28px) + action type icon (colored dot: 
    Create=green, Edit=blue, Delete=red, Approve=teal, Suspend=orange)
  Middle: 
    Action description (14px): "Ahmed approved worker profile for Hamza Khan"
    Resource link (13px #1A73E8 underline): "Worker #W0042"
  Right: 
    Timestamp 12px #9E9E9E
    IP Address 11px #B0BEC5

Color coding for action types:
  User actions: blue left dot
  Financial actions: green left dot  
  Content moderation: orange left dot
  System settings: purple left dot
  Deletion: red left dot

ANIMATION SPECS:
Chat list item hover: smooth bg transition 100ms + subtle left border grow
Chat bubble appear: slide up 6px + fade 150ms, staggered 30ms per message
Review row expand: smooth max-height transition 250ms ease
Star rating hover (in review table): stars fill sequentially left to right, 100ms each
Notification preview: Live update as admin types (debounced 300ms)
Activity log: New entries slide down from top with highlight flash #FFF3E0→white, 
  600ms, when real-time update arrives
Flag icon toggle: Bounce animation scale 1→1.3→1, 200ms when flagging