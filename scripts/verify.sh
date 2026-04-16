#!/bin/bash

# ==========================================
# Pre-Deployment Verification Script for AIA
# ==========================================

echo "🔍 AIA - Pre-Deployment Verification"
echo "===================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Counters
total_checks=0
passed_checks=0

# Function to check command
check_command() {
    total_checks=$((total_checks + 1))
    if command -v $1 &> /dev/null; then
        echo -e "${GREEN}✅${NC} $2 installed"
        passed_checks=$((passed_checks + 1))
    else
        echo -e "${RED}❌${NC} $2 NOT installed"
    fi
}

# Function to check file
check_file() {
    total_checks=$((total_checks + 1))
    if [ -f "$1" ]; then
        echo -e "${GREEN}✅${NC} $2 exists"
        passed_checks=$((passed_checks + 1))
    else
        echo -e "${RED}❌${NC} $2 NOT found"
    fi
}

# Function to check directory
check_dir() {
    total_checks=$((total_checks + 1))
    if [ -d "$1" ]; then
        echo -e "${GREEN}✅${NC} $2 directory exists"
        passed_checks=$((passed_checks + 1))
    else
        echo -e "${RED}❌${NC} $2 directory NOT found"
    fi
}

# ==================================
# 1. System Requirements
# ==================================
echo -e "${BLUE}1️⃣  System Requirements${NC}"
echo "---"
check_command "node" "Node.js"
check_command "npm" "npm"
check_command "git" "Git"
echo ""

# ==================================
# 2. Project Structure
# ==================================
echo -e "${BLUE}2️⃣  Project Structure${NC}"
echo "---"
check_file "package.json" "package.json"
check_file "next.config.js" "next.config.js"
check_file "tsconfig.json" "tsconfig.json"
check_dir "src" "src directory"
check_dir "public" "public directory"
echo ""

# ==================================
# 3. Configuration Files
# ==================================
echo -e "${BLUE}3️⃣  Configuration Files${NC}"
echo "---"
check_file ".gitignore" ".gitignore"
check_file ".env.example" ".env.example"
check_file "vercel.json" "vercel.json"
check_dir ".github/workflows" ".github/workflows directory"
echo ""

# ==================================
# 4. Database Files
# ==================================
echo -e "${BLUE}4️⃣  Database Setup Files${NC}"
echo "---"
check_dir "supabase" "supabase directory"
check_file "supabase/migrations/001_initial_schema.sql" "Supabase migration file"
check_file "supabase/config.toml" "Supabase config"
echo ""

# ==================================
# 5. GitHub Workflows
# ==================================
echo -e "${BLUE}5️⃣  CI/CD Workflows${NC}"
echo "---"
check_file ".github/workflows/deploy.yml" "Deploy workflow"
check_file ".github/workflows/test.yml" "Test workflow"
echo ""

# ==================================
# 6. Documentation
# ==================================
echo -e "${BLUE}6️⃣  Documentation${NC}"
echo "---"
check_file "README.md" "Main README"
check_file "DEPLOYMENT.md" "Deployment guide"
check_file "DEPLOYMENT_CHECKLIST.md" "Deployment checklist"
check_file "QUICK_START.md" "Quick start guide"
check_file "ARCHITECTURE.md" "Architecture documentation"
echo ""

# ==================================
# 7. Scripts
# ==================================
echo -e "${BLUE}7️⃣  Setup Scripts${NC}"
echo "---"
check_file "scripts/setup.sh" "Setup script"
check_file "scripts/push-github.sh" "GitHub push script"
check_file "scripts/setup-env.sh" "Environment setup script"
echo ""

# ==================================
# 8. Dependencies
# ==================================
echo -e "${BLUE}8️⃣  Dependencies Check${NC}"
echo "---"

if [ -d "node_modules" ]; then
    echo -e "${GREEN}✅${NC} Dependencies installed"
    passed_checks=$((passed_checks + 1))
else
    echo -e "${YELLOW}⚠️${NC} Dependencies NOT installed (running npm install...)"
    npm install > /dev/null 2>&1
    if [ -d "node_modules" ]; then
        echo -e "${GREEN}✅${NC} Dependencies installed"
        passed_checks=$((passed_checks + 1))
    else
        echo -e "${RED}❌${NC} Failed to install dependencies"
    fi
fi
total_checks=$((total_checks + 1))
echo ""

# ==================================
# 9. Build Test
# ==================================
echo -e "${BLUE}9️⃣  Build Test${NC}"
echo "---"
total_checks=$((total_checks + 1))

echo "Building project (this may take a minute)..."
npm run build > /tmp/build.log 2>&1

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅${NC} Build successful"
    passed_checks=$((passed_checks + 1))
else
    echo -e "${RED}❌${NC} Build failed - see /tmp/build.log for details"
fi
echo ""

# ==================================
# 10. Environment Setup
# ==================================
echo -e "${BLUE}🔟 Environment Variables${NC}"
echo "---"

if [ -f ".env.local" ]; then
    echo -e "${GREEN}✅${NC} .env.local exists"
    passed_checks=$((passed_checks + 1))
    
    if grep -q "NEXT_PUBLIC_SUPABASE_URL" .env.local; then
        echo -e "${GREEN}✅${NC} SUPABASE_URL configured"
        passed_checks=$((passed_checks + 1))
    else
        echo -e "${YELLOW}⚠️${NC} SUPABASE_URL not configured in .env.local"
    fi
    total_checks=$((total_checks + 1))
else
    echo -e "${YELLOW}⚠️${NC} .env.local not found - copy from .env.example"
fi
total_checks=$((total_checks + 1))
echo ""

# ==================================
# Summary
# ==================================
echo "═══════════════════════════════════"
echo -e "${BLUE}📊 Summary${NC}"
echo "═══════════════════════════════════"

percentage=$((passed_checks * 100 / total_checks))

echo "Checks passed: $passed_checks/$total_checks ($percentage%)"
echo ""

if [ $percentage -eq 100 ]; then
    echo -e "${GREEN}✅ All checks passed! Ready for deployment${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Run: npm run dev"
    echo "2. Test app at http://localhost:3000"
    echo "3. Run: ./scripts/push-github.sh"
    echo "4. Deploy to Vercel & Supabase"
elif [ $percentage -ge 80 ]; then
    echo -e "${YELLOW}⚠️  Most checks passed. Review warnings above${NC}"
    echo ""
    echo "Issues found:"
    echo "- Check environment variables (.env.local)"
    echo "- Verify Supabase credentials"
    echo "- Ensure all files are in place"
else
    echo -e "${RED}❌ Multiple issues found. Fix them before deploying${NC}"
    echo ""
    echo "Action items:"
    echo "- Install missing dependencies: npm install"
    echo "- Create .env.local from .env.example"
    echo "- Check build logs: /tmp/build.log"
fi

echo ""
echo "═══════════════════════════════════"
echo -e "${GREEN}Verification complete! 🎉${NC}"
echo ""
