#!/bin/bash

# Script to push TeachCreate project to GitHub
# Replace YOUR_USERNAME with your actual GitHub username

echo "🚀 Pushing TeachCreate to GitHub..."
echo ""

# Check if remote is already configured
if git remote -v | grep -q "origin"; then
    echo "✅ Remote 'origin' already configured"
else
    echo "📝 Please create a GitHub repository first:"
    echo "   1. Go to https://github.com"
    echo "   2. Click '+' → 'New repository'"
    echo "   3. Name it 'teachcreate'"
    echo "   4. Don't initialize with README (we already have one)"
    echo "   5. Click 'Create repository'"
    echo ""
    echo "Then run this command (replace YOUR_USERNAME with your GitHub username):"
    echo "git remote add origin https://github.com/YOUR_USERNAME/teachcreate.git"
    echo ""
    read -p "Enter your GitHub username: " github_username
    
    if [ ! -z "$github_username" ]; then
        git remote add origin https://github.com/$github_username/teachcreate.git
        echo "✅ Remote 'origin' added"
    else
        echo "❌ No username provided. Please run the command manually."
        exit 1
    fi
fi

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push -u origin main

echo ""
echo "🎉 Success! Your TeachCreate project is now on GitHub!"
echo "🌐 You can now deploy to Vercel:"
echo "   1. Go to https://vercel.com"
echo "   2. Click 'New Project'"
echo "   3. Import your GitHub repository"
echo "   4. Set Root Directory to 'teachcreate'"
echo "   5. Deploy!" 