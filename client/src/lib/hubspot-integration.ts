/**
 * HubSpot integration for ROI Calculator
 * This file adds functionality to integrate the ROI calculator with HubSpot when embedded via iframe
 */

// Listen for size changes and notify parent frame for responsive height
function notifyResize() {
  const height = document.body.scrollHeight;
  window.parent.postMessage({ type: 'resize', height }, '*');
}

// Declare HubSpot types for TypeScript
declare global {
  interface Window {
    _hsq?: any[];
  }
}

// Track calculator events in HubSpot analytics
export function trackCalculatorEvent(eventName: string, value?: any) {
  try {
    if (window.parent && (window.parent as any)._hsq) {
      (window.parent as any)._hsq.push(['trackEvent', {
        id: eventName,
        value: value
      }]);
    }
  } catch (error) {
    console.error('Error tracking event in HubSpot:', error);
  }
}

// Initialize integration when page loads
export function initHubSpotIntegration() {
  // Check if running in iframe
  const isInIframe = window !== window.parent;
  
  if (isInIframe) {
    // Initial size notification
    window.addEventListener('load', () => {
      notifyResize();
      
      // Listen for DOM changes that might affect size
      const observer = new MutationObserver(notifyResize);
      observer.observe(document.body, { 
        childList: true, 
        subtree: true,
        attributes: true,
        attributeOldValue: true
      });
      
      // Notify resize on window resize
      window.addEventListener('resize', notifyResize);
      
      // Track initial page view
      trackCalculatorEvent('roi_calculator_viewed');
    });
    
    // Apply embedding styles
    document.body.classList.add('embedded-in-hubspot');
    
    // Parse URL parameters for customization
    const urlParams = new URLSearchParams(window.location.search);
    const themeColor = urlParams.get('primary_color');
    
    if (themeColor) {
      // Apply theme color if specified
      const root = document.documentElement;
      root.style.setProperty('--primary-color', `#${themeColor}`);
    }
  }
}

// Track ROI calculation events
export function trackROICalculation(savings: number, currency: string) {
  trackCalculatorEvent('roi_calculation_completed', {
    savings,
    currency
  });
}

// Track email sharing events
export function trackEmailSharing(success: boolean) {
  trackCalculatorEvent('roi_report_shared', {
    success
  });
}

// Track industry template selections
export function trackTemplateSelection(templateId: string, templateName: string) {
  trackCalculatorEvent('industry_template_selected', {
    templateId,
    templateName
  });
}

// Add CSS for embedded mode
const embeddedStyles = `
  .embedded-in-hubspot {
    /* Remove any padding or margins that might interfere with embedding */
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }
  
  /* Optionally hide certain elements when embedded */
  .embedded-in-hubspot .hide-when-embedded {
    display: none !important;
  }
`;

// Create and append style element
function addEmbeddedStyles() {
  const style = document.createElement('style');
  style.textContent = embeddedStyles;
  document.head.appendChild(style);
}

// Export initialization function to be called from main entry point
export default function setupHubSpotIntegration() {
  addEmbeddedStyles();
  initHubSpotIntegration();
}