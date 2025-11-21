import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import AuthPage from "./pages/auth/authPage";
import DashboardPage from "./pages/dashboard/dashboardPage";
import SidebarLayout from "./layout/sidebarLayout";
import NavbarLayout from "./layout/navbarLayout";
import ReportsPage from "./pages/report/reportsPage";
import SettingsPage from "./pages/settings/settingsPage";
import BottomNavbar from "./layout/BottomNavbar";
import { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import AddExpenseModal from "./components/dashboard/addExpenseModal";
import useAddExpenseModalStore from "./hooks/store/addExpenseModalStore";
import useCalendarStore from "./hooks/store/calendarStore";

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { isOpen, closeModal } = useAddExpenseModalStore();
  const { setRefreshDashboard } = useCalendarStore();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/*"
          element={
            <div className="flex flex-col min-h-screen">
              {!isMobile && (
                <SidebarLayout>
                  <div className="flex-1 flex flex-col">
                    <NavbarLayout />
                    <div className="flex-1">
                      <Routes>
                        <Route
                          path="/dashboard"
                          element={
                            <>
                              <DashboardPage />
                            </>
                          }
                        />
                        <Route path="/reports" element={<ReportsPage />} />
                        <Route path="/settings" element={<SettingsPage />} />
                      </Routes>
                    </div>
                  </div>
                </SidebarLayout>
              )}
              {isMobile && (
                <div className="flex-1">
                  <NavbarLayout /> {/* Still show Navbar on mobile */}
                  <Routes>
                    <Route
                      path="/dashboard"
                      element={
                        <>
                          <DashboardPage />
                        </>
                      }
                    />
                    <Route path="/reports" element={<ReportsPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                  </Routes>
                </div>
              )}
              {isMobile && <BottomNavbar />}
            </div>
          }
        />
      </Routes>
      {isOpen && (
        <AddExpenseModal
          open={isOpen}
          onClose={closeModal}
          reload={() => setRefreshDashboard(true)}
        />
      )}
    </BrowserRouter>
  );
}

export default App;
