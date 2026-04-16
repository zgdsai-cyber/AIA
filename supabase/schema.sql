-- ====================================
-- AIA E-commerce Designer - Supabase Schema
-- ====================================

-- 1. جدول المستخدمين (يتم إنشاؤه تلقائياً بـ Supabase)
-- auth.users موجود بالفعل

-- 2. جدول المشاريع/المتاجر (Projects)
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  store_name VARCHAR(255) NOT NULL,
  store_type VARCHAR(100),
  target_audience VARCHAR(100),
  target_region VARCHAR(100),
  currency VARCHAR(10),
  color_palette VARCHAR(100),
  prefer_colors TEXT[], -- Array of colors
  design_style VARCHAR(100),
  has_app BOOLEAN DEFAULT FALSE,
  number_of_categories INTEGER DEFAULT 6,
  has_seasonal_offers BOOLEAN DEFAULT TRUE,
  payment_methods TEXT[], -- Array
  shipping_methods TEXT[], -- Array
  tagline TEXT,
  description TEXT,
  slug VARCHAR(255) UNIQUE NOT NULL,
  
  -- Metadata
  status VARCHAR(50) DEFAULT 'draft', -- draft, active, archived
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE,
  visited_count INTEGER DEFAULT 0,
  
  -- Store info
  logo_url VARCHAR(500),
  logo_key VARCHAR(500), -- For Supabase Storage
  published_at_date DATE
);

-- Create index for user_id and slug
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_status ON projects(status);

-- 3. جدول المنتجات (Products)
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2),
  discount_percentage FLOAT,
  
  -- Inventory
  stock_quantity INTEGER DEFAULT 0,
  sku VARCHAR(100),
  
  -- Images
  main_image_url VARCHAR(500),
  main_image_key VARCHAR(500),
  images_json JSONB, -- Array of images
  
  -- Rating
  rating FLOAT DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  
  -- Status
  is_active BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_products_project_id ON products(project_id);
CREATE INDEX idx_products_user_id ON products(user_id);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_active ON products(is_active);

-- 4. جدول التقييمات والمراجعات (Reviews)
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE SET NULL,
  
  rating INT CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  helpful_count INT DEFAULT 0,
  unhelpful_count INT DEFAULT 0,
  
  is_verified_purchase BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_reviews_product_id ON reviews(product_id);
CREATE INDEX idx_reviews_project_id ON reviews(project_id);

-- 5. جدول الطلبات (Orders)
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20),
  
  -- Shipping
  shipping_address JSONB NOT NULL, -- Contains full address info
  shipping_method VARCHAR(100),
  shipping_cost DECIMAL(10, 2),
  
  -- Payment
  payment_method VARCHAR(100),
  payment_status VARCHAR(50) DEFAULT 'pending', -- pending, completed, failed
  total_amount DECIMAL(10, 2) NOT NULL,
  tax_amount DECIMAL(10, 2),
  discount_amount DECIMAL(10, 2),
  
  -- Order items
  items_json JSONB NOT NULL, -- Array of {product_id, quantity, price}
  
  -- Status
  order_status VARCHAR(50) DEFAULT 'pending', -- pending, processing, shipped, delivered, cancelled
  order_number VARCHAR(50) UNIQUE NOT NULL,
  
  notes TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_orders_project_id ON orders(project_id);
CREATE INDEX idx_orders_customer_email ON orders(customer_email);
CREATE INDEX idx_orders_status ON orders(order_status);

-- 6. جدول العملاء (Customers)
CREATE TABLE IF NOT EXISTS customers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  
  -- Addresses
  addresses_json JSONB, -- Array of addresses
  default_address_id VARCHAR(50),
  
  -- Preferences
  preferences_json JSONB, -- Favorite categories, etc
  
  -- Stats
  total_orders INT DEFAULT 0,
  total_spent DECIMAL(12, 2) DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_customers_project_id ON customers(project_id);
CREATE INDEX idx_customers_email ON customers(email);

-- 7. جدول الفئات (Categories)
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  description TEXT,
  icon_url VARCHAR(500),
  image_url VARCHAR(500),
  display_order INT,
  parent_category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  
  is_active BOOLEAN DEFAULT TRUE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_categories_project_id ON categories(project_id);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE UNIQUE INDEX idx_categories_project_slug ON categories(project_id, slug);

-- 8. جدول الخصومات والكوبونات (Discounts)
CREATE TABLE IF NOT EXISTS discounts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  
  code VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  discount_type VARCHAR(20), -- percentage, fixed_amount
  discount_value DECIMAL(10, 2) NOT NULL,
  
  -- Limits
  max_uses INT,
  current_uses INT DEFAULT 0,
  min_purchase_amount DECIMAL(10, 2),
  max_discount_amount DECIMAL(10, 2),
  
  -- Date range
  valid_from TIMESTAMP WITH TIME ZONE,
  valid_until TIMESTAMP WITH TIME ZONE,
  
  is_active BOOLEAN DEFAULT TRUE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_discounts_project_id ON discounts(project_id);
CREATE INDEX idx_discounts_code ON discounts(code);
CREATE INDEX idx_discounts_active ON discounts(is_active);

-- 9. جدول قوائم التفضيلات (Wishlists)
CREATE TABLE IF NOT EXISTS wishlists (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_wishlists_project_id ON wishlists(project_id);
CREATE INDEX idx_wishlists_customer_id ON wishlists(customer_id);
CREATE INDEX idx_wishlists_product_id ON wishlists(product_id);
CREATE UNIQUE INDEX idx_wishlists_unique ON wishlists(project_id, customer_id, product_id);

-- 10. جدول حركات المشروع (Project Activity)
CREATE TABLE IF NOT EXISTS project_activity (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  action VARCHAR(100), -- created, updated, published, etc
  entity_type VARCHAR(100), -- project, product, order, etc
  entity_id VARCHAR(255),
  changes_json JSONB,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_activity_project_id ON project_activity(project_id);
CREATE INDEX idx_activity_user_id ON project_activity(user_id);

-- 11. جدول إحصائيات المشروع (Project Stats)
CREATE TABLE IF NOT EXISTS project_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  
  total_visitors INT DEFAULT 0,
  total_products INT DEFAULT 0,
  total_orders INT DEFAULT 0,
  total_revenue DECIMAL(12, 2) DEFAULT 0,
  average_order_value DECIMAL(10, 2) DEFAULT 0,
  
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_stats_project_id ON project_stats(project_id);

-- ====================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================

-- Enable RLS on all tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE discounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_stats ENABLE ROW LEVEL SECURITY;

-- ========== POLICIES FOR PROJECTS TABLE ==========

-- Select: Users can only see their own projects
CREATE POLICY "Users can view their own projects"
  ON projects FOR SELECT
  USING (auth.uid() = user_id);

-- Insert: Users can create their own projects
CREATE POLICY "Users can create their own projects"
  ON projects FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Update: Users can update their own projects
CREATE POLICY "Users can update their own projects"
  ON projects FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Delete: Users can delete their own projects
CREATE POLICY "Users can delete their own projects"
  ON projects FOR DELETE
  USING (auth.uid() = user_id);

-- ========== POLICIES FOR PRODUCTS TABLE ==========

-- Select: Users can only see products in their projects
CREATE POLICY "Users can view products in their projects"
  ON products FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = products.project_id 
      AND projects.user_id = auth.uid()
    )
  );

-- Insert: Users can create products in their projects
CREATE POLICY "Users can create products in their projects"
  ON products FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = project_id 
      AND projects.user_id = auth.uid()
    )
  );

-- Update: Users can update products in their projects
CREATE POLICY "Users can update products in their projects"
  ON products FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = products.project_id 
      AND projects.user_id = auth.uid()
    )
  );

-- Delete: Users can delete products in their projects
CREATE POLICY "Users can delete products in their projects"
  ON products FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = products.project_id 
      AND projects.user_id = auth.uid()
    )
  );

-- ========== POLICIES FOR ORDERS TABLE ==========

-- Select: Users can view orders from their projects
CREATE POLICY "Users can view orders in their projects"
  ON orders FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = orders.project_id 
      AND projects.user_id = auth.uid()
    )
  );

-- Insert: Allow anonymous inserts (for checkout)
CREATE POLICY "Allow anyone to create orders"
  ON orders FOR INSERT
  WITH CHECK (true);

-- Update: Only project owner can update orders
CREATE POLICY "Users can update orders in their projects"
  ON orders FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = orders.project_id 
      AND projects.user_id = auth.uid()
    )
  );

-- ========== POLICIES FOR CUSTOMERS TABLE ==========

-- Select: Users can only see customers in their projects
CREATE POLICY "Users can view customers in their projects"
  ON customers FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = customers.project_id 
      AND projects.user_id = auth.uid()
    )
  );

-- Insert: Allow anonymous inserts (for customer profile)
CREATE POLICY "Allow anyone to create customer profiles"
  ON customers FOR INSERT
  WITH CHECK (true);

-- Update: Allow customer to update their own profile or owner to update
CREATE POLICY "Customers can update their profiles"
  ON customers FOR UPDATE
  USING (true);

-- ========== POLICIES FOR CATEGORIES TABLE ==========

-- Select: Users can view categories in their projects
CREATE POLICY "Users can view categories in their projects"
  ON categories FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = categories.project_id 
      AND projects.user_id = auth.uid()
    )
  );

-- Insert: Users can create categories in their projects
CREATE POLICY "Users can create categories in their projects"
  ON categories FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = project_id 
      AND projects.user_id = auth.uid()
    )
  );

-- Update: Users can update categories in their projects
CREATE POLICY "Users can update categories in their projects"
  ON categories FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = categories.project_id 
      AND projects.user_id = auth.uid()
    )
  );

-- Delete: Users can delete categories in their projects
CREATE POLICY "Users can delete categories in their projects"
  ON categories FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = categories.project_id 
      AND projects.user_id = auth.uid()
    )
  );

-- ========== POLICIES FOR REVIEWS TABLE ==========

-- Select: Allow anyone to view reviews (public)
CREATE POLICY "Anyone can view reviews"
  ON reviews FOR SELECT
  USING (true);

-- Insert: Allow anyone to create reviews
CREATE POLICY "Anyone can create reviews"
  ON reviews FOR INSERT
  WITH CHECK (true);

-- Update: Allow review author to update
CREATE POLICY "Users can update their own reviews"
  ON reviews FOR UPDATE
  USING (auth.uid() = user_id);

-- ========== POLICIES FOR DISCOUNTS TABLE ==========

-- Select: Users can view discounts in their projects
CREATE POLICY "Users can view discounts in their projects"
  ON discounts FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = discounts.project_id 
      AND projects.user_id = auth.uid()
    )
  );

-- Insert: Users can create discounts in their projects
CREATE POLICY "Users can create discounts in their projects"
  ON discounts FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = project_id 
      AND projects.user_id = auth.uid()
    )
  );

-- ========== POLICIES FOR WISHLISTS TABLE ==========

-- Select: Allow anyone to view wishlists
CREATE POLICY "Anyone can view wishlists"
  ON wishlists FOR SELECT
  USING (true);

-- Insert: Allow anyone to add to wishlist
CREATE POLICY "Anyone can add to wishlist"
  ON wishlists FOR INSERT
  WITH CHECK (true);

-- Delete: Allow anyone to remove from wishlist
CREATE POLICY "Anyone can remove from wishlist"
  ON wishlists FOR DELETE
  USING (true);

-- ========== POLICIES FOR PROJECT_ACTIVITY TABLE ==========

-- Select: Users can view activity in their projects
CREATE POLICY "Users can view activity in their projects"
  ON project_activity FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = project_activity.project_id 
      AND projects.user_id = auth.uid()
    )
  );

-- Insert: Allow inserts for project activity
CREATE POLICY "Allow activity logging"
  ON project_activity FOR INSERT
  WITH CHECK (true);

-- ========== POLICIES FOR PROJECT_STATS TABLE ==========

-- Select: Users can view stats for their projects
CREATE POLICY "Users can view stats for their projects"
  ON project_stats FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = project_stats.project_id 
      AND projects.user_id = auth.uid()
    )
  );

-- Insert: Allow stats creation
CREATE POLICY "Allow stats creation"
  ON project_stats FOR INSERT
  WITH CHECK (true);

-- Update: Allow stats updates
CREATE POLICY "Allow stats updates"
  ON project_stats FOR UPDATE
  USING (true);

-- ========================================
-- FUNCTIONS
-- ========================================

-- Function to generate unique slug
CREATE OR REPLACE FUNCTION generate_slug(store_name VARCHAR)
RETURNS VARCHAR AS $$
DECLARE
  base_slug VARCHAR;
  slug VARCHAR;
  counter INT := 1;
BEGIN
  base_slug := LOWER(TRIM(BOTH FROM store_name));
  base_slug := REPLACE(base_slug, ' ', '-');
  base_slug := REGEXP_REPLACE(base_slug, '[^a-z0-9-]', '', 'g');
  base_slug := REGEXP_REPLACE(base_slug, '-+', '-', 'g');
  base_slug := TRIM(BOTH '-' FROM base_slug);
  
  slug := base_slug;
  
  WHILE EXISTS(SELECT 1 FROM projects WHERE projects.slug = slug) LOOP
    slug := base_slug || '-' || counter::VARCHAR;
    counter := counter + 1;
  END LOOP;
  
  RETURN slug;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Function to update slug on insert
CREATE OR REPLACE FUNCTION update_project_slug()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.slug IS NULL THEN
    NEW.slug := generate_slug(NEW.store_name);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for slug generation
CREATE TRIGGER projects_slug_trigger
BEFORE INSERT ON projects
FOR EACH ROW
EXECUTE FUNCTION update_project_slug();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER projects_updated_at_trigger
BEFORE UPDATE ON projects
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER products_updated_at_trigger
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER categories_updated_at_trigger
BEFORE UPDATE ON categories
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER orders_updated_at_trigger
BEFORE UPDATE ON orders
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER customers_updated_at_trigger
BEFORE UPDATE ON customers
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER discounts_updated_at_trigger
BEFORE UPDATE ON discounts
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ========================
-- STORAGE BUCKETS
-- ========================
-- Note: These should be created in Supabase dashboard or via REST API

-- Buckets needed:
-- 1. project-logos (for store logos)
-- 2. product-images (for product images)
-- 3. category-images (for category images)

-- Example storage policies (to be set in dashboard):
-- - project-logos: authenticated users can upload/download their own
-- - product-images: authenticated users can upload/download in their projects
-- - category-images: authenticated users can upload/download in their projects

-- ========================
-- End of Schema
-- ========================
