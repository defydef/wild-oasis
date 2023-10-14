import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://ugrivjxpaqykelfdioev.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVncml2anhwYXF5a2VsZmRpb2V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY4OTgyMTIsImV4cCI6MjAxMjQ3NDIxMn0.yC2CYAh42DY_KI4-eF1dxWOFgt09amx4nSdPT1-OydA";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
