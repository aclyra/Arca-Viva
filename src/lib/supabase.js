import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://joqyltkfnyirhjziqpnq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvcXlsdGtmbnlpcmhqemlxcG5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3MTQwNjYsImV4cCI6MjA4ODI5MDA2Nn0.z-MsAVUp-Ysb6uUY0TkTtXKK6mUrebMbpV9MeXEnvZU'
);