import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { InfoIcon, RefreshCw } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ResultsChart from "./ResultsChart";
import EmailSharing from "@/components/ui/email-sharing";
import { calculateSavings } from "@/lib/roi-calculator";
import { CurrencyCode, formatCurrency } from "@/lib/currency";
import { toast } from "@/hooks/use-toast";
import IndustryTemplateSelector from "./IndustryTemplateSelector";
import { IndustryTemplate } from "@/lib/industry-templates";

export default function ROICalculator() {
  // Calculator state
  const [employees, setEmployees] = useState(500);
  const [newHires, setNewHires] = useState(75); // Actual number instead of percentage
  const [roleChanges, setRoleChanges] = useState(50); // Actual number instead of percentage
  const [departures, setDepartures] = useState(60); // Actual number instead of percentage
  const [adminCost, setAdminCost] = useState(150);
  const [currency, setCurrency] = useState<CurrencyCode>('SEK');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [templateApplied, setTemplateApplied] = useState(false);
  
  // Results state
  const [annualSavings, setAnnualSavings] = useState(0);
  const [fiveYearSavings, setFiveYearSavings] = useState(0);
  const [timeSaved, setTimeSaved] = useState(0);
  const [securityImprovement, setSecurityImprovement] = useState(0);
  const [monthlySavings, setMonthlySavings] = useState<number[]>([]);
  
  // Handle industry template selection
  const handleSelectTemplate = (template: IndustryTemplate) => {
    const { defaults } = template;
    
    // Apply the template values
    setEmployees(defaults.employees);
    setNewHires(defaults.newHires);
    setRoleChanges(defaults.roleChanges);
    setDepartures(defaults.departures);
    setAdminCost(defaults.adminCost);
    setCurrency(defaults.currency);
    
    // Update selected template
    setSelectedTemplateId(template.id);
    setTemplateApplied(true);
    
    // Show toast confirmation
    toast({
      title: `${template.name} template applied`,
      description: `The calculator has been pre-filled with values typical for the ${template.name.toLowerCase()} sector.`,
    });
    
    // Track template selection for HubSpot analytics
    import('@/lib/hubspot-integration').then(module => {
      module.trackTemplateSelection(template.id, template.name);
    }).catch(err => {
      console.error('Failed to load HubSpot integration:', err);
    });
    
    // After 3 seconds, hide the template applied alert
    setTimeout(() => {
      setTemplateApplied(false);
    }, 3000);
  };

  // Calculate results when inputs change
  useEffect(() => {
    const results = calculateSavings({
      employees,
      newHires,
      roleChanges,
      departures,
      adminCost
    });
    
    setAnnualSavings(results.annualSavings);
    setFiveYearSavings(results.fiveYearSavings);
    setTimeSaved(results.totalTimeSaved);
    setSecurityImprovement(results.securityImprovement);
    setMonthlySavings(results.monthlySavings);
  }, [employees, newHires, roleChanges, departures, adminCost]);

  return (
    <div className="calculator-content">
      <div className="text-center mb-8">
        <h2 className="font-rem font-semibold text-3xl md:text-4xl text-blackened mb-4">
          ROI Calculator
        </h2>
        <p className="font-lato text-lg text-midnight max-w-3xl mx-auto">
          Adjust the sliders below to see how much your organisation can save with our IAM solution. 
          See your potential savings over time based on your specific needs.
        </p>
      </div>
      
      {/* Industry Templates Section */}
      <div className="mb-10">
        <IndustryTemplateSelector 
          onSelectTemplate={handleSelectTemplate}
          selectedTemplateId={selectedTemplateId}
        />
      </div>
      
      {/* Template Applied Alert */}
      {templateApplied && (
        <Alert className="mb-8 bg-shroom border-cherry">
          <RefreshCw className="h-4 w-4 text-cherry animate-spin" />
          <AlertDescription className="text-midnight">
            Industry template values have been applied to the calculator.
          </AlertDescription>
        </Alert>
      )}
      
      {/* Calculator Container */}
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Sliders Column */}
        <Card className="bg-white shadow-lg">
          <CardContent className="p-8">
            <h3 className="font-rem font-semibold text-2xl mb-6 text-blackened">Organisation Profile</h3>
            
            {/* Employees Slider */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <label className="font-lato font-medium text-midnight">Number of Employees</label>
                <span className="font-lato font-bold text-cherry">{employees}</span>
              </div>
              <Slider
                value={[employees]}
                min={50}
                max={5000}
                step={10}
                onValueChange={(value) => setEmployees(value[0])}
                className="py-4"
              />
              <div className="flex justify-between mt-1">
                <span className="text-xs text-bergen-sky">50</span>
                <span className="text-xs text-bergen-sky">5000</span>
              </div>
            </div>
            
            {/* New Hires Slider */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <label className="font-lato font-medium text-midnight mr-2">
                    Annual New Hires
                  </label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="h-4 w-4 text-bergen-sky" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Number of new employees hired annually</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <span className="font-lato font-bold text-cherry">{newHires}</span>
              </div>
              <Slider
                value={[newHires]}
                min={0}
                max={Math.max(500, Math.round(employees * 0.5))}
                step={1}
                onValueChange={(value) => setNewHires(value[0])}
                className="py-4"
              />
              <div className="flex justify-between mt-1">
                <span className="text-xs text-bergen-sky">0</span>
                <span className="text-xs text-bergen-sky">{Math.max(500, Math.round(employees * 0.5))}</span>
              </div>
            </div>
            
            {/* Role Changes Slider */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <label className="font-lato font-medium text-midnight mr-2">
                    Annual Role Changes
                  </label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="h-4 w-4 text-bergen-sky" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Number of employees changing roles annually</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <span className="font-lato font-bold text-cherry">{roleChanges}</span>
              </div>
              <Slider
                value={[roleChanges]}
                min={0}
                max={Math.max(300, Math.round(employees * 0.3))}
                step={1}
                onValueChange={(value) => setRoleChanges(value[0])}
                className="py-4"
              />
              <div className="flex justify-between mt-1">
                <span className="text-xs text-bergen-sky">0</span>
                <span className="text-xs text-bergen-sky">{Math.max(300, Math.round(employees * 0.3))}</span>
              </div>
            </div>
            
            {/* Departures Slider */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <label className="font-lato font-medium text-midnight mr-2">
                    Annual Employee Departures
                  </label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="h-4 w-4 text-bergen-sky" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Number of employees leaving the organisation annually</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <span className="font-lato font-bold text-cherry">{departures}</span>
              </div>
              <Slider
                value={[departures]}
                min={0}
                max={Math.max(400, Math.round(employees * 0.4))}
                step={1}
                onValueChange={(value) => setDepartures(value[0])}
                className="py-4"
              />
              <div className="flex justify-between mt-1">
                <span className="text-xs text-bergen-sky">0</span>
                <span className="text-xs text-bergen-sky">{Math.max(400, Math.round(employees * 0.4))}</span>
              </div>
            </div>
            
            {/* Average IT Admin Salary */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <label className="font-lato font-medium text-midnight mr-2">
                    Average IT Admin Cost ({currency === 'USD' ? '$' : currency === 'EUR' ? '€' : 'kr'}/hour)
                  </label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="h-4 w-4 text-bergen-sky" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Average fully loaded cost per hour of IT personnel</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <span className="font-lato font-bold text-cherry">
                  {formatCurrency(adminCost, currency)}
                </span>
              </div>
              <Slider
                value={[adminCost]}
                min={80}
                max={250}
                step={5}
                onValueChange={(value) => setAdminCost(value[0])}
                className="py-4"
              />
              <div className="flex justify-between mt-1">
                <span className="text-xs text-bergen-sky">
                  {formatCurrency(80, currency)}
                </span>
                <span className="text-xs text-bergen-sky">
                  {formatCurrency(250, currency)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Results Column */}
        <div>
          {/* Results Card */}
          <Card className="bg-white shadow-lg mb-8">
            <CardContent className="p-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-rem font-semibold text-2xl text-blackened">
                  Your Potential Savings
                </h3>
                
                <div className="flex items-center">
                  <span className="mr-2 text-sm text-midnight">Currency:</span>
                  <Select value={currency} onValueChange={(value) => setCurrency(value as CurrencyCode)}>
                    <SelectTrigger className="w-[100px]">
                      <SelectValue placeholder="SEK" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SEK">SEK</SelectItem>
                      <SelectItem value="NOK">NOK</SelectItem>
                      <SelectItem value="DKK">DKK</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center p-4 bg-drizzle rounded-lg">
                  <span className="block font-lato text-sm text-midnight mb-2">Annual Savings</span>
                  <span className="block font-rem font-bold text-3xl text-cherry">
                    {formatCurrency(annualSavings, currency)}
                  </span>
                </div>
                <div className="text-center p-4 bg-drizzle rounded-lg">
                  <span className="block font-lato text-sm text-midnight mb-2">5-Year Savings</span>
                  <span className="block font-rem font-bold text-3xl text-cherry">
                    {formatCurrency(fiveYearSavings, currency)}
                  </span>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="font-rem font-semibold text-lg mb-2 text-blackened">Monthly Savings Ramp-Up</h4>
                <p className="text-sm text-midnight mb-4">
                  Savings gradually increase as implementation delivers full value over time
                </p>
                
                <div className="h-[280px] w-full">
                  <ResultsChart data={monthlySavings} currency={currency} />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="p-4 border border-drizzle rounded-lg">
                  <h5 className="font-rem font-semibold text-blackened">Time Saved</h5>
                  <p className="font-lato text-midnight mt-2">{timeSaved.toLocaleString()} hours annually</p>
                </div>
                <div className="p-4 border border-drizzle rounded-lg">
                  <h5 className="font-rem font-semibold text-blackened">Security Improvement</h5>
                  <p className="font-lato text-midnight mt-2">{securityImprovement}% risk reduction</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Share Results Card */}
          <Card className="bg-white shadow-lg">
            <CardContent className="p-8">
              <h3 className="font-rem font-semibold text-xl mb-4 text-blackened">Share Your Results</h3>
              <EmailSharing 
                data={{
                  employees,
                  newHires,
                  roleChanges,
                  departures,
                  adminCost,
                  annualSavings,
                  fiveYearSavings,
                  timeSaved,
                  securityImprovement,
                  currency
                }}
                onSuccess={() => {
                  toast({
                    title: "Report sent successfully",
                    description: "The ROI report has been sent to the provided email address."
                  });
                }}
                onError={(error) => {
                  toast({
                    title: "Error sending report",
                    description: error || "There was an error sending the report. Please try again.",
                    variant: "destructive"
                  });
                }}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
