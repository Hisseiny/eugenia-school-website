export function sandboxConfig(endpoint = "", hosts = "") {
  if (endpoint) {
    let url: URL;
    try { url = new URL(endpoint); } catch { throw new Error("PUBLIC_SANDBOX_FORM_ENDPOINT doit être une URL http(s) valide."); }
    if (!["http:", "https:"].includes(url.protocol) || url.username || url.password) {
      throw new Error("PUBLIC_SANDBOX_FORM_ENDPOINT doit être une URL http(s) valide sans identifiants.");
    }
  }
  const allowedHosts = hosts.split(",").map(host => host.trim().toLowerCase()).filter(Boolean);
  for (const host of allowedHosts) {
    if (host === "eugeniaschool.com" || host.endsWith(".eugeniaschool.com") || host.replace(/\.$/, "").endsWith("eugeniaschool.com")) {
      throw new Error("PUBLIC_SANDBOX_HOSTS interdit eugeniaschool.com et ses sous-domaines.");
    }
    if (!/^[a-z0-9.-]+$/.test(host) || host.includes("..")) throw new Error("PUBLIC_SANDBOX_HOSTS attend des noms d’hôtes séparés par des virgules, sans port ni protocole.");
  }
  return { endpoint, hosts: allowedHosts };
}

export function sandboxAllowed(config: ReturnType<typeof sandboxConfig>, hostname: string): boolean {
  return !!config.endpoint && config.hosts.includes(hostname);
}

export async function sendSandbox(endpoint: string, formType: string, fields: Record<string, FormDataEntryValue>, fetcher = fetch, timeout = 10000): Promise<void> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetcher(endpoint, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
      body: JSON.stringify({ formType, fields }),
      credentials: "omit",
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`Bac à sable : HTTP ${response.status}`);
  } finally { clearTimeout(timer); }
}
