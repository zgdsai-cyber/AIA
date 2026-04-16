#!/bin/bash

# ============================================
# AIA Quick Deploy Script
# ============================================

echo "🚀 AIA - Quick Deploy Script"
echo "==============================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check prerequisites
echo "📋 Checking prerequisites..."

if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Git is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Git installed${NC}"

if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Node.js installed ($(node -v))${NC}"

if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✅ npm installed ($(npm -v))${NC}"

echo ""
echo "📦 Installing dependencies..."
npm install

echo ""
echo "🔧 Setting up environment..."
if [ ! -f ".env.local" ]; then
    cp .env.example .env.local
    echo -e "${YELLOW}⚠️  Created .env.local${NC}"
    echo -e "${YELLOW}Please update the following in .env.local:${NC}"
    echo "  - NEXT_PUBLIC_SUPABASE_URL"
    echo "  - NEXT_PUBLIC_SUPABASE_ANON_KEY"
else
    echo -e "${GREEN}✅ .env.local already exists${NC}"
fi

echo ""
echo "✨ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env.local with your Supabase credentials"
echo "2. Run: npm run dev"
echo "3. Open: http://localhost:3000"
echo ""
echo -e "${GREEN}Happy coding! 🎉${NC}"
