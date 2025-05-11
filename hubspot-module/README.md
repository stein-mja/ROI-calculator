# HubSpot Integration Guide for ROI Calculator

This guide explains how to integrate the ROI Calculator into your HubSpot CMS.

## Overview

The ROI Calculator can be embedded into HubSpot in two ways:

1. **Custom Module**: Create a custom HubSpot module that loads the calculator in an iframe
2. **Direct Embed**: Paste HTML code that loads the calculator directly into a HubSpot page

## Option 1: Creating a HubSpot Custom Module

### Step 1: Create the Module

1. Log in to your HubSpot account
2. Navigate to **Marketing** > **Website** > **Website Pages**
3. Click **Settings** in the top right corner
4. Select **Developer Options**
5. Click **Create a custom module**
6. Enter a name for your module (e.g., "ROI Calculator")
7. Choose **"Local" development mode**

### Step 2: Configure the Module

1. In the **Module HTML + HubL** section, paste the contents of `module.html` from this directory
2. In the **Module.css** section, paste the contents of `module.css` from this directory
3. In the **Module.js** section, paste the contents of `module.js` from this directory
4. Update the calculator URL in the module code to point to your deployed calculator application
5. Click **Save changes**

### Step 3: Add Module Fields

Configure the following fields to make the module customizable:

1. In the **Fields** tab, add these fields:
   - `calculator_url` (Text field): URL of your deployed ROI calculator
   - `height` (Number field): Height of the calculator iframe in pixels
   - `width` (Text field): Width of the calculator (%, px, etc.)
   - `background_color` (Color picker): Background color of the module

2. Set default values:
   - Default calculator URL: (Your deployed application URL)
   - Default height: 800
   - Default width: 100%
   - Default background color: #ffffff

### Step 4: Test and Save

1. Preview your module to ensure it loads correctly
2. Click **Publish changes** when you're satisfied

## Option 2: Direct HTML Embed

If you prefer to embed the calculator directly into a HubSpot page:

1. Navigate to the page where you want to embed the calculator
2. Click **Edit** in the top right
3. Add a **Rich text** module to the page
4. Click the **< >** (HTML) button to edit the HTML source
5. Paste the following code (replace `YOUR_CALCULATOR_URL` with your deployed URL):

```html
<div class="roi-calculator-wrapper" style="width:100%; margin:0 auto;">
  <iframe 
    src="YOUR_CALCULATOR_URL" 
    width="100%" 
    height="800" 
    frameborder="0" 
    style="border:none; overflow:hidden;" 
    scrolling="no" 
    class="roi-calculator-iframe"
    id="roi-calculator-iframe"
    allow="clipboard-write"
  ></iframe>

  <script>
    window.addEventListener('message', function(event) {
      if (event.data && event.data.type === 'roi-calculator-height') {
        document.getElementById('roi-calculator-iframe').style.height = event.data.height + 'px';
      }
    });
  </script>
</div>
```

6. Click **Save** and publish the page

## Communication Between Calculator and HubSpot

The ROI Calculator is designed to communicate with HubSpot in several ways:

1. **Height Adjustments**: The calculator will automatically send messages to resize the iframe
2. **Form Submission**: When the HubSpot form is submitted, data is sent to your HubSpot account
3. **Event Tracking**: The calculator sends tracking events to HubSpot analytics

## Customizing the Appearance

To match your brand design:

1. Deploy a customized version of the calculator with your brand colors
2. Update the CSS variables in the module.css file to match your brand
3. Test the integration in preview mode before publishing

## Troubleshooting

If you encounter issues:

1. **Iframe not loading**: Verify the URL is correct and publicly accessible
2. **Form submissions not working**: Check HubSpot form configuration in the calculator
3. **Styling issues**: Use browser developer tools to inspect element styles
4. **Security warnings**: Ensure your calculator is hosted on a secure HTTPS domain