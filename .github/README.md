# AIA Project on GitHub

## About AIA

منصة ذكية لإنشاء متاجر إلكترونية احترافية متكاملة

## Quick Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account
- Vercel account (for deployment)

### Clone and Install

\`\`\`bash
git clone https://github.com/zgdsai-cyber/AIA.git
cd AIA
npm install
\`\`\`

### Configure Environment

1. Copy `.env.example` to `.env.local`
2. Get your Supabase credentials from [supabase.com](https://supabase.com)
3. Update the values:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Run Locally

\`\`\`bash
npm run dev
# Open http://localhost:3000
\`\`\`

## Setup Supabase Database

1. Create a new project on Supabase
2. Go to SQL Editor
3. Create new query and copy content from `supabase/migrations/001_initial_schema.sql`
4. Run the query

## Deploy to Vercel

1. Push changes to GitHub
2. Link repository on Vercel
3. Set environment variables
4. Deploy!

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

MIT License - see [LICENSE](LICENSE) file

## Support

For help, open an [Issue](https://github.com/zgdsai-cyber/AIA/issues)
