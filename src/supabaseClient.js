import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dchqyrcerocphatizvvw.supabase.co/rest/v1/'
const supabaseAnonKey = 'sb_publishable_Oz9JHZ0vxpQwFZtBNmZfHQ_fLIbEmOd'

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
)
