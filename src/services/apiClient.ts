/* 
  Axios-based API client for frontend network calls.
  Provides uploadFits, uploadZip, getLightcurve, and vetExoplanets.
*/
import axios from "axios";

const API_BASE_URL = (import.meta.env.VITE_API_URL as string) || "http://localhost:8000";

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60_000,
});

/**
 * Upload a single FITS file to the backend.
 * @param file - FITS File
 */
export async function uploadFits(file: File) {
  const form = new FormData();
  form.append("file", file);
  const res = await client.post("/upload_fits", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

/**
 * Upload a ZIP file that contains multiple FITS files.
 * Backend expected to return a list of Kepler/TESS IDs.
 * @param file - ZIP File
 */
export async function uploadZip(file: File) {
  const form = new FormData();
  form.append("file", file);
  const res = await client.post("/upload_zip", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  // Expecting a JSON array like ["KIC-123", "KIC-456"] or { ids: [...] }
  return res.data;
}

/**
 * Fetch a lightcurve for a given id.
 * Tries JSON first (image base64 + metadata), falls back to image blob.
 * @param id - Kepler/TESS ID
 */
export async function getLightcurve(id: string) {
  try {
    // Try JSON response (image as base64 + metadata)
    const jsonResp = await client.get(`/lightcurve/${encodeURIComponent(id)}`, {
      responseType: "json",
    });
    if (jsonResp?.data) {
      const data = jsonResp.data;
      if (data.image && data.metadata) {
        return {
          imageSrc: data.image.startsWith("data:") ? data.image : `data:image/png;base64,${data.image}`,
          metadata: data.metadata,
        };
      }
      // If the JSON payload is itself the metadata with a url
      if (data.url && typeof data.url === "string") {
        return { imageSrc: data.url, metadata: data.metadata || {} };
      }
    }
  } catch (e) {
    // ignore JSON attempt failures and try blob below
  }

  // Fallback to blob (image)
  const blobResp = await client.get(`/lightcurve/${encodeURIComponent(id)}`, {
    responseType: "blob",
  });
  const blob = blobResp.data as Blob;
  const url = URL.createObjectURL(blob);
  // Try to parse metadata from a header (optional); else empty obj
  const metadataHeader = blobResp.headers?.["x-lightcurve-metadata"];
  let metadata = {};
  if (metadataHeader) {
    try {
      metadata = JSON.parse(metadataHeader);
    } catch {
      metadata = { info: metadataHeader };
    }
  }
  return { imageSrc: url, metadata };
}

/**
 * Request vetting endpoint which returns a CSV file.
 * Parses CSV client-side and returns { headers, rows }.
 */
export async function vetExoplanets() {
  const resp = await client.get("/vet_exoplanets", { responseType: "blob" });
  const text = await resp.data.text();

  // Basic CSV parser that handles quoted fields
  const parseCSV = (csvText: string) => {
    const lines: string[] = [];
    let cur = "";
    let inQuotes = false;
    for (let i = 0; i < csvText.length; i++) {
      const ch = csvText[i];
      if (ch === '"' && csvText[i + 1] === '"') {
        cur += '"';
        i++;
        continue;
      }
      if (ch === '"') {
        inQuotes = !inQuotes;
        continue;
      }
      if (ch === "\n" && !inQuotes) {
        lines.push(cur);
        cur = "";
        continue;
      }
      cur += ch;
    }
    if (cur.length) lines.push(cur);

    const rows = lines.map((l) =>
      l.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/).map((cell) => cell.replace(/^"|"$/g, "").trim()),
    );
    const headers = rows.length ? rows[0] : [];
    const dataRows = rows.slice(1).map((r) => {
      const obj: Record<string, string> = {};
      headers.forEach((h, idx) => (obj[h] = r[idx] ?? ""));
      return obj;
    });
    return { headers, rows: dataRows };
  };

  return parseCSV(text);
}