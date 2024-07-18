import { Database } from "./supabase";

export type Photo = Database["public"]["Tables"]["photos"]["Row"];
