import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Vault from "./pages/Vault";
import Share from "./pages/Share";
import Audit from "./pages/Audit";
import Download from "./pages/Download";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Signup from "./pages/signup";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/vault" element={<Vault />} />
          <Route path="/share" element={<Share />} />
          <Route path="/audit" element={<Audit />} />
          <Route path="/download" element={<Download />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
          <Route path="Signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
