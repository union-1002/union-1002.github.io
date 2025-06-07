import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zcalgdptslkptkodnqun.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjYWxnZHB0c2xrcHRrb2RucXVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4NjkxNTAsImV4cCI6MjA2NDQ0NTE1MH0.rR2QqQpo6X_uj5KNFOR7VX566-DRh0JIsfXeoktGjxI';                       // 복붙

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
