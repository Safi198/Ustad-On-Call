import { createBrowserRouter } from "react-router";
import { Layout } from "./components/layout/Layout";
import { LoginPage } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { WorkersPage } from "./pages/Workers";
import { CustomersPage } from "./pages/Customers";
import { PendingApprovalsPage } from "./pages/PendingApprovals";
import { JobsPage } from "./pages/Jobs";
import { BiddingPage } from "./pages/Bidding";
import { CategoriesPage } from "./pages/Categories";
import { FinancePage } from "./pages/Finance";
import { CommissionsPage } from "./pages/Commissions";
import { PayoutsPage } from "./pages/Payouts";
import { ReviewsPage } from "./pages/Reviews";
import { ChatMonitorPage } from "./pages/ChatMonitor";
import { NotificationsPage } from "./pages/Notifications";
import { ActivityLogPage } from "./pages/ActivityLog";
import { SettingsPage } from "./pages/Settings";
import { AdminAccountsPage } from "./pages/AdminAccounts";
import { CustomerProfilePage } from "./pages/CustomerProfile";
import { WorkerProfilePage } from "./pages/WorkerProfile";
import { Home } from "./pages/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/dashboard",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "workers", Component: WorkersPage },
      { path: "customers", Component: CustomersPage },
      { path: "pending-approvals", Component: PendingApprovalsPage },
      { path: "jobs", Component: JobsPage },
      { path: "bidding", Component: BiddingPage },
      { path: "categories", Component: CategoriesPage },
      { path: "finance", Component: FinancePage },
      { path: "commissions", Component: CommissionsPage },
      { path: "payouts", Component: PayoutsPage },
      { path: "reviews", Component: ReviewsPage },
      { path: "chat", Component: ChatMonitorPage },
      { path: "notifications", Component: NotificationsPage },
      { path: "activity-log", Component: ActivityLogPage },
      { path: "settings", Component: SettingsPage },
      { path: "admins", Component: AdminAccountsPage },
      { path: "customers/:id", Component: CustomerProfilePage },
      { path: "workers/:id", Component: WorkerProfilePage },
    ],
  },
]);