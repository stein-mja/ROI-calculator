#!/bin/bash

echo "Preparing ROI Calculator files for GitHub upload..."

# Build the application
echo "Building application..."
npm run build

# Create a dist-github directory
echo "Creating distribution directory..."
mkdir -p dist-github

# Copy necessary files
echo "Copying files..."
cp -r client dist-github/
cp -r server dist-github/
cp -r shared dist-github/
cp -r hubspot-module dist-github/
cp -r dist dist-github/ 2>/dev/null || echo "No dist directory found (build first)"
cp *.json dist-github/
cp *.ts dist-github/
cp *.js dist-github/
cp *.md dist-github/
cp .gitignore dist-github/

# Exclude node_modules
echo "Cleaning up..."
rm -rf dist-github/node_modules 2>/dev/null

echo "Files prepared in the dist-github directory"
echo "You can now upload the contents of dist-github to your GitHub repository"
echo ""
echo "To upload to GitHub, follow these steps:"
echo "1. Create a new repository on GitHub"
echo "2. Navigate to the dist-github directory: cd dist-github"
echo "3. Initialize git: git init"
echo "4. Add files: git add ."
echo "5. Commit: git commit -m \"Initial commit of ROI Calculator\""
echo "6. Add remote: git remote add origin https://github.com/yourusername/your-repo-name.git"
echo "7. Push: git push -u origin main"
echo ""
echo "Done!"