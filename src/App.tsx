import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import DashboardLayout from "./layouts/DashboardLayout.tsx";
import DashboardHome from "./pages/dashboard/DashboardHome.tsx";
import BioPageEditor from "./pages/dashboard/BioPageEditor.tsx";
import ThemesPage from "./pages/dashboard/ThemesPage.tsx";
import AnalyticsPage from "./pages/dashboard/AnalyticsPage.tsx";
import AIToolsPage from "./pages/dashboard/AIToolsPage.tsx";
import SettingsPage from "./pages/dashboard/SettingsPage.tsx";
import PublicProfile from "./pages/PublicProfile.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="bio" element={<BioPageEditor />} />
            <Route path="themes" element={<ThemesPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="ai" element={<AIToolsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          <Route path="/:username" element={<PublicProfile />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
