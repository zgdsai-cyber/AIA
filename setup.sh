#!/bin/bash

# 🚀 AIA - Full Deployment Setup Script
# منصة تصميم المتاجر الإلكترونية - سكريبت الإعداد الكامل

set -e

echo "================================"
echo "🚀 AIA Deployment Setup Script"
echo "================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Check Node.js and npm
echo -e "${YELLOW}Step 1: Checking Node.js and npm...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}Node.js is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js $(node -v) is installed${NC}"
echo -e "${GREEN}✓ npm $(npm -v) is installed${NC}"
echo ""

# Step 2: Install dependencies
echo -e "${YELLOW}Step 2: Installing dependencies...${NC}"
npm install
echo -e "${GREEN}✓ Dependencies installed${NC}"
echo ""

# Step 3: Setup environment variables
echo -e "${YELLOW}Step 3: Checking environment variables...${NC}"
if [ ! -f .env.local ]; then
    echo -e "${YELLOW}Creating .env.local from .env.example...${NC}"
    cp .env.example .env.local
    echo -e "${YELLOW}Please update .env.local with your credentials:${NC}"
    echo "  - NEXT_PUBLIC_SUPABASE_URL"
    echo "  - NEXT_PUBLIC_SUPABASE_ANON_KEY"
    echo "  - (Optional) NEXT_PUBLIC_GOOGLE_AI_KEY"
else
    echo -e "${GREEN}✓ .env.local already exists${NC}"
fi
echo ""

# Step 4: Build the project
echo -e "${YELLOW}Step 4: Building the project...${NC}"
npm run build
echo -e "${GREEN}✓ Project built successfully${NC}"
echo ""

# Step 5: Display next steps
echo -e "${GREEN}================================${NC}"
echo -e "${GREEN}✓ Setup completed successfully!${NC}"
echo -e "${GREEN}================================${NC}"
echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo ""
echo "1️⃣ Update your environment variables:"
echo "   nano .env.local"
echo ""
echo "2️⃣ Run the development server:"
echo "   npm run dev"
echo ""
echo "3️⃣ Deploy to Vercel:"
echo "   vercel"
echo ""
echo "4️⃣ Configure Supabase RLS policies:"
echo "   Follow instructions in SUPABASE_SETUP.md"
echo ""
echo "5️⃣ (Optional) Setup Google AI Edge:"
echo "   Follow instructions in AI_INTEGRATION.md"
echo ""
echo -e "${GREEN}For more details, see DEPLOYMENT.md${NC}"
