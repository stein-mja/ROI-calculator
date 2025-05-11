# Identum ROI Calculator

An interactive ROI calculator for cloud-based Identity and Access Management (IAM) SaaS solutions, designed to help enterprises estimate potential cost savings and efficiency gains.

## Features

- **Dynamic ROI Calculation**: Multi-variable inputs to calculate comprehensive savings
- **Industry Templates**: Pre-filled values for different sectors (Financial Services, Healthcare, Education, etc.)
- **Currency Support**: Multiple currency options (SEK, NOK, DKK, EUR, USD)
- **PDF Report Generation**: Detailed reports that can be emailed to stakeholders
- **HubSpot Integration**: Ready to be embedded in HubSpot CMS

## Project Structure

- `client/`: Frontend React application
  - `src/components/features/`: Main calculator components
  - `src/lib/`: Utility functions and business logic
- `server/`: Backend Express server
- `hubspot-module/`: Files for creating a HubSpot custom module

## Setup and Development

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

### Building for Production

```bash
# Create production build
npm run build

# Start production server
npm run start
```

## Embedding in HubSpot

This calculator is designed to be embedded in a HubSpot website. Follow these steps:

1. Build the application using `npm run build`
2. Deploy the built application to a web hosting service (Netlify, Vercel, AWS, etc.)
3. In HubSpot, create a custom module using the files in the `/hubspot-module/` directory
4. Set the module's calculator URL to point to your deployed application

See the detailed instructions in the `/hubspot-module/README.md` file.

## ROI Calculation Methodology

The calculator accounts for the following value drivers:

- **Direct time savings** from automating employee onboarding, role changes, and offboarding
- **Access request optimization** through streamlined workflows and automated approvals
- **Security incident reduction** from improved access controls
- **Compliance and audit efficiency** through automated reporting and access certification
- **License cost optimization** from improved visibility into unused accounts

## Customization

The calculator can be customized by editing the following files:

- `client/src/lib/industry-templates.ts`: Industry-specific default values
- `client/src/lib/roi-calculator.ts`: ROI calculation formulas and methodology
- `client/src/lib/currency.ts`: Currency conversion and formatting

## License

This project is proprietary and confidential.