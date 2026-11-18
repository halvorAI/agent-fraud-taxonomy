// Draws assets/mandate-splitting.svg: six $495 payments that each pass a $500 per-payment check,
// beside their running total. Run: node scripts/figure.mjs
import { writeFileSync } from 'node:fs';

const W = 960;
const H = 400;
const pay = 495;
const limit = 500;
const n = 6;
const style = `<style>
.bg{fill:#FBF9F4}.t{fill:#1C1C1C;font:600 16px 'IBM Plex Sans',system-ui,-apple-system,'Segoe UI',sans-serif}
.s{fill:#5F5B52;font:400 13px 'IBM Plex Sans',system-ui,-apple-system,'Segoe UI',sans-serif}
.k{fill:#5F5B52;font:600 11px 'IBM Plex Mono',ui-monospace,Menlo,monospace;letter-spacing:.08em}
.bar{fill:#7A766C}.lim{stroke:#B23A26;stroke-width:2;stroke-dasharray:6 5}.limt{fill:#B23A26;font:600 12px 'IBM Plex Sans',system-ui,sans-serif}
.okin{fill:#FBF9F4;font:700 14px system-ui,sans-serif}.ax{stroke:#D9D3C5;stroke-width:1}
.cum{stroke:#4A6100;stroke-width:3;fill:none}.dot{fill:#4A6100}.big{fill:#4A6100;font:700 18px 'IBM Plex Sans',system-ui,sans-serif}
@media (prefers-color-scheme:dark){.bg{fill:#1C1C1C}.t{fill:#F3EFE6}.s,.k{fill:#A39E91}.bar{fill:#A39E91}
.lim{stroke:#F0624D}.limt{fill:#F0624D}.okin{fill:#1C1C1C}.dot,.big{fill:#C6F432}.cum{stroke:#C6F432}.ax{stroke:#3A3A36}}
</style>`;

const parts = [];
const lx = 40;
const ly = 90;
const lw = 400;
const lh = 220;
const base = ly + lh;

// Left: each payment against the per-payment limit.
const scaleL = lh / 600;
parts.push(`<text class="k" x="${lx}" y="44">WHAT A PER-PAYMENT CHECK SEES</text>`);
parts.push(`<text class="s" x="${lx}" y="66">Six payments to one payee, each $5 under the $500 limit</text>`);
parts.push(`<line class="ax" x1="${lx}" y1="${base}" x2="${lx + lw}" y2="${base}"/>`);
const bw = 44;
const step = lw / n;
for (let i = 0; i < n; i++) {
  const x = lx + i * step + (step - bw) / 2;
  const h = pay * scaleL;
  parts.push(`<rect class="bar" x="${x}" y="${base - h}" width="${bw}" height="${h}" rx="3"/>`);
  parts.push(`<text class="okin" x="${x + bw / 2 - 5}" y="${base - h + 24}">✓</text>`);
  parts.push(`<text class="s" x="${x + bw / 2 - 14}" y="${base + 20}">$${pay}</text>`);
}
const limY = base - limit * scaleL;
parts.push(`<line class="lim" x1="${lx}" y1="${limY}" x2="${lx + lw}" y2="${limY}"/>`);
parts.push(`<text class="limt" x="${lx + lw - 140}" y="${limY - 10}">$500 per-payment limit</text>`);

// Right: running total over the hour.
const rx = 520;
const rw = 400;
const scaleR = lh / 3200;
parts.push(`<text class="k" x="${rx}" y="44">WHAT THE AGENT'S HISTORY SHOWS</text>`);
parts.push(`<text class="s" x="${rx}" y="66">Running total to the same payee within one hour</text>`);
parts.push(`<line class="ax" x1="${rx}" y1="${base}" x2="${rx + rw}" y2="${base}"/>`);
let d = `M${rx} ${base}`;
let total = 0;
const dots = [];
for (let i = 0; i < n; i++) {
  const x = rx + (i + 0.5) * (rw / n);
  total += pay;
  const y = base - total * scaleR;
  d += ` H${x} V${y}`;
  dots.push(`<circle class="dot" cx="${x}" cy="${y}" r="4"/>`);
}
d += ` H${rx + rw}`;
parts.push(`<path class="cum" d="${d}"/>`, ...dots);
parts.push(`<text class="big" x="${rx + rw - 150}" y="${base - total * scaleR - 14}">$2,970 in 1 hour</text>`);
parts.push(`<text class="s" x="${rx}" y="${base + 20}">0 min</text>`);
parts.push(`<text class="s" x="${rx + rw - 44}" y="${base + 20}">60 min</text>`);
parts.push(`<text class="t" x="${lx}" y="${H - 30}">Every payment passes. Only the running total shows a $2,970 spend split into six.</text>`);

const alt =
  'AFT-06, mandate splitting. Left: six payments of $495 to one payee, each just under a $500 per-payment limit, so each passes a per-payment check. Right: the running total of the same payments climbs to $2,970 within one hour, which only a view of the agent’s history shows.';
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-labelledby="t d"><title id="t">Mandate splitting: six payments that each pass</title><desc id="d">${alt}</desc>${style}<rect class="bg" width="${W}" height="${H}" rx="14"/>${parts.join('')}</svg>\n`;
writeFileSync(new URL('../assets/mandate-splitting.svg', import.meta.url), svg);
console.log('wrote assets/mandate-splitting.svg');
