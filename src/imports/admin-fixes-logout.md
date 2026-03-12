Fix Admin Accounts page and Logout functionality for "UstadOnCall" 
Admin Panel.
Theme: Ember Dark — BG #141414, Cards #1E1E1E, Primary #FF4500,
Text #F5F5F5, Muted #888888, Border #2A2A2A, Font Inter + Poppins.

FIX 1 — ADMIN ACCOUNTS PAGE:
Page title: "Admin Accounts" + subtitle "Manage administrator 
access and permissions for the UstadOnCall platform."

TOP BAR:
  Left: Total count "4 Admins" badge
  Right: "Add Admin" #FF4500 button + icon

ADD ADMIN MODAL (fix — currently not working):
Modal: centered, #1E1E1E, border #2A2A2A, radius 16px, 
  width 520px, padding 32px
  Title: "Add New Admin" Poppins 20px SemiBold + X close
  Fields (full width stacked, 16px gap):
    Full Name (text input)
    Email Address (text input)
    Phone Number (text with +92 prefix)
    Role (dropdown — required):
      Super Admin (full access)
      Operations Manager (jobs + users)
      Finance Manager (finance only)
      Support Admin (read-only + chat)
    Temporary Password (text input with generate button right)
    Confirm Password
    Profile Photo (optional upload area)
    Permissions section (shown based on role, editable):
      Grid of toggle switches per module:
      Dashboard | Workers | Customers | Jobs | Finance | 
      Categories | Reviews | Chat | Notifications | Settings
    "Send login credentials via email" checkbox (default on)
  Footer: Cancel outlined + "Create Admin Account" #FF4500 filled
  Success: green checkmark modal → "Admin created. 
    Credentials sent to [email]"

ADMIN LIST (table/cards):
Each admin card (#1E1E1E, border #2A2A2A, radius 12px, padding 20px):
  Row layout:
    Avatar 48px circle (initials if no photo, #FF4500 bg)
    Name Poppins 15px SemiBold + Role badge (color per role:
      Super Admin: #FF4500 tint | Operations: #FFB700 tint | 
      Finance: #22C55E tint | Support: #38BDF8 tint)
    Email + Phone 13px #888888
    Last Active: "2 hours ago" 12px #555555
    Status toggle (Active/Inactive)
    Actions: Edit (pencil) + Permissions (shield) + Delete (trash)

EDIT ADMIN (fix — currently not working):
Edit pencil icon ON CLICK → same modal as Add Admin pre-populated
  All fields editable
  Password field replaced with "Reset Password" button
  Footer: Cancel + "Save Changes" #FF4500

PERMISSIONS MODAL (shield icon):
  Title: "Edit Permissions — [Admin Name]"
  Role badge display (not editable here, edit from Edit Admin)
  Permissions grid (2 columns):
    Each row: Module name + 3 toggles (View / Edit / Delete)
    Modules: Dashboard, Workers, Customers, Jobs & Requests,
    Bidding Activity, Categories, Finance, Commissions,
    Payouts, Reviews, Chat Monitor, Notifications, 
    Activity Logs, Platform Settings, Admin Accounts
  Super Admin: all toggles locked ON + "Super Admin has full 
    unrestricted access" info banner
  Footer: Cancel + "Save Permissions" #FF4500

DELETE ADMIN CONFIRMATION:
  Centered modal, #1E1E1E, 400px
  Warning icon #FF4500 large (48px)
  "Remove Admin Account?"
  "This will permanently remove [Name]'s access. 
  This action cannot be undone."
  Cancel outlined + "Remove Access" #FF4500 filled

FIX 2 — LOGOUT (fix — currently not working):
Sidebar bottom admin section:
  Admin avatar 36px + name + "Super Admin" role label
  Logout button below: door-exit icon + "Logout" #888888 text
  Hover: text turns #FF4500, icon animates 2px rightward

ON CLICK LOGOUT → Confirmation modal:
  Title: "Log Out?"
  Body: "You will be signed out of the UstadOnCall Admin Panel."
  "Cancel" outlined + "Yes, Logout" #FF4500 filled
  On confirm:
    Loading spinner 500ms
    Fade out entire interface 300ms
    Redirect to Login page with slide-up entrance animation
    Show success toast (bottom-center): 
      "You have been logged out successfully" 
      #1E1E1E bg, #22C55E left border, 3s then fade out

SESSION EXPIRY (auto logout):
  When session expires show modal (cannot dismiss):
    "Session Expired"
    "Your session has timed out for security. Please log in again."
    "Back to Login" #FF4500 full width button
    
FORGOT PASSWORD FLOW (from login page):
  Step 1: Enter email → "Send Reset Link" button
    Success: "Check your email for reset instructions" 
    green banner below input
  Step 2: /reset-password page:
    New Password field + Confirm Password field
    Password strength indicator bar 
      (Weak #FF4500 → Fair #FFB700 → Strong #22C55E)
    Requirements checklist (8+ chars, uppercase, number, special)
    "Reset Password" button #FF4500
  Step 3: Success screen — checkmark animation + 
    "Password reset successfully" + "Back to Login" button