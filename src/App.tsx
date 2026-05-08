import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { lazy, Suspense } from "react";

const Index = lazy(() => import("./pages/Index"));
const Auth = lazy(() => import("./pages/Auth"));
const DashboardLayout = lazy(() => import("./layouts/DashboardLayout"));

const DashboardHome = lazy(() => import("./pages/dashboard/DashboardHome"));
const BioPageEditor = lazy(() => import("./pages/dashboard/BioPageEditor"));
const ThemesPage = lazy(() => import("./pages/dashboard/ThemesPage"));
const AnalyticsPage = lazy(() => import("./pages/dashboard/AnalyticsPage"));
const PricingPage = lazy(() => import("./pages/dashboard/PricingPage"));
const SettingsPage = lazy(() => import("./pages/dashboard/SettingsPage"));
const PublicProfile = lazy(() => import("./pages/PublicProfile"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"));
const PaymentFailed = lazy(() => import("./pages/PaymentFailed"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const PrivacyPolicy = lazy(() => import("./pages/legal/PrivacyPolicy"));
const Terms = lazy(() => import("./pages/legal/Terms"));
const About = lazy(() => import("./pages/legal/About"));
const Contact = lazy(() => import("./pages/legal/Contact"));
const Refund = lazy(() => import("./pages/legal/Refund"));
const queryClient = new QueryClient();

const Loader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="relative flex flex-col items-center justify-center gap-4">
      <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse"></div>
      <img src="/favicon.png" alt="Loading ClickBio..." className="h-12 w-12 object-contain animate-bounce relative z-10" />
    </div>
  </div>
);

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return <Loader />;
  if (!user) return <Navigate to="/auth" replace />;
  return <>{children}</>;
};

const AppRoutes = () => {
  const { user, loading } = useAuth();
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route 
          path="/auth" 
          element={
            loading ? <Loader /> : user ? <Navigate to="/dashboard" replace /> : <Auth />
          } 
        />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route index element={<DashboardHome />} />
          <Route path="bio" element={<BioPageEditor />} />
          <Route path="themes" element={<ThemesPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/refund" element={<Refund />} />
        <Route path="/:username" element={<PublicProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

