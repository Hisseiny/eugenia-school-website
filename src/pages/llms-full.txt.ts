import { buildLlmsText } from "@/data/llms";

export function GET() {
  return new Response(buildLlmsText(true), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
