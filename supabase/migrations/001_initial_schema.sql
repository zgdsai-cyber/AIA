-- ============================================
-- Supabase Database Setup for AIA Platform
-- Database Schema with RLS (Row Level Security)
-- ============================================

-- 1. Users Table (Extends Supabase Auth)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  username VARCHAR(100) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  avatar_url TEXT,
  company_name VARCHAR(255),
  country VARCHAR(100),
  subscription_plan VARCHAR(50) DEFAULT 'free', -- free, basic, pro, enterprise
  subscription_status VARCHAR(50) DEFAULT 'active', -- active, cancelled, expired
  subscription_expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP
);

-- 2. Projects/Stores Table (متجر المستخدم)
CREATE TABLE IF NOT EXISTS public.stores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  store_type VARCHAR(50), -- fashion, perfume, electronics, etc.
  target_audience VARCHAR(100), -- men, women, families, youth, businesses, general
  target_region VARCHAR(50), -- saudi, gulf, arabic, global
  currency VARCHAR(10) DEFAULT 'SAR',
  language VARCHAR(10) DEFAULT 'ar',
  color_palette VARCHAR(50), -- luxury, modern, tech, elegant, simple, youthful
  design_style VARCHAR(50),
  tagline VARCHAR(255),
  logo_url TEXT,
  banner_image_url TEXT,
  
  -- Features
  has_app BOOLEAN DEFAULT FALSE,
  number_of_categories INTEGER DEFAULT 6,
  has_seasonal_offers BOOLEAN DEFAULT TRUE,
  
  -- Payment Methods (JSON Array)
  payment_methods TEXT[], -- creditcard, applepay, googleplay, paypal, bank, cod
  
  -- Shipping Methods (JSON Array)
  shipping_methods TEXT[], -- standard, express, same, pickup
  
  -- Status
  status VARCHAR(50) DEFAULT 'active', -- active, inactive, suspended
  is_published BOOLEAN DEFAULT FALSE,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP,
  
  CONSTRAINT store_user_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE
);

-- 3. Products Table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  description TEXT,
  detailed_description TEXT,
  sku VARCHAR(100) UNIQUE,
  price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2),
  category_id UUID,
  
  -- Images
  image_url TEXT,
  additional_images_urls TEXT[],
  
  -- Stock
  stock_quantity INTEGER DEFAULT 0,
  low_stock_alert INTEGER DEFAULT 5,
  
  -- Attributes
  colors TEXT[],
  sizes TEXT[],
  weight DECIMAL(8, 2),
  dimensions VARCHAR(100),
  
  -- Status
  is_active BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  rating DECIMAL(3, 2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP
);

-- 4. Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  description TEXT,
  icon_emoji VARCHAR(10),
  image_url TEXT,
  parent_category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(store_id, slug)
);

-- 5. Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
  customer_id UUID,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  
  -- Customer Info
  customer_name VARCHAR(255),
  customer_email VARCHAR(255),
  customer_phone VARCHAR(20),
  
  -- Shipping
  shipping_address TEXT NOT NULL,
  shipping_city VARCHAR(100),
  shipping_country VARCHAR(100),
  shipping_postal_code VARCHAR(20),
  
  -- Order Details
  subtotal DECIMAL(10, 2) NOT NULL,
  shipping_cost DECIMAL(10, 2) DEFAULT 0,
  tax_amount DECIMAL(10, 2) DEFAULT 0,
  discount_amount DECIMAL(10, 2) DEFAULT 0,
  total_amount DECIMAL(10, 2) NOT NULL,
  
  -- Payment
  payment_method VARCHAR(50),
  payment_status VARCHAR(50) DEFAULT 'pending', -- pending, completed, failed, refunded
  transaction_id VARCHAR(255),
  
  -- Shipping
  shipping_method VARCHAR(50),
  tracking_number VARCHAR(100),
  estimated_delivery_date DATE,
  actual_delivery_date DATE,
  
  -- Status
  order_status VARCHAR(50) DEFAULT 'pending', -- pending, confirmed, shipped, delivered, cancelled
  notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP
);

-- 6. Order Items Table
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id),
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  product_name VARCHAR(255),
  selected_color VARCHAR(100),
  selected_size VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- 7. Customers Table
CREATE TABLE IF NOT EXISTS public.customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  phone VARCHAR(20),
  country VARCHAR(100),
  
  -- Statistics
  total_orders INTEGER DEFAULT 0,
  total_spent DECIMAL(10, 2) DEFAULT 0,
  
  -- Status
  is_active BOOLEAN DEFAULT TRUE,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(store_id, email)
);

-- 8. Reviews Table
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  customer_name VARCHAR(255),
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(255),
  comment TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  is_approved BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 9. Coupons & Discounts
CREATE TABLE IF NOT EXISTS public.coupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
  code VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  discount_type VARCHAR(50), -- percentage, fixed
  discount_value DECIMAL(10, 2) NOT NULL,
  minimum_purchase DECIMAL(10, 2) DEFAULT 0,
  usage_limit INTEGER,
  usage_count INTEGER DEFAULT 0,
  expiry_date DATE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 10. Analytics Events
CREATE TABLE IF NOT EXISTS public.analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
  event_type VARCHAR(100), -- page_view, product_view, add_to_cart, purchase, etc.
  event_data JSONB,
  user_agent TEXT,
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT NOW()
);

-- 11. Store Settings
CREATE TABLE IF NOT EXISTS public.store_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID NOT NULL UNIQUE REFERENCES public.stores(id) ON DELETE CASCADE,
  
  -- Email Settings
  support_email VARCHAR(255),
  notification_email VARCHAR(255),
  
  -- Business Info
  business_name VARCHAR(255),
  business_registration_number VARCHAR(50),
  phone_number VARCHAR(20),
  address TEXT,
  city VARCHAR(100),
  country VARCHAR(100),
  
  -- Policies
  refund_policy TEXT,
  shipping_policy TEXT,
  privacy_policy TEXT,
  terms_of_service TEXT,
  
  -- Social Media
  facebook_url TEXT,
  twitter_url TEXT,
  instagram_url TEXT,
  youtube_url TEXT,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 12. Favorites/Wishlist
CREATE TABLE IF NOT EXISTS public.favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(customer_id, product_id)
);

-- ============================================
-- INDEXING FOR PERFORMANCE
-- ============================================

CREATE INDEX idx_stores_user_id ON public.stores(user_id);
CREATE INDEX idx_stores_slug ON public.stores(slug);
CREATE INDEX idx_products_store_id ON public.products(store_id);
CREATE INDEX idx_products_category_id ON public.products(category_id);
CREATE INDEX idx_categories_store_id ON public.categories(store_id);
CREATE INDEX idx_orders_store_id ON public.orders(store_id);
CREATE INDEX idx_orders_customer_email ON public.orders(customer_email);
CREATE INDEX idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX idx_customers_store_id ON public.customers(store_id);
CREATE INDEX idx_coupons_store_id ON public.coupons(store_id);
CREATE INDEX idx_coupons_code ON public.coupons(code);
CREATE INDEX idx_analytics_store_id ON public.analytics_events(store_id) WHERE created_at > NOW() - INTERVAL '30 days';

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- ============================================
-- Users Table Policies
-- ============================================

CREATE POLICY "Users can read their own data" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own data" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- ============================================
-- Stores Table Policies
-- ============================================

CREATE POLICY "Users can read their own stores" ON public.stores
  FOR SELECT USING (auth.uid() = user_id OR is_published = TRUE);

CREATE POLICY "Users can create stores" ON public.stores
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own stores" ON public.stores
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own stores" ON public.stores
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- Products Table Policies
-- ============================================

CREATE POLICY "Everyone can read published products" ON public.products
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.stores
      WHERE stores.id = products.store_id
      AND stores.is_published = TRUE
    )
  );

CREATE POLICY "Store owners can read their products" ON public.products
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.stores
      WHERE stores.id = products.store_id
      AND stores.user_id = auth.uid()
    )
  );

CREATE POLICY "Store owners can insert products" ON public.products
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.stores
      WHERE stores.id = store_id
      AND stores.user_id = auth.uid()
    )
  );

CREATE POLICY "Store owners can update their products" ON public.products
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.stores
      WHERE stores.id = store_id
      AND stores.user_id = auth.uid()
    )
  );

CREATE POLICY "Store owners can delete their products" ON public.products
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.stores
      WHERE stores.id = store_id
      AND stores.user_id = auth.uid()
    )
  );

-- ============================================
-- Categories Table Policies
-- ============================================

CREATE POLICY "Everyone can read published categories" ON public.categories
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.stores
      WHERE stores.id = categories.store_id
      AND stores.is_published = TRUE
    )
  );

CREATE POLICY "Store owners can manage their categories" ON public.categories
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.stores
      WHERE stores.id = store_id
      AND stores.user_id = auth.uid()
    )
  );

-- ============================================
-- Orders Table Policies
-- ============================================

CREATE POLICY "Store owners can read their orders" ON public.orders
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.stores
      WHERE stores.id = store_id
      AND stores.user_id = auth.uid()
    )
  );

CREATE POLICY "Customers can read their own orders" ON public.orders
  FOR SELECT USING (
    customer_email = auth.jwt() ->> 'email'
    OR auth.uid()::text = customer_id::text
  );

CREATE POLICY "Anyone can create orders" ON public.orders
  FOR INSERT WITH CHECK (TRUE);

-- ============================================
-- Order Items Table Policies
-- ============================================

CREATE POLICY "Store owners can read order items" ON public.order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
      AND EXISTS (
        SELECT 1 FROM public.stores
        WHERE stores.id = orders.store_id
        AND stores.user_id = auth.uid()
      )
    )
  );

-- ============================================
-- Store Settings Table Policies
-- ============================================

CREATE POLICY "Store owners can read their settings" ON public.store_settings
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.stores
      WHERE stores.id = store_settings.store_id
      AND stores.user_id = auth.uid()
    )
  );

CREATE POLICY "Store owners can update their settings" ON public.store_settings
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.stores
      WHERE stores.id = store_settings.store_id
      AND stores.user_id = auth.uid()
    )
  );

-- ============================================
-- Analytics Table Policies
-- ============================================

CREATE POLICY "Store owners can read their analytics" ON public.analytics_events
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.stores
      WHERE stores.id = analytics_events.store_id
      AND stores.user_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can create analytics events" ON public.analytics_events
  FOR INSERT WITH CHECK (TRUE);

-- ============================================
-- FUNCTIONS FOR AUTO-UPDATE TIMESTAMPS
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER trigger_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_stores_updated_at BEFORE UPDATE ON public.stores
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_products_updated_at BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_categories_updated_at BEFORE UPDATE ON public.categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_orders_updated_at BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_store_settings_updated_at BEFORE UPDATE ON public.store_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- VIEWS FOR COMMON QUERIES
-- ============================================

-- Store Dashboard Stats
CREATE OR REPLACE VIEW public.store_dashboard_stats AS
SELECT
  s.id as store_id,
  COUNT(DISTINCT o.id) as total_orders,
  COUNT(DISTINCT p.id) as total_products,
  SUM(o.total_amount) as total_revenue,
  COUNT(DISTINCT c.id) as total_customers,
  AVG(p.rating) as average_rating
FROM public.stores s
LEFT JOIN public.orders o ON s.id = o.store_id
LEFT JOIN public.products p ON s.id = p.store_id
LEFT JOIN public.customers c ON s.id = c.store_id
GROUP BY s.id;

-- ============================================
-- STORAGE BUCKETS
-- ============================================

-- Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public)
VALUES ('products', 'products', true)
ON CONFLICT DO NOTHING;

-- Create storage bucket for store logos
INSERT INTO storage.buckets (id, name, public)
VALUES ('logos', 'logos', true)
ON CONFLICT DO NOTHING;

-- Create storage bucket for user avatars
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT DO NOTHING;

-- ============================================
-- END OF SETUP SCRIPT
-- ============================================
-- Run this script in Supabase SQL Editor
-- Make sure to enable Row Level Security after running
