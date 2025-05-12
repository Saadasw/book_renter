import { createClient } from '@supabase/supabase-js';


// Initialize Supabase client
// Using direct values from project configuration
const supabaseUrl = 'https://quxjvorgnmxzbwzlvjiv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1eGp2b3Jnbm14emJ3emx2aml2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwMzM4NTAsImV4cCI6MjA2MjYwOTg1MH0.nSApebqQofYwBdwFc6swNu0v1_C8W8dowJFb3j44cbo';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };