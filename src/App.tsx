import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ui/protected-route";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import AuthCallback from "./pages/AuthCallback";
import Dashboard from "./pages/Dashboard";
import ClientsHub from "./pages/ClientsHub";
import TalentHub from "./pages/TalentHub";
import ExpertsDirectory from "./pages/ExpertsDirectory";
import SolutionsAndCases from "./pages/SolutionsAndCases";
import ProjectTracker from "./pages/ProjectTracker";
import DomainTest from "./pages/DomainTest";
import NotFound from "./pages/NotFound";
import HanuTalent from "./pages/HanuTalent";
import HanuAcademy from "./pages/HanuAcademy";
import HanuPartnerships from "./pages/HanuPartnerships";
import HanuSolutions from "./pages/HanuSolutions";
import ClientOnboarding from "./pages/ClientOnboarding";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/experts" element={<ExpertsDirectory />} />
            <Route path="/solutions" element={<SolutionsAndCases />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/clients" element={<ProtectedRoute><ClientsHub /></ProtectedRoute>} />
            <Route path="/talent" element={<ProtectedRoute><TalentHub /></ProtectedRoute>} />
            <Route path="/projects" element={<ProtectedRoute><ProjectTracker /></ProtectedRoute>} />
            <Route path="/domain-test" element={<DomainTest />} />
            <Route path="/hanu-talent" element={<HanuTalent />} />
            <Route path="/hanu-academy" element={<HanuAcademy />} />
            <Route path="/hanu-partnerships" element={<HanuPartnerships />} />
            <Route path="/hanu-solutions" element={<HanuSolutions />} />
            <Route path="/client-onboarding" element={<ClientOnboarding />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
