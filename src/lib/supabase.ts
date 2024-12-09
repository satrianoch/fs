import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ykbhxfvbvpjsqkqmtpwc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrYmh4ZnZidnBqc3FrcW10cHdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk5MjA5ODAsImV4cCI6MjAyNTQ5Njk4MH0.7kxnR0stPZWZZqvqy-ZQbJqXDyoqV1nDvEqGVfqgQXY';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});