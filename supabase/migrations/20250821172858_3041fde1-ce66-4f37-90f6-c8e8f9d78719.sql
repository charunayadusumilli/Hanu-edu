-- Create comprehensive Hanu framework database structure
-- This supports the four pillars: Talent, AI Academy, Partnerships, Solutions

-- 1. HANU TALENT - HR Platform Tables
CREATE TABLE public.talent_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  employee_id TEXT UNIQUE,
  department TEXT,
  position TEXT,
  hire_date DATE,
  manager_id UUID REFERENCES auth.users(id),
  salary_range TEXT,
  skills TEXT[],
  certifications JSONB DEFAULT '[]'::jsonb,
  performance_metrics JSONB DEFAULT '{}'::jsonb,
  benefits JSONB DEFAULT '{}'::jsonb,
  vacation_days_used INTEGER DEFAULT 0,
  vacation_days_total INTEGER DEFAULT 25,
  emergency_contact JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 2. HANU AI ACADEMY - Learning Platform Tables
CREATE TABLE public.academy_courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  difficulty_level TEXT CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  duration_hours INTEGER,
  price INTEGER DEFAULT 0,
  instructor_id UUID REFERENCES auth.users(id),
  is_published BOOLEAN DEFAULT false,
  curriculum JSONB DEFAULT '[]'::jsonb,
  prerequisites TEXT[],
  learning_outcomes TEXT[],
  thumbnail_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.academy_enrollments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.academy_courses(id) ON DELETE CASCADE,
  progress_percentage INTEGER DEFAULT 0,
  completion_date TIMESTAMP WITH TIME ZONE,
  certificate_issued BOOLEAN DEFAULT false,
  enrolled_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, course_id)
);

-- 3. HANU PARTNERSHIPS - Business Partnerships Tables
CREATE TABLE public.partnership_organizations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT CHECK (type IN ('technology', 'consulting', 'academic', 'government', 'non-profit')),
  industry TEXT,
  contact_person TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  website TEXT,
  description TEXT,
  partnership_level TEXT CHECK (partnership_level IN ('strategic', 'preferred', 'standard')),
  start_date DATE,
  end_date DATE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending', 'expired')),
  benefits JSONB DEFAULT '[]'::jsonb,
  services_offered TEXT[],
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.partnership_collaborations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  partnership_id UUID NOT NULL REFERENCES public.partnership_organizations(id) ON DELETE CASCADE,
  project_name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'planning' CHECK (status IN ('planning', 'active', 'completed', 'cancelled')),
  start_date DATE,
  end_date DATE,
  budget_allocated INTEGER,
  budget_used INTEGER DEFAULT 0,
  deliverables JSONB DEFAULT '[]'::jsonb,
  hanu_lead_id UUID REFERENCES auth.users(id),
  partner_lead_contact TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 4. HANU SOLUTIONS - Product & Subscription Management
CREATE TABLE public.solution_products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT CHECK (category IN ('healthcare', 'government', 'business-improvement', 'contact-center', 'ai-tools')),
  description TEXT,
  long_description TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  pricing_model TEXT CHECK (pricing_model IN ('subscription', 'one-time', 'usage-based', 'enterprise')),
  base_price INTEGER, -- in cents
  currency TEXT DEFAULT 'USD',
  billing_cycle TEXT CHECK (billing_cycle IN ('monthly', 'quarterly', 'yearly', 'one-time')),
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  demo_available BOOLEAN DEFAULT false,
  demo_url TEXT,
  documentation_url TEXT,
  api_documentation_url TEXT,
  support_level TEXT CHECK (support_level IN ('basic', 'standard', 'premium', 'enterprise')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.solution_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.solution_products(id) ON DELETE CASCADE,
  subscription_tier TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired', 'trial', 'suspended')),
  trial_end_date TIMESTAMP WITH TIME ZONE,
  billing_cycle TEXT CHECK (billing_cycle IN ('monthly', 'quarterly', 'yearly', 'one-time')),
  amount INTEGER NOT NULL, -- in cents
  currency TEXT DEFAULT 'USD',
  next_billing_date TIMESTAMP WITH TIME ZONE,
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  cancelled_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enhanced client challenges table for improved onboarding
CREATE TABLE public.client_inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company_name TEXT,
  phone TEXT,
  inquiry_type TEXT CHECK (inquiry_type IN ('consulting', 'talent', 'academy', 'partnerships', 'solutions', 'general')),
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'assigned', 'in-progress', 'resolved', 'closed')),
  assigned_to UUID REFERENCES auth.users(id),
  response_due_date TIMESTAMP WITH TIME ZONE,
  resolution_notes TEXT,
  follow_up_required BOOLEAN DEFAULT false,
  follow_up_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.talent_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academy_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academy_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partnership_organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partnership_collaborations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.solution_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.solution_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_inquiries ENABLE ROW LEVEL SECURITY;

-- Create RLS policies

-- Talent Profiles - Users can only see their own profile, HR/Admins can see all
CREATE POLICY "Users can view own talent profile" ON public.talent_profiles
  FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can update own talent profile" ON public.talent_profiles
  FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "HR admins can manage all talent profiles" ON public.talent_profiles
  FOR ALL USING (is_admin_user());

-- Academy Courses - Public can view published courses
CREATE POLICY "Anyone can view published courses" ON public.academy_courses
  FOR SELECT USING (is_published = true);
CREATE POLICY "Instructors can manage their courses" ON public.academy_courses
  FOR ALL USING (instructor_id = auth.uid());
CREATE POLICY "Admins can manage all courses" ON public.academy_courses
  FOR ALL USING (is_admin_user());

-- Academy Enrollments - Users can manage their own enrollments
CREATE POLICY "Users can manage own enrollments" ON public.academy_enrollments
  FOR ALL USING (user_id = auth.uid());
CREATE POLICY "Instructors can view course enrollments" ON public.academy_enrollments
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM public.academy_courses 
    WHERE id = academy_enrollments.course_id AND instructor_id = auth.uid()
  ));

-- Partnership Organizations - Admins only
CREATE POLICY "Admins can manage partnerships" ON public.partnership_organizations
  FOR ALL USING (is_admin_user());
CREATE POLICY "Employees can view partnerships" ON public.partnership_organizations
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM public.talent_profiles WHERE user_id = auth.uid()
  ));

-- Partnership Collaborations - Project leads and admins
CREATE POLICY "Admins can manage collaborations" ON public.partnership_collaborations
  FOR ALL USING (is_admin_user());
CREATE POLICY "Project leads can manage their collaborations" ON public.partnership_collaborations
  FOR ALL USING (hanu_lead_id = auth.uid());

-- Solution Products - Public can view active products
CREATE POLICY "Anyone can view active products" ON public.solution_products
  FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage products" ON public.solution_products
  FOR ALL USING (is_admin_user());

-- Solution Subscriptions - Users can manage their own subscriptions
CREATE POLICY "Users can manage own subscriptions" ON public.solution_subscriptions
  FOR ALL USING (user_id = auth.uid());
CREATE POLICY "Admins can view all subscriptions" ON public.solution_subscriptions
  FOR SELECT USING (is_admin_user());

-- Client Inquiries - Users can manage their own inquiries
CREATE POLICY "Users can create inquiries" ON public.client_inquiries
  FOR INSERT WITH CHECK (
    CASE 
      WHEN user_id IS NOT NULL THEN user_id = auth.uid()
      ELSE true -- Allow anonymous inquiries
    END
  );
CREATE POLICY "Users can view own inquiries" ON public.client_inquiries
  FOR SELECT USING (user_id = auth.uid() OR auth.uid() IS NULL);
CREATE POLICY "Assigned staff can manage inquiries" ON public.client_inquiries
  FOR ALL USING (assigned_to = auth.uid() OR is_admin_user());

-- Create indexes for performance
CREATE INDEX idx_talent_profiles_user_id ON public.talent_profiles(user_id);
CREATE INDEX idx_talent_profiles_department ON public.talent_profiles(department);
CREATE INDEX idx_academy_enrollments_user_course ON public.academy_enrollments(user_id, course_id);
CREATE INDEX idx_academy_courses_category ON public.academy_courses(category);
CREATE INDEX idx_partnerships_status ON public.partnership_organizations(status);
CREATE INDEX idx_solution_subscriptions_user_id ON public.solution_subscriptions(user_id);
CREATE INDEX idx_solution_subscriptions_status ON public.solution_subscriptions(status);
CREATE INDEX idx_client_inquiries_status ON public.client_inquiries(status);
CREATE INDEX idx_client_inquiries_type ON public.client_inquiries(inquiry_type);

-- Create updated_at triggers
CREATE TRIGGER update_talent_profiles_updated_at BEFORE UPDATE ON public.talent_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_academy_courses_updated_at BEFORE UPDATE ON public.academy_courses
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_partnerships_updated_at BEFORE UPDATE ON public.partnership_organizations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_collaborations_updated_at BEFORE UPDATE ON public.partnership_collaborations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.solution_products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON public.solution_subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_inquiries_updated_at BEFORE UPDATE ON public.client_inquiries
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();