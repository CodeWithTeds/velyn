
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
    // Returns a Supabase browser client for use in Client Components
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    );
}