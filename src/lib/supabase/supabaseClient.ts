import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

export const supabase = createClient<Database>('https://pcrcadvsxcpskbekheie.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjcmNhZHZzeGNwc2tiZWtoZWllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAxMDY4NDgsImV4cCI6MjAzNTY4Mjg0OH0.Ki8zds99QxQar1PhxAzt3tZezz8ngvmrn-L-opw4DOY')