#!/bin/bash

# ============================================
# Environment Setup Script
# ============================================

echo "🔐 AIA - Environment Setup"
echo "=========================="
echo ""

# Create .env.local if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local..."
    cp .env.example .env.local
    echo "✅ Created .env.local"
else
    echo "✅ .env.local already exists"
fi

echo ""
echo "🔧 Setup Instructions:"
echo "1. Go to Supabase: https://app.supabase.com"
echo "2. Create a new project"
echo "3. Get your Project URL and Anon Key"
echo "4. Edit .env.local with your credentials:"
echo ""
echo "   NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co"
echo "   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key"
echo ""
echo "5. Run: npm run dev"
echo ""
