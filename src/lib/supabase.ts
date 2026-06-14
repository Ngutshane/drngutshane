import { createClient } from "@supabase/supabase-js";

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const url = rawUrl.startsWith("https://") ? rawUrl : `https://${rawUrl}`;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Server-side only — uses service role key to bypass RLS
export const supabaseAdmin = createClient(url, serviceKey);
