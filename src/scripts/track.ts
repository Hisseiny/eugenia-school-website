/** Analytics events go to window.dataLayer (GTM convention). Without a container, they are harmless. */
export function track(event: string, data: Record<string, string> = {}): void {
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
  (w.dataLayer ??= []).push({ event, ...data });
}
