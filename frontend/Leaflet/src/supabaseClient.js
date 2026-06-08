import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qgtruekfxirtjhkyvnrl.supabase.co";
const supabaseKey = "sb_publishable_B680OwsWvcObqg_62R2tGw_E37G3MPp";

export const supabase = createClient(supabaseUrl, supabaseKey);
