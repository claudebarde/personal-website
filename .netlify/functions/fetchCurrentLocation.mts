import type { Context } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://wtxtoyyeseedesrmegmq.supabase.co";
const LOCATION_TABLE = "locations";

type LocationRecord = {
  id: number;
  created_at: string;
  city: string | null;
  country: string | null;
  coordinates: number[] | null;
};

const buildErrorResponse = (status: number, message: string) =>
  new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json" }
  });

export default async (_req: Request, _context: Context) => {
  const apiKey = Netlify.env.get("SUPABASE_PUBLISHABLE_KEY");
  if (!apiKey) {
    return buildErrorResponse(500, "Missing Supabase publishable API key.");
  }
  const supabase = createClient(SUPABASE_URL, apiKey);

  const { data, error } = await supabase
    .from(LOCATION_TABLE)
    .select("id,created_at,city,country,coordinates")
    .order("id", { ascending: false })
    .limit(2);

  if (error) {
    return buildErrorResponse(500, `Supabase error: ${error.message}`);
  }

  if (!data || data.length === 0) {
    return buildErrorResponse(500, "No location records found.");
  }

  const [latest, previous] = data as LocationRecord[];
  // if the timestamp of the latest is in the future, we return the previous one
  if (new Date(latest.created_at) > new Date()) {
    return new Response(JSON.stringify({ data: previous }), {
      headers: { "Content-Type": "application/json" }
    });
  } else {
    return new Response(JSON.stringify({ data: latest }), {
      headers: { "Content-Type": "application/json" }
    });
  }
};
