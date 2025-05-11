import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ROICalculator from "@/components/features/ROICalculator";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <div className="calculator-embedded-container">
          <ROICalculator />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
