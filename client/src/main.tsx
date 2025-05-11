import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Update the document title
document.title = "Identum ROI Calculator | Cloud IAM Solutions";

// Add meta description for SEO
const metaDescription = document.createElement("meta");
metaDescription.name = "description";
metaDescription.content = "Calculate your organization's potential savings with Identum's cloud-based Identity and Access Management solution. Interactive ROI calculator shows detailed cost analysis.";
document.head.appendChild(metaDescription);

// Add Open Graph tags for better social sharing
const ogTitle = document.createElement("meta");
ogTitle.setAttribute("property", "og:title");
ogTitle.content = "Identum ROI Calculator | Cloud IAM Solutions";
document.head.appendChild(ogTitle);

const ogDescription = document.createElement("meta");
ogDescription.setAttribute("property", "og:description");
ogDescription.content = "Calculate how much your organization can save with Identum's cloud-based Identity and Access Management solution.";
document.head.appendChild(ogDescription);

const ogType = document.createElement("meta");
ogType.setAttribute("property", "og:type");
ogType.content = "website";
document.head.appendChild(ogType);

// Add fonts
const linkREM = document.createElement("link");
linkREM.rel = "preconnect";
linkREM.href = "https://fonts.googleapis.com";
document.head.appendChild(linkREM);

const linkGStatic = document.createElement("link");
linkGStatic.rel = "preconnect";
linkGStatic.href = "https://fonts.gstatic.com";
linkGStatic.crossOrigin = "";
document.head.appendChild(linkGStatic);

const linkFonts = document.createElement("link");
linkFonts.rel = "stylesheet";
linkFonts.href = "https://fonts.googleapis.com/css2?family=Lato:wght@400;500;700&family=REM:wght@400;600;700&display=swap";
document.head.appendChild(linkFonts);

// Initialize HubSpot integration after app is mounted
const initHubSpotIntegration = () => {
  // Dynamic import to avoid build issues
  import('./lib/hubspot-integration')
    .then(module => {
      // Initialize HubSpot integration
      module.default();
      console.log('HubSpot integration initialized');
    })
    .catch(err => {
      console.error('Failed to load HubSpot integration:', err);
    });
};

// Call after app is mounted
window.addEventListener('load', initHubSpotIntegration);

createRoot(document.getElementById("root")!).render(<App />);
