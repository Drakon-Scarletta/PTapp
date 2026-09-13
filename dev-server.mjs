// Kleiner Entwicklungsserver für www/ - nur zum Ausprobieren am PC.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('./www', import.meta.url));
const PORT = Number(process.env.PORT || 5173);
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.woff2': 'font/woff2', '.png': 'image/png', '.svg': 'image/svg+xml'
};

// Nur Segmente innerhalb von www/ zulassen.
function safePath(url) {
  const parts = url.split(/[/\\]+/).filter(p => p && p !== '.' && p !== '..');
  return parts.length ? join(...parts) : 'index.html';
}

createServer(async (req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);
  const rel = safePath(url === '/' ? '/index.html' : url);
  try {
    const body = await readFile(join(ROOT, rel));
    res.writeHead(200, {
      'Content-Type': TYPES[extname(rel)] || 'application/octet-stream',
      'Cache-Control': 'no-store'
    });
    res.end(body);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Nicht gefunden: ' + rel);
  }
}).listen(PORT, () => console.log('http://localhost:' + PORT));
