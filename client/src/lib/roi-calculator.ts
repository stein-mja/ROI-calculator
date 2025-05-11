interface ROICalculatorInputs {
  employees: number;
  newHires: number;
  roleChanges: number;
  departures: number;
  adminCost: number;
}

interface ROICalculatorResults {
  annualSavings: number;
  fiveYearSavings: number;
  totalTimeSaved: number;
  securityImprovement: number;
  monthlySavings: number[];
}

export const calculateSavings = (inputs: ROICalculatorInputs): ROICalculatorResults => {
  const { employees, newHires, roleChanges, departures, adminCost } = inputs;
  
  // Enhanced ROI calculation to better reflect total value of IAM solutions
  
  // 1. Direct time savings for identity management events
  // Increased time savings to reflect real-world benefits of automated IAM
  const timePerHire = 4.5;        // Hours saved per hire (increased from 2.5)
  const timePerRoleChange = 3.2;  // Hours saved per role change (increased from 1.5)
  const timePerDeparture = 3.8;   // Hours saved per departure (increased from 2.0)
  
  // Total direct time saved annually
  const directTimeSaved = (newHires * timePerHire) + (roleChanges * timePerRoleChange) + (departures * timePerDeparture);
  
  // 2. Additional time savings from improved processes
  // These reflect ongoing benefits beyond just the identity events
  const monthlyAccessRequestsPerEmployee = 1.2;  // Average number of access requests per employee monthly
  const timePerAccessRequest = 0.4;              // Hours saved per access request
  const accessRequestTimeSaved = employees * monthlyAccessRequestsPerEmployee * timePerAccessRequest * 12;
  
  // 3. Security incident reduction
  // Reduction in time spent on security incidents due to better access control
  const annualSecurityIncidentsPerEmployee = 0.05;  // Incidents per employee annually
  const hoursPerSecurityIncident = 24;              // Hours spent per incident
  const incidentReductionRate = 0.65;               // Rate of reduction in incidents
  const securityIncidentTimeSaved = employees * annualSecurityIncidentsPerEmployee * hoursPerSecurityIncident * incidentReductionRate;
  
  // 4. Compliance and audit preparation
  // Time saved in preparing for audits and maintaining compliance
  const baselineComplianceHours = Math.min(2000, Math.max(120, employees * 1.2));  // Baseline hours for compliance
  const complianceEfficiencyGain = 0.45;                                          // Efficiency gain from IAM
  const complianceTimeSaved = baselineComplianceHours * complianceEfficiencyGain;
  
  // Total time saved annually from all categories
  const totalTimeSaved = Math.round(directTimeSaved + accessRequestTimeSaved + securityIncidentTimeSaved + complianceTimeSaved);
  
  // Annual cost savings from time saved
  const timeSavingsCost = totalTimeSaved * adminCost;
  
  // 5. Additional direct cost savings
  // Cost savings from reduced license costs due to better account management
  const annualLicenseCostPerEmployee = adminCost * 6;  // Estimated annual software license cost per employee
  const licenseOptimizationRate = 0.12;                // Rate of optimization in license costs
  const licenseCostSavings = employees * annualLicenseCostPerEmployee * licenseOptimizationRate;
  
  // Total annual savings combining all factors
  const annualSavings = Math.round(timeSavingsCost + licenseCostSavings);
  
  // Projected 5-year savings with compound growth from optimization improvements
  const annualGrowthRate = 0.08;  // Annual improvement in efficiency
  let fiveYearSavings = 0;
  for (let year = 0; year < 5; year++) {
    fiveYearSavings += annualSavings * Math.pow(1 + annualGrowthRate, year);
  }
  fiveYearSavings = Math.round(fiveYearSavings);
  
  // Security improvement calculation (simplified formula)
  // Larger organizations with higher departure numbers have more to gain from improved security
  // Calculate departure percentage for security calculation
  const departurePercentage = departures / employees;
  
  const securityImprovement = Math.min(85, Math.round(
    40 + // Base improvement
    (employees > 1000 ? 25 : employees > 500 ? 15 : 5) + // Size factor
    (departurePercentage > 0.15 ? 10 : departurePercentage > 0.08 ? 5 : 0) // Departure risk factor
  ));
  
  // Calculate gradual monthly savings (ramp up over 6 months with exponential growth)
  const rampUpPeriod = 6; // Months until full value realization
  const monthlySavings = [];
  const monthlySavingsFull = annualSavings / 12;
  
  for (let i = 0; i < 12; i++) {
    if (i < rampUpPeriod) {
      // Exponential growth during ramp-up period for a more realistic adoption curve
      // This creates an S-curve adoption pattern common in enterprise software implementations
      const progressRatio = (i + 1) / rampUpPeriod;
      const exponentialFactor = 1 - Math.pow(1 - progressRatio, 2.2); // Exponential growth factor
      monthlySavings.push(monthlySavingsFull * exponentialFactor);
    } else {
      // Full value after ramp-up with small continued improvements
      const monthsAfterRampUp = i - rampUpPeriod;
      const additionalImprovement = Math.min(0.15, 0.025 * monthsAfterRampUp); // Up to 15% additional improvement
      monthlySavings.push(monthlySavingsFull * (1 + additionalImprovement));
    }
  }
  
  return {
    annualSavings,
    fiveYearSavings,
    totalTimeSaved,
    securityImprovement,
    monthlySavings
  };
};
