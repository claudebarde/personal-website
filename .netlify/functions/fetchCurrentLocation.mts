import type { Context } from "@netlify/functions";

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

  const endpoint = new URL(`${SUPABASE_URL}/rest/v1/${LOCATION_TABLE}`);
  endpoint.searchParams.set("select", "id,created_at,city,country,coordinates");
  endpoint.searchParams.set("order", "id.desc");
  endpoint.searchParams.set("limit", "1");

  const response = await fetch(endpoint.toString(), {
    headers: {
      apikey: apiKey,
      Authorization: `Bearer ${apiKey}`
    }
  });

  if (!response.ok) {
    const details = await response.text();
    return buildErrorResponse(response.status, `Supabase error: ${details}`);
  }

  const rows = (await response.json()) as LocationRecord[];
  const latest = rows[0];
  if (!latest) {
    return buildErrorResponse(404, "No location records found.");
  }

  return new Response(JSON.stringify({ data: latest }), {
    headers: { "Content-Type": "application/json" }
  });
};
