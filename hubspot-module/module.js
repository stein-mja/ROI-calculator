// ROI Calculator HubSpot Module JavaScript

// Function to resize the iframe based on content
function setupResizeHandler() {
  // Initial height adjustment (if needed)
  setTimeout(function() {
    const iframe = document.getElementById('roi-calculator-iframe');
    if (iframe) {
      // Optional: Send a message to the iframe to request its height
      iframe.contentWindow.postMessage({ type: 'request-height' }, '*');
    }
  }, 1000);
}

// Execute when the module is loaded
document.addEventListener('DOMContentLoaded', function() {
  setupResizeHandler();
  
  // Optional: Track module loaded in HubSpot analytics
  if (window._hsq) {
    window._hsq.push(['trackEvent', {
      id: 'roi-calculator-module-loaded'
    }]);
  }
});