import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Heart } from "lucide-react";
import Index from "./pages/Index";
import Detection from "./pages/Detection";
import Recognition from "./pages/Recognition";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="relative min-h-screen">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/detection" element={<Detection />} />
            <Route path="/recognition" element={<Recognition />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          
          {/* Global Footer */}
          <div className="absolute bottom-0 left-0 right-0 text-center pb-4">
            <p className="text-muted-foreground text-sm flex items-center justify-center gap-1">
              From Chung Tran with <Heart className="w-4 h-4 text-primary" />
            </p>
          </div>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
