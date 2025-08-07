# TeachCreate.io System Architecture

## Overview
TeachCreate.io is a full-stack web application with:
- React frontend
- Node.js/Express backend
- Supabase PostgreSQL database
- Multiple third-party integrations

## Core Components

### Frontend
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context + Zustand
- **Key Pages**:
  - Homepage (Discovery Feed)
  - Product Description Modal
  - Teacher Creator Portal
  - User Dashboard
  - Checkout Flow

### Backend
- **Framework**: Express.js
- **Authentication**: Supabase Auth
- **API**: RESTful endpoints
- **Key Services**:
  - Product Management
  - User Management
  - Order Processing
  - Content Delivery

### Database & Search System
- **Primary**: Supabase PostgreSQL (Scalable Tier)
- **Realtime**: Supabase Realtime API
- **Storage**: Supabase Storage (Partitioned by tenant)
- **Search Strategy**: Hybrid Approach
  - **Phase 1**: PostgreSQL full-text search
  - **Phase 2**: Supabase AI vectors (semantic search)
  - **Phase 3**: Algolia (if needed for performance)
- **Migration Triggers**:
  - Add vectors at ~500 products
  - Add Algolia at >10k searches/month
- **Key Tables**:
  - Users (with indexes on email, role)
  - Products (with GIN indexes for search)
  - Orders (time-series optimized)
  - Reviews (indexed by product_id)
  - Categories
- **Scaling Features**:
  - Read replicas for analytics
  - Connection pooling
  - Row-level security
  - Optimized for Vercel Edge

### Integrations
- **Payments**: Stripe + Stripe Connect
- **Search**: Algolia
- **Hosting**: Vercel
- **LMS**: Google Classroom API