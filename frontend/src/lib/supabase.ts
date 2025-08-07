import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder'

export const supabase = createClient(supabaseUrl, supabaseKey)

export type Vote = {
  id?: number
  full_name: string
  destination: 'Thailand' | 'Manali'
  reason?: string
  device_id: string
  trip_period: string
  created_at?: string
}