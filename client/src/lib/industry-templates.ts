import { CurrencyCode } from "./currency";

/**
 * Industry-specific template for ROI calculator
 */
export interface IndustryTemplate {
  id: string;
  name: string;
  description: string;
  icon: string; // Lucide icon name
  defaults: {
    employees: number;
    newHires: number;
    roleChanges: number;
    departures: number;
    adminCost: number;
    currency: CurrencyCode;
  };
}

/**
 * Industry templates for pre-filling ROI calculator
 */
export const industryTemplates: IndustryTemplate[] = [
  {
    id: "finance",
    name: "Financial Services",
    description: "Banks, insurance, investment firms with high security & compliance needs",
    icon: "Landmark",
    defaults: {
      employees: 2500,
      newHires: 375, 
      roleChanges: 625,
      departures: 300,
      adminCost: 185,
      currency: "EUR"
    }
  },
  {
    id: "healthcare",
    name: "Healthcare",
    description: "Hospitals, clinics, medical services with data privacy concerns",
    icon: "Stethoscope",
    defaults: {
      employees: 1200,
      newHires: 180,
      roleChanges: 420,
      departures: 144,
      adminCost: 155,
      currency: "EUR"
    }
  },
  {
    id: "education",
    name: "Education",
    description: "Schools, universities, educational institutions with frequent user changes",
    icon: "GraduationCap",
    defaults: {
      employees: 800,
      newHires: 200,
      roleChanges: 320,
      departures: 180,
      adminCost: 120,
      currency: "EUR"
    }
  },
  {
    id: "government",
    name: "Government",
    description: "Public sector organizations with strict compliance requirements",
    icon: "Building",
    defaults: {
      employees: 5000,
      newHires: 500,
      roleChanges: 750,
      departures: 450,
      adminCost: 140,
      currency: "EUR"
    }
  },
  {
    id: "retail",
    name: "Retail",
    description: "Retail businesses with high employee turnover and seasonal hiring",
    icon: "ShoppingBag",
    defaults: {
      employees: 3000,
      newHires: 900,
      roleChanges: 450,
      departures: 750,
      adminCost: 110,
      currency: "EUR"
    }
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    description: "Production companies with complex access management needs",
    icon: "Factory",
    defaults: {
      employees: 1500,
      newHires: 225,
      roleChanges: 300,
      departures: 180,
      adminCost: 130,
      currency: "EUR"
    }
  },
  {
    id: "technology",
    name: "Technology",
    description: "Tech companies with rapid growth and specialized roles",
    icon: "Cpu",
    defaults: {
      employees: 750,
      newHires: 225,
      roleChanges: 187,
      departures: 150,
      adminCost: 175,
      currency: "EUR"
    }
  },
  {
    id: "nonprofit",
    name: "Nonprofit",
    description: "Charitable organizations with limited IT resources and volunteer management",
    icon: "Heart",
    defaults: {
      employees: 350,
      newHires: 70,
      roleChanges: 105,
      departures: 52,
      adminCost: 90,
      currency: "EUR"
    }
  }
];

/**
 * Get industry template by ID
 */
export function getTemplateById(id: string): IndustryTemplate | undefined {
  return industryTemplates.find(template => template.id === id);
}