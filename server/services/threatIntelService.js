import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const NVD_API_URL = 'https://services.nvd.nist.gov/rest/json/cves/2.0';
const CISA_KEV_URL = 'https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json';

// Simple in-memory cache
const cache = {
  cve: new Map(),
  kev: null,
  kevLastFetched: 0
};

const CACHE_TTL = 3600000; // 1 hour for CVEs
const KEV_CACHE_TTL = 86400000; // 24 hours for KEV feed

/**
 * Fetch and cache CISA KEV catalog
 */
export const fetchCISAKEV = async () => {
  const now = Date.now();
  if (cache.kev && (now - cache.kevLastFetched < KEV_CACHE_TTL)) {
    return cache.kev;
  }

  try {
    console.log('[ThreatIntel] Syncing CISA KEV catalog...');
    const response = await axios.get(CISA_KEV_URL, { timeout: 10000 });
    if (response.data && response.data.vulnerabilities) {
      cache.kev = response.data.vulnerabilities;
      cache.kevLastFetched = now;
      return cache.kev;
    }
  } catch (err) {
    console.error('[ThreatIntel] CISA KEV fetch failed:', err.message);
    return cache.kev || []; // Return stale cache if available
  }
};

/**
 * Search for a CVE in NVD
 */
export const getCVEData = async (cveId) => {
  const normalizedId = cveId.toUpperCase().trim();
  if (cache.cve.has(normalizedId)) {
    const entry = cache.cve.get(normalizedId);
    if (Date.now() - entry.timestamp < CACHE_TTL) {
      return entry.data;
    }
  }

  try {
    console.log(`[ThreatIntel] Searching NVD for ${normalizedId}...`);
    const apiKey = process.env.NVD_API_KEY;
    const headers = apiKey ? { 'apiKey': apiKey } : {};
    
    const response = await axios.get(`${NVD_API_URL}?cveId=${normalizedId}`, { 
      headers,
      timeout: 15000 
    });

    if (response.data && response.data.vulnerabilities && response.data.vulnerabilities.length > 0) {
      const cveData = response.data.vulnerabilities[0].cve;
      cache.cve.set(normalizedId, { data: cveData, timestamp: Date.now() });
      return cveData;
    }
    return null;
  } catch (err) {
    console.error(`[ThreatIntel] NVD search failed for ${normalizedId}:`, err.message);
    return null;
  }
};

/**
 * Identify CVE IDs in a string
 */
export const extractCVEs = (text) => {
  const cveRegex = /CVE-\d{4}-\d{4,7}/gi;
  const matches = text.match(cveRegex);
  return matches ? [...new Set(matches.map(m => m.toUpperCase()))] : [];
};

/**
 * Get full intelligence for a CVE including KEV status
 */
export const getCVEIntelligence = async (cveId) => {
  const [nvdData, kevCatalog] = await Promise.all([
    getCVEData(cveId),
    fetchCISAKEV()
  ]);

  if (!nvdData) return null;

  const kevEntry = kevCatalog?.find(v => v.cveID.toUpperCase() === cveId.toUpperCase());

  return {
    id: nvdData.id,
    description: nvdData.descriptions?.find(d => d.lang === 'en')?.value || 'No description available.',
    severity: nvdData.metrics?.cvssMetricV31?.[0]?.cvssData?.baseScore || 
              nvdData.metrics?.cvssMetricV30?.[0]?.cvssData?.baseScore || 
              'N/A',
    vector: nvdData.metrics?.cvssMetricV31?.[0]?.cvssData?.vectorString || 'N/A',
    status: nvdData.vulnStatus,
    published: nvdData.published,
    lastModified: nvdData.lastModified,
    isKEV: !!kevEntry,
    kevDetails: kevEntry ? {
      vendorProject: kevEntry.vendorProject,
      product: kevEntry.product,
      vulnerabilityName: kevEntry.vulnerabilityName,
      dateAdded: kevEntry.dateAdded,
      shortDescription: kevEntry.shortDescription,
      requiredAction: kevEntry.requiredAction,
      dueDate: kevEntry.dueDate
    } : null,
    references: nvdData.references?.slice(0, 5).map(r => r.url) || []
  };
};
