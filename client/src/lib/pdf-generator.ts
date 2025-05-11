import jsPDF from 'jspdf';
import { CurrencyCode, formatCurrency } from './currency';

interface ROIData {
  employees: number;
  newHires: number;
  roleChanges: number;
  departures: number;
  adminCost: number;
  annualSavings: number;
  fiveYearSavings: number;
  timeSaved: number;
  securityImprovement: number;
  currency: CurrencyCode;
}

export const generatePDF = (data: ROIData): Blob => {
  const pdf = new jsPDF();
  
  // Add Identum branding
  pdf.setTextColor(2, 29, 51); // Blackened blue
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(24);
  pdf.text("Identum ROI Analysis", 105, 20, { align: "center" });
  
  pdf.setFontSize(16);
  pdf.text("Identity and Access Management Savings Report", 105, 30, { align: "center" });
  
  // Add date
  pdf.setFontSize(12);
  pdf.setFont("helvetica", "normal");
  pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 40, { align: "center" });
  
  // Organisation profile section
  pdf.setFontSize(18);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(214, 13, 70); // Cherry red
  pdf.text("Organisation Profile", 20, 60);
  
  pdf.setTextColor(2, 29, 51); // Blackened blue
  pdf.setFontSize(12);
  pdf.setFont("helvetica", "normal");
  
  const profile = [
    `Number of Employees: ${data.employees}`,
    `Annual New Hires: ${data.newHires}`,
    `Annual Role Changes: ${data.roleChanges}`,
    `Annual Employee Departures: ${data.departures}`,
    `Average IT Admin Cost: ${formatCurrency(data.adminCost, data.currency)}/hour`
  ];
  
  let yPosition = 70;
  profile.forEach(item => {
    pdf.text(item, 20, yPosition);
    yPosition += 10;
  });
  
  // Results section
  pdf.setFontSize(18);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(214, 13, 70); // Cherry red
  pdf.text("Savings Analysis", 20, yPosition + 10);
  
  pdf.setTextColor(2, 29, 51); // Blackened blue
  pdf.setFontSize(14);
  pdf.setFont("helvetica", "bold");
  pdf.text(`Annual Savings: ${formatCurrency(data.annualSavings, data.currency)}`, 20, yPosition + 25);
  pdf.text(`5-Year Savings: ${formatCurrency(data.fiveYearSavings, data.currency)}`, 20, yPosition + 35);
  
  pdf.setFontSize(12);
  pdf.setFont("helvetica", "normal");
  pdf.text(`Time Saved: ${data.timeSaved.toLocaleString()} hours annually`, 20, yPosition + 50);
  pdf.text(`Security Improvement: ${data.securityImprovement}% risk reduction`, 20, yPosition + 60);
  
  // Implementation timeline
  pdf.setFontSize(18);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(214, 13, 70); // Cherry red
  pdf.text("Implementation Timeline", 20, yPosition + 80);
  
  pdf.setTextColor(2, 29, 51); // Blackened blue
  pdf.setFontSize(12);
  pdf.setFont("helvetica", "normal");
  pdf.text("Identum's IAM solution typically delivers gradual value realization:", 20, yPosition + 90);
  
  const timeline = [
    "Month 1-2: Initial setup and configuration",
    "Month 3-4: User migration and training",
    "Month 5-6: Full value realization and optimization"
  ];
  
  yPosition += 100;
  timeline.forEach(item => {
    pdf.text(item, 30, yPosition);
    yPosition += 10;
  });
  
  // Add methodology explanation
  pdf.setFontSize(14);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(214, 13, 70); // Cherry red
  pdf.text("ROI Calculation Methodology", 20, yPosition + 120);
  
  pdf.setFontSize(10);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(2, 29, 51); // Blackened blue
  pdf.text("This ROI estimate includes the following value drivers:", 20, yPosition + 130);
  
  const methodology = [
    "• Direct time savings from automating employee onboarding, role changes, and offboarding",
    "• Access request optimization through streamlined workflows and automated approvals",
    "• Security incident reduction from improved access controls",
    "• Compliance and audit efficiency through automated reporting and access certification",
    "• License cost optimization from improved visibility into unused accounts"
  ];
  
  let methodYPosition = yPosition + 135;
  methodology.forEach(item => {
    pdf.text(item, 20, methodYPosition);
    methodYPosition += 5;
  });
  
  // Add disclaimer
  pdf.setFontSize(8);
  pdf.setFont("helvetica", "italic");
  pdf.setTextColor(45, 88, 132); // ID blue
  pdf.text("Disclaimer: Results will vary based on your organisation's specific circumstances, implementation approach,", 20, methodYPosition + 10);
  pdf.text("and existing processes. The figures presented are estimates based on industry averages and Identum's customer experience.", 20, methodYPosition + 15);
  pdf.text("For a detailed and personalized assessment, please contact our team.", 20, methodYPosition + 20);
  
  // Add footer
  pdf.setFontSize(10);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(45, 88, 132); // ID blue
  pdf.text("© Identum - Secure identity management solutions for modern organisations", 105, 280, { align: "center" });
  pdf.text("Contact: info@identum.com | +1 (800) 555-1234", 105, 285, { align: "center" });
  
  return pdf.output('blob');
};

export default generatePDF;
