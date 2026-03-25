import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Investments from "./pages/Investments";
import PrimaryMarket from "./pages/PrimaryMarket";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";
import Transfer from "./pages/Transfer";
import Transactions from "./pages/Transactions";
import Portfolio from "./pages/Portfolio";
import PortfolioStatistics from "./pages/PortfolioStatistics";
import PortfolioInvestments from "./pages/PortfolioInvestments";
import PortfolioContributions from "./pages/PortfolioContributions";
import Information from "./pages/Information";
import More from "./pages/More";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/investments" element={<Investments />} />
          <Route path="/primary-market" element={<PrimaryMarket />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/statistics" element={<PortfolioStatistics />} />
          <Route path="/portfolio/investments" element={<PortfolioInvestments />} />
          <Route path="/portfolio/contributions" element={<PortfolioContributions />} />
          <Route path="/information" element={<Information />} />
          <Route path="/more" element={<More />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
