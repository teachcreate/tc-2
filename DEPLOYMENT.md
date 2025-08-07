# Vercel Deployment Guide

This guide will help you deploy the TeachCreate application to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Account**: Your code should be in a GitHub repository
3. **Supabase Project**: Set up your Supabase project and get the credentials

## Environment Variables

You'll need to set up the following environment variables in Vercel:

### For the Backend (Server)
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_SERVICE_KEY`: Your Supabase service role key

### For the Frontend (Client)
- `REACT_APP_SUPABASE_URL`: Your Supabase project URL
- `REACT_APP_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## Deployment Steps

### 1. Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Select the `teachcreate` directory as the root directory

### 2. Configure Build Settings

Vercel will automatically detect the configuration from `vercel.json`, but you can verify these settings:

- **Framework Preset**: Other
- **Root Directory**: `teachcreate`
- **Build Command**: `cd client && npm install && npm run build`
- **Output Directory**: `client/build`
- **Install Command**: `npm install`

### 3. Set Environment Variables

In your Vercel project dashboard:

1. Go to Settings > Environment Variables
2. Add the following variables:

#### Production Environment:
```
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_supabase_service_key
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

#### Preview Environment (optional):
```
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_supabase_service_key
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Deploy

1. Click "Deploy" in the Vercel dashboard
2. Vercel will automatically build and deploy your application
3. You'll get a URL like `https://your-project.vercel.app`

## Project Structure

```
teachcreate/
├── client/                 # React frontend
│   ├── package.json
│   ├── src/
│   └── build/             # Built files (generated)
├── server/                # Express backend
│   ├── package.json
│   ├── index.js
│   └── routes/
├── vercel.json           # Vercel configuration
└── package.json          # Root package.json
```

## Troubleshooting

### Common Issues

1. **Build Failures**: Check that all dependencies are properly installed
2. **Environment Variables**: Ensure all required environment variables are set
3. **API Routes**: Verify that API routes are properly configured in `vercel.json`

### Debugging

1. Check Vercel build logs in the dashboard
2. Verify environment variables are correctly set
3. Test API endpoints using the Vercel function logs

## Local Development

To test locally before deploying:

```bash
# Install dependencies
npm run install-all

# Start development servers
npm run dev
```

This will start both the frontend (port 3000) and backend (port 5000) servers.

## Support

If you encounter issues:
1. Check the Vercel documentation
2. Review the build logs in your Vercel dashboard
3. Ensure all environment variables are properly configured 