# TeachCreate.io Data Models

## Core Tables

### Users
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('teacher', 'student', 'admin')),
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  stripe_account_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### Question Types
```sql
CREATE TABLE question_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  is_gradable BOOLEAN NOT NULL,
  supports_live_game BOOLEAN NOT NULL,
  schema JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### Game Sessions
```sql
CREATE TABLE game_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) NOT NULL,
  creator_id UUID REFERENCES users(id) NOT NULL,
  join_code TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('waiting', 'active', 'completed')),
  settings JSONB NOT NULL,
  started_at TIMESTAMPTZ,
  ended_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### LMS Integrations
```sql
CREATE TABLE lms_integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) NOT NULL,
  provider TEXT NOT NULL CHECK (provider IN ('google_classroom', 'canvas', 'moodle')),
  external_id TEXT NOT NULL,
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, provider)
);
```

### Products
```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID REFERENCES users(id) NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('tool', 'game', 'resource')),
  thumbnail_url TEXT NOT NULL,
  demo_url TEXT,
  is_published BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  -- New fields for question system
  supports_grading BOOLEAN NOT NULL DEFAULT FALSE,
  supports_live_game BOOLEAN NOT NULL DEFAULT FALSE,
  question_types UUID[],
  lms_integration_enabled BOOLEAN NOT NULL DEFAULT FALSE,
  settings JSONB
);
```

### Orders
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) NOT NULL,
  product_id UUID REFERENCES products(id) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'refunded')),
  stripe_payment_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### Reviews
```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) NOT NULL,
  user_id UUID REFERENCES users(id) NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### Categories
```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT
);

CREATE TABLE product_categories (
  product_id UUID REFERENCES products(id) NOT NULL,
  category_id UUID REFERENCES categories(id) NOT NULL,
  PRIMARY KEY (product_id, category_id)
);
```

## Relationships
```mermaid
erDiagram
    users ||--o{ products : "creates"
    users ||--o{ orders : "places"
    products ||--o{ orders : "ordered_in"
    products ||--o{ reviews : "has"
    users ||--o{ reviews : "writes"
    products }o--o{ categories : "tagged_with"
    products }o--|| question_types : "supports"
    products ||--o{ game_sessions : "has"
    users ||--o{ lms_integrations : "has"