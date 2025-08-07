#!/bin/bash

# Simple script to push to GitHub
echo "🚀 Pushing TeachCreate to GitHub..."

# Check if remote exists
if ! git remote -v | grep -q "origin"; then
    echo "❌ No remote 'origin' found."
    echo "Please run: git remote add origin YOUR_GITHUB_REPO_URL"
    echo "Example: git remote add origin https://github.com/yourusername/teachcreate.git"
    exit 1
fi

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push -u origin main

echo "✅ Successfully pushed to GitHub!" 