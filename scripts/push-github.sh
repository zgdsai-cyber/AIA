#!/bin/bash

# ============================================
# Git Push to GitHub Script
# ============================================

echo "📤 AIA - Push to GitHub Script"
echo "==============================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check if git initialized
if [ ! -d ".git" ]; then
    echo "⚠️  Initializing new git repository..."
    git init
    echo -e "${GREEN}✅ Git initialized${NC}"
fi

echo ""
echo "📝 Adding files..."
git add .

echo ""
echo "💬 Enter commit message (default: 'Update AIA project'):"
read -p "> " commit_message
commit_message="${commit_message:-Update AIA project}"

git commit -m "$commit_message"
echo -e "${GREEN}✅ Files committed${NC}"

echo ""
echo "🔗 Enter GitHub repository URL:"
echo "   (e.g., https://github.com/username/AIA.git)"
read -p "> " repo_url

git remote add origin "$repo_url" 2>/dev/null || git remote set-url origin "$repo_url"

echo ""
echo "📤 Pushing to GitHub..."
git branch -M main
git push -u origin main

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Successfully pushed to GitHub!${NC}"
    echo ""
    echo "Your repository is now available at:"
    echo -e "${YELLOW}$repo_url${NC}"
else
    echo "❌ Failed to push to GitHub"
    echo "Make sure you have:"
    echo "1. Created the repository on GitHub"
    echo "2. Configured your git credentials"
fi

echo ""
echo "✨ Done!"
