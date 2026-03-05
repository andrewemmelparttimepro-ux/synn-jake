// Server-side Supabase client for use in Server Components and API routes
// Will be configured when actual Supabase project is set up

import { createClient } from '@supabase/supabase-js';

export function createServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'your-service-role-key';
  
  return createClient(supabaseUrl, supabaseServiceKey);
}
