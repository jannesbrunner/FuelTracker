import { createClient } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage'

import db_creds from './db_creds'; // Not part of the repo!

const supabaseUrl = db_creds.supabaseUrl;
const supabaseAnonKey = db_creds.supabaseAnonKey;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    localStorage: AsyncStorage, // localStorage not available in RN
    detectSessionInUrl: false  // not possible in RN
  })