#!/bin/bash

# 🚀 Deployment Checklist Script
# تحقق من جاهزية النشر

set -e

echo "================================"
echo "✅ Deployment Checklist"
echo "================================"
echo ""

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Array to track results
declare -a CHECKS
PASSED=0
FAILED=0

check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $1"
        ((PASSED++))
    else
        echo -e "${RED}✗${NC} $1 (missing)"
        ((FAILED++))
    fi
}

check_env() {
    if grep -q "$1" .env.local 2>/dev/null; then
        echo -e "${GREEN}✓${NC} $1 configured"
        ((PASSED++))
    else
        echo -e "${YELLOW}⚠${NC} $1 not configured"
        ((FAILED++))
    fi
}

echo -e "${YELLOW}Checking project structure...${NC}"
check_file "package.json"
check_file "next.config.js"
check_file "tailwind.config.js"
check_file "tsconfig.json"
check_file ".env.example"
echo ""

echo -e "${YELLOW}Checking important directories...${NC}"
[ -d "app" ] && echo -e "${GREEN}✓${NC} app/" || echo -e "${RED}✗${NC} app/ (missing)"
[ -d "components" ] && echo -e "${GREEN}✓${NC} components/" || echo -e "${RED}✗${NC} components/ (missing)"
[ -d "lib" ] && echo -e "${GREEN}✓${NC} lib/" || echo -e "${RED}✗${NC} lib/ (missing)"
echo ""

echo -e "${YELLOW}Checking documentation...${NC}"
check_file "README.md"
check_file "GUIDE.md"
check_file "DEPLOYMENT.md"
check_file "DESIGN_SYSTEM.md"
echo ""

echo -e "${YELLOW}Checking environment setup...${NC}"
if [ -f ".env.local" ]; then
    echo -e "${GREEN}✓${NC} .env.local exists"
    check_env "NEXT_PUBLIC_SUPABASE_URL"
    check_env "NEXT_PUBLIC_SUPABASE_ANON_KEY"
else
    echo -e "${YELLOW}⚠${NC} .env.local not found (run setup.sh)"
fi
echo ""

echo -e "${YELLOW}Running build test...${NC}"
if npm run build > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Build successful"
    ((PASSED++))
else
    echo -e "${RED}✗${NC} Build failed"
    ((FAILED++))
fi
echo ""

echo "================================"
echo "Results: ${GREEN}${PASSED} passed${NC}, ${RED}${FAILED} failed${NC}"
echo "================================"

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✓ Ready to deploy!${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Push to GitHub: git push origin main"
    echo "2. Deploy to Vercel: vercel"
    echo "3. Setup Supabase: Follow SUPABASE_SETUP.md"
    exit 0
else
    echo -e "${RED}✗ Fix issues before deploying${NC}"
    exit 1
fi
