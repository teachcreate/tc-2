# TeachCreate.io Integration Specifications (Scalable Configuration)

## 1. Supabase Configuration (Scaled for 10k+ Users)
- **Plan**: Pro Tier (100k+ records)
- **Cache**: Redis for frequent queries
- **Optimizations**:
  - Batch processing for AI operations
  - Rate limiting on API
  - Background workers for heavy tasks
```env
# .env
SUPABASE_URL=https://[project-ref].supabase.co
SUPABASE_KEY=[anon-public-key]
SUPABASE_SERVICE_KEY=[service-role-key]
```

Tables to enable:
- Realtime API for products and reviews
- Row Level Security (RLS) policies
- Storage buckets for product assets

## 2. Stripe Connect
```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_CONNECT_CLIENT_ID=ca_...
```

Required Stripe products:
- Standard platform fee (10%)
- Payouts to creators via Stripe Connect
- Webhook endpoints for payment events

## 3. Hybrid Search Implementation

### Phase 1: PostgreSQL Full-Text
```sql
-- Basic search
SELECT id, title, price FROM products
WHERE to_tsvector('english', title || ' ' || description)
    @@ to_tsquery('english', 'math & quiz')
ORDER BY ts_rank_cd(
    to_tsvector('english', title || ' ' || description),
    to_tsquery('english', 'math & quiz')
) DESC LIMIT 20;

-- Indexes
CREATE INDEX idx_fts_products ON products
USING GIN(to_tsvector('english', title || ' ' || description));
```

### Phase 2: Supabase Vectors
```sql
-- After enabling vector extension
ALTER TABLE products ADD COLUMN embedding vector(384);

-- Semantic search
SELECT id, title, 1 - (embedding <=> '[0.1, 0.2,...]') AS similarity
FROM products
ORDER BY similarity DESC
LIMIT 10;
```

### Phase 3: Algolia (Optional)
```javascript
// Only implement if:
// - >10k searches/month
// - Need typo tolerance
algolia.init({
  appId: 'YOUR_APP_ID',
  apiKey: 'YOUR_API_KEY'
});

// Sync function
const index = algolia.initIndex('products');
await index.saveObjects(products);
```

**Migration Path:**
1. Start with Phase 1
2. Add Phase 2 when semantic search needed
3. Only add Phase 3 if search becomes bottleneck

## 4. Vercel Deployment
```env
VERCEL_PROJECT_ID=...
VERCEL_ORG_ID=...
```

Deployment pipeline:
- Automatic preview deployments for PRs
- Production deployments from main branch
- Environment variables for each stage

## 5. Google Classroom/LMS
```env
GOOGLE_CLIENT_ID=...
GOOGLE_API_KEY=...
```

Integration features:
- LTI 1.3 compliance
- Assignment creation flow
- Gradebook synchronization