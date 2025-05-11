# Deployment Guide for Identum ROI Calculator

This guide provides step-by-step instructions for deploying the ROI Calculator and uploading it to your GitHub repository.

## 1. Uploading to GitHub

### If you're creating a new repository

1. Go to [GitHub](https://github.com) and log in to your account
2. Click on the "+" icon in the top-right corner and select "New repository"
3. Fill in a repository name (e.g., "identum-roi-calculator")
4. Choose visibility (Public or Private)
5. Click "Create repository"
6. Follow the instructions shown on GitHub for "...or push an existing repository from the command line"

### Using Git commands

```bash
# Initialize Git repository (if not already done)
git init

# Add all files to git
git add .

# Commit changes
git commit -m "Initial commit of ROI Calculator"

# Add GitHub remote repository URL (replace with your repository URL)
git remote add origin https://github.com/yourusername/identum-roi-calculator.git

# Push to GitHub
git push -u origin main
```

## 2. Deploying to a Hosting Platform

### Option A: Deploy to Netlify

1. Create an account on [Netlify](https://www.netlify.com/) if you don't have one
2. Connect your GitHub repository
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Click "Deploy site"

### Option B: Deploy to Vercel

1. Create an account on [Vercel](https://vercel.com/) if you don't have one
2. Import your GitHub repository
3. Configure project settings (build settings should be detected automatically)
4. Click "Deploy"

### Option C: Deploy to AWS S3 + CloudFront

1. Build the project: `npm run build`
2. Create an S3 bucket and configure it for static website hosting
3. Upload the contents of the `dist` directory to your S3 bucket
4. (Optional) Set up CloudFront for CDN and HTTPS support

## 3. Integrating with HubSpot

After deploying your ROI Calculator to a hosting platform:

1. Navigate to your HubSpot account
2. Go to Marketing > Website > Website Pages
3. Click "Settings" in the top right
4. Select "Developer Options"
5. Click "Create a custom module"
6. Import the files from the `hubspot-module` directory
7. Configure the module, setting the Calculator URL to your deployed application URL

## 4. Local Development and Testing

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

## 5. Environment Variables

For production deployments, consider setting up the following environment variables:

- `NODE_ENV`: Set to "production"
- `API_URL`: Your API endpoint URL (if applicable)

## 6. Updating Your Deployment

When you make changes to the calculator:

1. Commit and push changes to GitHub
2. If using CI/CD (Netlify/Vercel), the site will automatically rebuild
3. If using manual deployment, rebuild and redeploy

## 7. Troubleshooting

- **CORS Issues**: If embedding fails, check CORS headers on your hosting platform
- **Build Failures**: Check the build logs for specific errors
- **Style Problems**: Test in HubSpot's preview mode before publishing