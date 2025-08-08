-- TeachCreate.io Security Implementation
-- This file contains all security policies, indexes, and security functions

-- ========================================
-- 1. ENABLE ROW LEVEL SECURITY (RLS)
-- ========================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;

-- ========================================
-- 2. SECURITY POLICIES
-- ========================================

-- Users table policies
CREATE POLICY "Users can view their own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all users" ON users
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Products table policies
CREATE POLICY "Anyone can view published products" ON products
    FOR SELECT USING (is_published = true);

CREATE POLICY "Creators can view their own products" ON products
    FOR SELECT USING (creator_id = auth.uid());

CREATE POLICY "Creators can insert their own products" ON products
    FOR INSERT WITH CHECK (creator_id = auth.uid());

CREATE POLICY "Creators can update their own products" ON products
    FOR UPDATE USING (creator_id = auth.uid());

CREATE POLICY "Creators can delete their own products" ON products
    FOR DELETE USING (creator_id = auth.uid());

CREATE POLICY "Admins can manage all products" ON products
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Orders table policies
CREATE POLICY "Users can view their own orders" ON orders
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create orders" ON orders
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can view all orders" ON orders
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Reviews table policies
CREATE POLICY "Anyone can view published reviews" ON reviews
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM products p 
            WHERE p.id = product_id AND p.is_published = true
        )
    );

CREATE POLICY "Users can view their own reviews" ON reviews
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create reviews for published products" ON reviews
    FOR INSERT WITH CHECK (
        user_id = auth.uid() AND
        EXISTS (
            SELECT 1 FROM products p 
            WHERE p.id = product_id AND p.is_published = true
        )
    );

CREATE POLICY "Users can update their own reviews" ON reviews
    FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own reviews" ON reviews
    FOR DELETE USING (user_id = auth.uid());

-- Categories table policies
CREATE POLICY "Anyone can view categories" ON categories
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage categories" ON categories
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Product categories table policies
CREATE POLICY "Anyone can view product categories" ON product_categories
    FOR SELECT USING (true);

CREATE POLICY "Admins can manage product categories" ON product_categories
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- ========================================
-- 3. SECURITY INDEXES
-- ========================================

-- Performance indexes for security queries
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_products_creator_published ON products(creator_id, is_published);
CREATE INDEX idx_orders_user_status ON orders(user_id, status);
CREATE INDEX idx_reviews_product_user ON reviews(product_id, user_id);

-- ========================================
-- 4. SECURITY FUNCTIONS
-- ========================================

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM users 
        WHERE id = user_id AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user owns a product
CREATE OR REPLACE FUNCTION owns_product(user_id UUID, product_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM products 
        WHERE id = product_id AND creator_id = user_id
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if product is published
CREATE OR REPLACE FUNCTION is_product_published(product_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM products 
        WHERE id = product_id AND is_published = true
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ========================================
-- 5. AUDIT TRAIL
-- ========================================

-- Create audit log table
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    table_name TEXT NOT NULL,
    record_id UUID NOT NULL,
    action TEXT NOT NULL CHECK (action IN ('INSERT', 'UPDATE', 'DELETE')),
    old_data JSONB,
    new_data JSONB,
    user_id UUID REFERENCES users(id),
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS on audit logs
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "Only admins can view audit logs" ON audit_logs
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- ========================================
-- 6. SECURITY VIEWS
-- ========================================

-- Secure view for public product data
CREATE VIEW public_products AS
SELECT 
    id, title, description, price, type, 
    thumbnail_url, demo_url, created_at, updated_at
FROM products 
WHERE is_published = true;

-- Secure view for user dashboard
CREATE VIEW user_dashboard AS
SELECT 
    p.id, p.title, p.description, p.price, p.type,
    p.thumbnail_url, p.is_published, p.created_at,
    COUNT(o.id) as order_count,
    AVG(r.rating) as avg_rating
FROM products p
LEFT JOIN orders o ON p.id = o.product_id
LEFT JOIN reviews r ON p.id = r.product_id
WHERE p.creator_id = auth.uid()
GROUP BY p.id, p.title, p.description, p.price, p.type, p.thumbnail_url, p.is_published, p.created_at;

-- ========================================
-- 7. SECURITY CONSTRAINTS
-- ========================================

-- Add additional constraints for security
ALTER TABLE products ADD CONSTRAINT check_price_positive CHECK (price > 0);
ALTER TABLE products ADD CONSTRAINT check_title_length CHECK (length(title) >= 1 AND length(title) <= 255);
ALTER TABLE reviews ADD CONSTRAINT check_rating_range CHECK (rating >= 1 AND rating <= 5);

-- ========================================
-- 8. COMMENTS FOR DOCUMENTATION
-- ========================================

COMMENT ON TABLE audit_logs IS 'Security audit trail for all data modifications';
COMMENT ON VIEW public_products IS 'Secure public view of published products';
COMMENT ON VIEW user_dashboard IS 'Secure view for user dashboard data';
COMMENT ON FUNCTION is_admin(UUID) IS 'Security function to check admin status';
COMMENT ON FUNCTION owns_product(UUID, UUID) IS 'Security function to check product ownership';
COMMENT ON FUNCTION is_product_published(UUID) IS 'Security function to check product publication status';
