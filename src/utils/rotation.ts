import { DoseRecord, INJECTION_SITES, InjectionSite } from '../types';

/**
 * Recommends the next injection site by rotating away from the most
 * recently used site and preferring whichever site has gone longest
 * unused (or has never been used at all).
 */
export function recommendNextSite(records: DoseRecord[]): InjectionSite {
  if (records.length === 0) {
    return INJECTION_SITES[0];
  }

  const sortedByRecency = [...records].sort(
    (a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()
  );

  const lastSite = sortedByRecency[0].site;

  const lastUsedAt: Record<InjectionSite, number> = INJECTION_SITES.reduce(
    (acc, site) => ({ ...acc, [site]: 0 }),
    {} as Record<InjectionSite, number>
  );

  for (const record of records) {
    const t = new Date(record.dateTime).getTime();
    if (t > lastUsedAt[record.site]) {
      lastUsedAt[record.site] = t;
    }
  }

  const candidates = INJECTION_SITES.filter((site) => site !== lastSite);
  candidates.sort((a, b) => lastUsedAt[a] - lastUsedAt[b]);

  return candidates[0];
}
