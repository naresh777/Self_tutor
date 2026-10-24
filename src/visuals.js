// Math pictures drawn as SVG from small JSON specs (written by Claude or the offline generators):
// number lines, base-ten blocks, ten frames, strip diagrams, arrays, equal groups, clocks, coins,
// fraction models, bar graphs and place-value charts. Every spec is checked and clamped here,
// so a bad spec draws nothing instead of breaking the page.

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const int = (v, lo, hi) => { const n = Math.round(Number(v)); return Number.isFinite(n) ? Math.max(lo, Math.min(hi, n)) : null; };
const svg = (w, h, body, label) => `<svg class="viz" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label)}" style="max-width:${w}px">${body}</svg>`;
const text = (x, y, t, cls = "", anchor = "middle") => `<text x="${x}" y="${y}" text-anchor="${anchor}" class="${cls}">${esc(t)}</text>`;

/* ---------- number line with jumps ---------- */
// A tick step of 1, 2 or 5 times a power of ten that gives about 10 to 20 ticks.
function niceStep(span) {
  for (let p = 1; ; p *= 10) for (const m of [1, 2, 5]) if (span / (m * p) <= 20) return m * p;
}
function numberline(v) {
  const L = 1000000;
  let start = int(v.start, -L, L), end = int(v.end, -L, L);
  if (start === null || end === null || end <= start) return "";
  const jumps = (Array.isArray(v.jumps) ? v.jumps : []).slice(0, 8).map((j) => ({ from: int(j.from, start, end), to: int(j.to, start, end), label: j.label })).filter((j) => j.from !== null && j.to !== null && j.from !== j.to);
  const marks = (Array.isArray(v.marks) ? v.marks : []).map((m) => int(m, start, end)).filter((m) => m !== null);
  const ask = v.ask == null ? null : int(v.ask, start, end);
  const W = 640, x0 = 30, x1 = W - 30, H = 120, y = 88;
  const X = (n) => x0 + ((n - start) / (end - start)) * (x1 - x0);
  const span = end - start;
  const step = int(v.step, 1, L) && span / int(v.step, 1, L) <= 50 ? int(v.step, 1, L) : niceStep(span);
  let out = `<line x1="${x0 - 12}" y1="${y}" x2="${x1 + 12}" y2="${y}" class="ink" stroke-width="2.5"/><path d="M${x1 + 12} ${y - 6} L${x1 + 22} ${y} L${x1 + 12} ${y + 6}" class="ink" fill="none" stroke-width="2.5"/><path d="M${x0 - 12} ${y - 6} L${x0 - 22} ${y} L${x0 - 12} ${y + 6}" class="ink" fill="none" stroke-width="2.5"/>`;
  // With a "?" point, only the ends (and any labels asked for) get numbers, so the line doesn't give the answer away.
  const labeled = new Set(ask !== null ? [start, end, ...(Array.isArray(v.labels) ? v.labels.map((n) => int(n, start, end)).filter((n) => n !== null) : [])] : [start, end, ...jumps.flatMap((j) => [j.from, j.to]), ...marks]);
  const wide = String(Math.max(Math.abs(start), Math.abs(end))).length > 3;
  for (let n = Math.ceil(start / step) * step; n <= end; n += step) {
    out += `<line x1="${X(n)}" y1="${y - 7}" x2="${X(n)}" y2="${y + 7}" class="ink" stroke-width="1.5"/>`;
    // Number the tick only if no other number sits too close to it.
    const room = [...labeled].every((m) => Math.abs(m - n) >= span * (wide ? 0.14 : 0.06));
    if (ask === null && room && (span / step <= (wide ? 6 : 12) || n % (step * (wide ? 5 : 2)) === 0)) labeled.add(n);
  }
  for (const n of labeled) out += `<line x1="${X(n)}" y1="${y - 9}" x2="${X(n)}" y2="${y + 9}" class="ink" stroke-width="2"/>` + text(X(n), y + 26, n.toLocaleString("en-US"), wide ? "lbl sm" : "lbl");
  jumps.forEach((j, i) => {
    const a = X(j.from), b = X(j.to), up = 26 + (i % 2) * 14, mid = (a + b) / 2;
    const cls = j.to > j.from ? "jump-up" : "jump-down";
    out += `<path d="M${a} ${y - 4} Q${mid} ${y - up * 2} ${b} ${y - 4}" fill="none" class="${cls}" stroke-width="3"/><circle cx="${b}" cy="${y - 4}" r="4" class="${cls}-dot"/>`;
    out += text(mid, y - up - 8, j.label ?? (j.to > j.from ? `+${j.to - j.from}` : `−${j.from - j.to}`), `jl ${cls}-t`);
  });
  for (const m of marks) out += `<circle cx="${X(m)}" cy="${y}" r="7" class="mark"/>`;
  if (ask !== null) out += `<circle cx="${X(ask)}" cy="${y}" r="8" class="mark"/>` + text(X(ask), y - 18, "?", "lbl big");
  return svg(W, H, out, `Number line from ${start} to ${end}`);
}

/* ---------- base-ten blocks (with regrouping for subtraction) ---------- */
function placeParts(n) { return { th: Math.floor(n / 1000), h: Math.floor((n % 1000) / 100), t: Math.floor((n % 100) / 10), o: n % 10 }; }
function drawBlocks(p, x, y, take = { th: 0, h: 0, t: 0, o: 0 }) {
  let out = "", cx = x;
  const cross = (x1, y1, x2, y2) => `<path d="M${x1} ${y1} L${x2} ${y2} M${x2} ${y1} L${x1} ${y2}" class="cross" stroke-width="3"/>`;
  for (let i = 0; i < p.th; i++) { out += `<rect x="${cx}" y="${y}" width="60" height="60" rx="3" class="b-th"/><rect x="${cx + 8}" y="${y - 8}" width="60" height="60" rx="3" class="b-th2"/>` + (i >= p.th - take.th ? cross(cx, y - 8, cx + 68, y + 60) : ""); cx += 80; }
  for (let i = 0; i < p.h; i++) {
    let g = `<rect x="${cx}" y="${y}" width="60" height="60" rx="2" class="b-h"/>`;
    for (let k = 1; k < 10; k++) g += `<line x1="${cx + k * 6}" y1="${y}" x2="${cx + k * 6}" y2="${y + 60}" class="grid"/><line x1="${cx}" y1="${y + k * 6}" x2="${cx + 60}" y2="${y + k * 6}" class="grid"/>`;
    out += g + (i >= p.h - take.h ? cross(cx, y, cx + 60, y + 60) : ""); cx += 68;
  }
  if (p.h || p.th) cx += 8;
  for (let i = 0; i < p.t; i++) {
    let g = `<rect x="${cx}" y="${y}" width="10" height="60" rx="2" class="b-t"/>`;
    for (let k = 1; k < 10; k++) g += `<line x1="${cx}" y1="${y + k * 6}" x2="${cx + 10}" y2="${y + k * 6}" class="grid"/>`;
    out += g + (i >= p.t - take.t ? cross(cx - 2, y, cx + 12, y + 60) : ""); cx += 15;
  }
  if (p.t) cx += 10;
  for (let i = 0; i < p.o; i++) {
    const ox = cx + Math.floor(i / 5) * 14, oy = y + (i % 5) * 12;
    out += `<rect x="${ox}" y="${oy}" width="10" height="10" rx="2" class="b-o"/>` + (i >= p.o - take.o ? cross(ox - 1, oy - 1, ox + 11, oy + 11) : "");
  }
  cx += Math.ceil(p.o / 5) * 14;
  return { out, w: cx - x };
}
function blocks(v) {
  const nums = (Array.isArray(v.numbers) ? v.numbers : [v.number]).map((n) => int(n, 0, 1200)).filter((n) => n !== null).slice(0, 2);
  if (!nums.length) return "";
  const op = v.op === "-" ? "-" : "+";
  let out = "", x = 10, notes = [];
  if (op === "-" && nums.length === 2 && nums[1] <= nums[0]) {
    // Show the first number after any trades, with the taken-away blocks crossed out.
    const a = placeParts(nums[0]), b = placeParts(nums[1]);
    if (a.o < b.o) { a.t--; a.o += 10; notes.push("Trade 1 ten for 10 ones"); }
    if (a.t < b.t || a.t < 0) { a.h--; a.t += 10; notes.push("Trade 1 hundred for 10 tens"); }
    if (a.h < b.h || a.h < 0) { a.th--; a.h += 10; notes.push("Trade 1 thousand for 10 hundreds"); }
    const d = drawBlocks(a, x, 22, b);
    out += d.out; x += d.w;
    out += text(10, 14, `${nums[0]} − ${nums[1]}: cross out ${nums[1]}`, "cap", "start");
    if (notes.length) out += text(10, 104, notes.join(" · "), "cap note", "start");
    return svg(Math.max(240, x + 10), notes.length ? 112 : 96, out, `Base-ten blocks for ${nums[0]} minus ${nums[1]}`);
  }
  nums.forEach((n, i) => {
    const d = drawBlocks(placeParts(n), x, 22);
    out += d.out + text(x + d.w / 2, 100, n, "lbl");
    x += d.w + 16;
    if (i === 0 && nums.length > 1) { out += text(x + 4, 58, op === "-" ? "−" : "+", "op"); x += 28; }
  });
  return svg(Math.max(160, x), 108, out, `Base-ten blocks for ${nums.join(op === "-" ? " minus " : " plus ")}`);
}

/* ---------- ten frames ---------- */
function tenframe(v) {
  const filled = int(v.filled, 0, 20) ?? 0, total = filled > 10 || int(v.total, 10, 20) === 20 ? 20 : 10;
  const extra = int(v.added, 0, 20 - filled) ?? 0, crossed = int(v.crossed, 0, filled) ?? 0;
  let out = "";
  for (let f = 0; f < total / 10; f++)
    for (let i = 0; i < 10; i++) {
      const x = 10 + f * 220 + (i % 5) * 40, y = 10 + Math.floor(i / 5) * 40, k = f * 10 + i;
      out += `<rect x="${x}" y="${y}" width="40" height="40" class="cell"/>`;
      if (k < filled) out += `<circle cx="${x + 20}" cy="${y + 20}" r="14" class="ctr"/>` + (k >= filled - crossed ? `<path d="M${x + 8} ${y + 8} L${x + 32} ${y + 32} M${x + 32} ${y + 8} L${x + 8} ${y + 32}" class="cross" stroke-width="3"/>` : "");
      else if (k < filled + extra) out += `<circle cx="${x + 20}" cy="${y + 20}" r="14" class="ctr2"/>`;
    }
  return svg(total === 20 ? 440 : 220, 100, out, `Ten frame with ${filled} counters`);
}

/* ---------- strip diagram (bar model) ---------- */
function strip(v) {
  const parts = (Array.isArray(v.parts) ? v.parts : []).slice(0, 5).map((p) => (p === "?" ? "?" : int(p, 0, 100000))).filter((p) => p !== null);
  if (!parts.length) return "";
  const total = v.total === "?" ? "?" : int(v.total, 0, 100000);
  const known = parts.filter((p) => p !== "?");
  const sumKnown = known.reduce((a, b) => a + b, 0);
  const whole = typeof total === "number" ? total : sumKnown + (parts.includes("?") ? Math.max(1, sumKnown / known.length || 1) : 0);
  const unknownSize = Math.max(whole - sumKnown, whole * 0.15) / Math.max(1, parts.filter((p) => p === "?").length);
  const sizes = parts.map((p) => (p === "?" ? unknownSize : Math.max(p, whole * 0.08)));
  const sum = sizes.reduce((a, b) => a + b, 0);
  const W = 560, x0 = 10;
  let x = x0, out = "";
  parts.forEach((p, i) => {
    const w = (sizes[i] / sum) * (W - 20);
    out += `<rect x="${x}" y="46" width="${w}" height="44" class="${p === "?" ? "part-q" : i % 2 ? "part2" : "part1"}"/>` + text(x + w / 2, 75, p, "lbl big");
    x += w;
  });
  out += `<path d="M${x0} 34 L${x0} 26 L${W - 10} 26 L${W - 10} 34" fill="none" class="ink" stroke-width="2"/>` + text(W / 2, 18, total ?? "", "lbl big");
  return svg(W, 100, out, "Strip diagram");
}

/* ---------- arrays and equal groups ---------- */
function array(v) {
  const r = int(v.rows, 1, 12), c = int(v.cols, 1, 12);
  if (!r || !c) return "";
  let out = "";
  for (let i = 0; i < r; i++) for (let j = 0; j < c; j++) out += `<circle cx="${20 + j * 28}" cy="${20 + i * 28}" r="10" class="ctr"/>`;
  out += text(20 + c * 28, 20 + (r - 1) * 14 + 4, `${r} rows of ${c}`, "cap", "start");
  return svg(40 + c * 28 + 110, 16 + r * 28, out, `Array with ${r} rows of ${c}`);
}
function groups(v) {
  const g = int(v.groups, 1, 10), e = int(v.each, 0, 12);
  if (!g || e === null) return "";
  const cols = Math.min(g, 5), R = 44;
  let out = "";
  for (let i = 0; i < g; i++) {
    const cx = 54 + (i % cols) * 108, cy = 54 + Math.floor(i / cols) * 108;
    out += `<circle cx="${cx}" cy="${cy}" r="${R}" class="grp"/>`;
    for (let k = 0; k < e; k++) { const a = (k / Math.max(1, e)) * Math.PI * 2, rr = e === 1 ? 0 : 24; out += `<circle cx="${cx + Math.cos(a) * rr}" cy="${cy + Math.sin(a) * rr}" r="7" class="ctr"/>`; }
  }
  return svg(cols * 108, Math.ceil(g / cols) * 108, out, `${g} groups of ${e}`);
}

/* ---------- clock ---------- */
function clock(v) {
  const h = int(v.hour, 1, 12), m = int(v.minute, 0, 59);
  if (h === null || m === null) return "";
  let out = `<circle cx="80" cy="80" r="72" class="face"/>`;
  for (let i = 1; i <= 12; i++) { const a = (i / 12) * Math.PI * 2 - Math.PI / 2; out += text(80 + Math.cos(a) * 56, 80 + Math.sin(a) * 56 + 6, i, "lbl"); }
  for (let i = 0; i < 60; i++) { const a = (i / 60) * Math.PI * 2, r1 = i % 5 ? 67 : 63; out += `<line x1="${80 + Math.sin(a) * r1}" y1="${80 - Math.cos(a) * r1}" x2="${80 + Math.sin(a) * 71}" y2="${80 - Math.cos(a) * 71}" class="ink" stroke-width="${i % 5 ? 1 : 2}"/>`; }
  const ma = (m / 60) * Math.PI * 2, ha = (((h % 12) + m / 60) / 12) * Math.PI * 2;
  out += `<line x1="80" y1="80" x2="${80 + Math.sin(ha) * 36}" y2="${80 - Math.cos(ha) * 36}" class="hand-h" stroke-width="6" stroke-linecap="round"/><line x1="80" y1="80" x2="${80 + Math.sin(ma) * 54}" y2="${80 - Math.cos(ma) * 54}" class="hand-m" stroke-width="4" stroke-linecap="round"/><circle cx="80" cy="80" r="5" class="ink-fill"/>`;
  return svg(160, 160, out, "Clock");
}

/* ---------- coins and bills ---------- */
const COINS = { dollar: [100, "$1", 0], quarter: [25, "25¢", 25], half: [50, "50¢", 28], dime: [10, "10¢", 17], nickel: [5, "5¢", 20], penny: [1, "1¢", 18] };
function coins(v) {
  const list = [];
  for (const [k, [, label, r]] of Object.entries(COINS)) for (let i = 0; i < (int(v[k] ?? v[k + "s"] ?? (k === "penny" ? v.pennies : undefined), 0, 12) || 0); i++) list.push({ k, label, r });
  if (!list.length || list.length > 24) return "";
  let x = 10, y = 10, out = "", rowH = 0, maxX = 0;
  for (const c of list) {
    const w = c.k === "dollar" ? 110 : c.r * 2;
    if (x + w > 600) { x = 10; y += rowH + 10; rowH = 0; }
    if (c.k === "dollar") out += `<rect x="${x}" y="${y}" width="110" height="52" rx="5" class="bill"/>` + text(x + 55, y + 33, "$1", "lbl big");
    else out += `<circle cx="${x + c.r}" cy="${y + 26}" r="${c.r}" class="coin coin-${c.k}"/>` + text(x + c.r, y + 31, c.label, "lbl sm");
    x += w + 10; rowH = Math.max(rowH, 52); maxX = Math.max(maxX, x);
  }
  return svg(maxX, y + rowH + 10, out, "Coins");
}

/* ---------- fraction models ---------- */
function fraction(v) {
  const n = int(v.parts, 1, 12), s = int(v.shaded, 0, 12 * 3);
  if (!n || s === null) return "";
  const wholes = Math.max(1, Math.min(3, Math.ceil(s / n) || 1));
  let out = "";
  for (let w = 0; w < wholes; w++) {
    const shadedHere = Math.max(0, Math.min(n, s - w * n));
    if (v.shape === "circle") {
      const cx = 70 + w * 150, cy = 70, r = 60;
      for (let i = 0; i < n; i++) {
        const a1 = (i / n) * Math.PI * 2 - Math.PI / 2, a2 = ((i + 1) / n) * Math.PI * 2 - Math.PI / 2;
        out += n === 1 ? `<circle cx="${cx}" cy="${cy}" r="${r}" class="${i < shadedHere ? "fr-on" : "fr-off"}"/>` : `<path d="M${cx} ${cy} L${cx + Math.cos(a1) * r} ${cy + Math.sin(a1) * r} A${r} ${r} 0 ${n === 2 ? 0 : 0} 1 ${cx + Math.cos(a2) * r} ${cy + Math.sin(a2) * r} Z" class="${i < shadedHere ? "fr-on" : "fr-off"}"/>`;
      }
    } else {
      const W = 300, x0 = 10, y0 = 10 + w * 60;
      for (let i = 0; i < n; i++) out += `<rect x="${x0 + (i * W) / n}" y="${y0}" width="${W / n}" height="44" class="${i < shadedHere ? "fr-on" : "fr-off"}"/>`;
    }
  }
  return v.shape === "circle" ? svg(wholes * 150, 140, out, `${s} of ${n} equal parts shaded`) : svg(320, wholes * 60 + 4, out, `${s} of ${n} equal parts shaded`);
}

/* ---------- bar graph and pictograph ---------- */
function graph(v) {
  const labels = (Array.isArray(v.labels) ? v.labels : []).slice(0, 6).map(String);
  const vals = (Array.isArray(v.values) ? v.values : []).slice(0, labels.length).map((x) => int(x, 0, 1000) ?? 0);
  if (!labels.length || vals.length !== labels.length) return "";
  const W = 520, H = 240, x0 = 50, y0 = 200, max = Math.max(...vals, 1), step = int(v.step, 1, 100) || (max <= 10 ? 1 : max <= 20 ? 2 : max <= 50 ? 5 : 10);
  const top = Math.ceil(max / step) * step, Y = (n) => y0 - (n / top) * 160, bw = (W - x0 - 20) / labels.length;
  let out = v.title ? text(W / 2, 18, v.title, "lbl") : "";
  // A pictograph is read by counting pictures with the key, so it gets no number scale.
  if (v.kind !== "pictograph" && v.kind !== "dot") for (let n = 0; n <= top; n += step) out += `<line x1="${x0}" y1="${Y(n)}" x2="${W - 10}" y2="${Y(n)}" class="grid"/>` + text(x0 - 8, Y(n) + 4, n, "lbl sm", "end");
  if (v.kind === "dot") {
    labels.forEach((l, i) => {
      for (let k = 0; k < vals[i] && k < 12; k++) out += text(x0 + i * bw + bw / 2, y0 - 6 - k * 15, "×", "lbl dotx");
      out += text(x0 + i * bw + bw / 2, y0 + 20, l, "lbl sm");
    });
  } else if (v.kind === "pictograph") {
    labels.forEach((l, i) => {
      const per = int(v.key, 1, 10) || 1;
      for (let k = 0; k < Math.round(vals[i] / per) && k < 12; k++) out += `<circle cx="${x0 + i * bw + bw / 2}" cy="${y0 - 10 - k * 15}" r="6" class="ctr"/>`;
      out += text(x0 + i * bw + bw / 2, y0 + 20, l, "lbl sm");
    });
    if (int(v.key, 1, 10) > 1) out += text(W - 10, 36, `Each ● = ${int(v.key, 1, 10)}`, "cap", "end");
  } else {
    labels.forEach((l, i) => { out += `<rect x="${x0 + i * bw + bw * 0.2}" y="${Y(vals[i])}" width="${bw * 0.6}" height="${y0 - Y(vals[i])}" class="${i % 2 ? "part2" : "part1"}"/>` + text(x0 + i * bw + bw / 2, y0 + 20, l, "lbl sm"); });
  }
  out += `<line x1="${x0}" y1="${y0}" x2="${W - 10}" y2="${y0}" class="ink" stroke-width="2"/>${v.kind === "pictograph" || v.kind === "dot" ? "" : `<line x1="${x0}" y1="${y0}" x2="${x0}" y2="30" class="ink" stroke-width="2"/>`}`;
  return svg(W, H, out, v.title || "Graph");
}

/* ---------- place value chart ---------- */
function placevalue(v) {
  const n = int(v.number, 0, 999999);
  if (n === null) return "";
  const names = ["hundred thousands", "ten thousands", "thousands", "hundreds", "tens", "ones"];
  const digits = String(n).padStart(6, "0").split("");
  const first = Math.min(digits.findIndex((d) => d !== "0"), 3);
  const cols = names.slice(first === -1 ? 3 : first), ds = digits.slice(first === -1 ? 3 : first);
  const cw = 96;
  let out = "";
  cols.forEach((c, i) => { out += `<rect x="${10 + i * cw}" y="10" width="${cw}" height="34" class="pv-h"/>` + text(10 + i * cw + cw / 2, 32, c, "lbl sm") + `<rect x="${10 + i * cw}" y="44" width="${cw}" height="52" class="cell"/>` + text(10 + i * cw + cw / 2, 80, ds[i], "lbl big"); });
  return svg(20 + cols.length * cw, 106, out, `Place value chart for ${n}`);
}

/* ---------- ruler with an object to measure ---------- */
function ruler(v) {
  const max = int(v.max, 3, 15) ?? 12, len = Math.max(0.5, Math.min(max, Number(v.length) || 0)), from = Math.max(0, Math.min(max - len, Number(v.start) || 0));
  if (!len) return "";
  const W = 620, x0 = 20, u = (W - 40) / max, y = 70;
  const X = (n) => x0 + n * u;
  let out = `<rect x="${x0 - 8}" y="${y}" width="${max * u + 16}" height="46" rx="4" class="rulerbody"/>`;
  for (let i = 0; i <= max * 2; i++) {
    const n = i / 2, big = i % 2 === 0;
    out += `<line x1="${X(n)}" y1="${y}" x2="${X(n)}" y2="${y + (big ? 18 : 10)}" class="ink" stroke-width="${big ? 2 : 1}"/>`;
    if (big) out += text(X(n), y + 36, n, "lbl sm");
  }
  const thing = v.object === "ribbon" || v.object === "worm" || v.object === "crayon" ? v.object : "pencil";
  const x1 = X(from), x2 = X(from + len);
  out += thing === "pencil"
    ? `<rect x="${x1}" y="28" width="${Math.max(4, x2 - x1 - 18)}" height="22" rx="3" class="pencil"/><path d="M${x2 - 18} 28 L${x2} 39 L${x2 - 18} 50 Z" class="pencil-tip"/>`
    : `<rect x="${x1}" y="30" width="${x2 - x1}" height="18" rx="9" class="${thing === "worm" ? "worm" : "ribbon"}"/>`;
  out += `<line x1="${x1}" y1="54" x2="${x1}" y2="${y}" class="guide"/><line x1="${x2}" y1="54" x2="${x2}" y2="${y}" class="guide"/>`;
  out += text(W - 16, 18, v.unit === "cm" ? "centimeters" : "inches", "cap", "end");
  return svg(W, 126, out, `A ruler measuring a ${thing}`);
}

/* ---------- unit squares, rectangles and L-shapes for area and perimeter ---------- */
function area(v) {
  const r = int(v.rows, 1, 12), c = int(v.cols, 1, 14);
  if (!r || !c) return "";
  const cut = v.cut ? { r: int(v.cut.rows, 0, r - 1) ?? 0, c: int(v.cut.cols, 0, c - 1) ?? 0 } : { r: 0, c: 0 };
  const u = Math.min(40, Math.floor(460 / c)), x0 = 50, y0 = 30, grid = v.grid !== false;
  const inside = (i, j) => !(i < cut.r && j >= c - cut.c);
  let out = "";
  for (let i = 0; i < r; i++) for (let j = 0; j < c; j++) if (inside(i, j)) out += `<rect x="${x0 + j * u}" y="${y0 + i * u}" width="${u}" height="${u}" class="${grid ? "sq" : "sq-plain"}"/>`;
  const W = c * u, H = r * u, cw = cut.c * u, ch = cut.r * u;
  const outline = cut.r && cut.c
    ? `M${x0} ${y0} L${x0 + W - cw} ${y0} L${x0 + W - cw} ${y0 + ch} L${x0 + W} ${y0 + ch} L${x0 + W} ${y0 + H} L${x0} ${y0 + H} Z`
    : `M${x0} ${y0} L${x0 + W} ${y0} L${x0 + W} ${y0 + H} L${x0} ${y0 + H} Z`;
  out += `<path d="${outline}" class="ink" fill="none" stroke-width="3"/>`;
  if (v.labels) {
    const unit = v.unit ? " " + String(v.unit).slice(0, 3) : "";
    const lab = (n) => (v.hide === n ? "?" : `${n}${unit}`);
    out += text(x0 + (W - cw) / 2, y0 - 8, lab(c - cut.c), "lbl") + text(x0 - 8, y0 + H / 2 + 6, lab(r), "lbl", "end");
    out += text(x0 + W / 2, y0 + H + 24, lab(c), "lbl");
    if (cut.r && cut.c) out += text(x0 + W + 8, y0 + ch + (H - ch) / 2 + 6, lab(r - cut.r), "lbl", "start");
    else out += text(x0 + W + 8, y0 + H / 2 + 6, lab(r), "lbl", "start");
  }
  return svg(x0 + W + 70, y0 + H + 34, out, grid ? `Shape made of unit squares` : `Rectangle`);
}

/* ---------- flat shapes ---------- */
function polygon(v) {
  const kind = String(v.kind || ""), n = int(v.sides, 3, 10);
  const pts = {
    square: [[0, 0], [1, 0], [1, 1], [0, 1]],
    rectangle: [[0, 0.15], [1.4, 0.15], [1.4, 0.95], [0, 0.95]],
    rhombus: [[0.6, 0], [1.2, 0.5], [0.6, 1], [0, 0.5]],
    parallelogram: [[0.3, 0.1], [1.4, 0.1], [1.1, 0.9], [0, 0.9]],
    trapezoid: [[0.35, 0.1], [1.05, 0.1], [1.4, 0.9], [0, 0.9]],
    kite: [[0.6, 0], [1.05, 0.35], [0.6, 1], [0.15, 0.35]],
  }[kind] || (n ? Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2 - Math.PI / 2 + (n % 2 ? 0 : Math.PI / n); return [0.6 + 0.6 * Math.cos(a), 0.55 + 0.5 * Math.sin(a)]; }) : null);
  if (kind === "circle") return svg(260, 200, `<circle cx="110" cy="100" r="78" class="shape"/>`, "circle");
  if (!pts) return "";
  const S = 150, P = pts.map(([x, y]) => [20 + x * S, 20 + y * S]);
  let out = `<polygon points="${P.map((p) => p.join(",")).join(" ")}" class="shape"/>`;
  if (v.dots) out += P.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6" class="mark"/>`).join("");
  return svg(260, 200, out, kind || `${n}-sided shape`);
}

/* ---------- solid shapes ---------- */
function solid(v) {
  const k = String(v.kind || "");
  const D = {
    cube: `<path d="M40 70 L120 70 L120 150 L40 150 Z" class="shape"/><path d="M40 70 L75 40 L155 40 L120 70 Z" class="shape2"/><path d="M120 70 L155 40 L155 120 L120 150 Z" class="shape3"/>`,
    prism: `<path d="M30 80 L160 80 L160 150 L30 150 Z" class="shape"/><path d="M30 80 L65 50 L195 50 L160 80 Z" class="shape2"/><path d="M160 80 L195 50 L195 120 L160 150 Z" class="shape3"/>`,
    cylinder: `<path d="M50 50 L50 140 A55 18 0 0 0 160 140 L160 50" class="shape"/><ellipse cx="105" cy="50" rx="55" ry="18" class="shape2"/>`,
    cone: `<path d="M105 25 L50 140 A55 18 0 0 0 160 140 Z" class="shape"/><path d="M50 140 A55 18 0 0 1 160 140" class="dash" fill="none"/>`,
    sphere: `<circle cx="105" cy="90" r="65" class="shape"/><ellipse cx="105" cy="90" rx="65" ry="18" class="dash" fill="none"/>`,
    pyramid: `<path d="M105 25 L40 140 L130 160 Z" class="shape"/><path d="M105 25 L130 160 L175 130 Z" class="shape3"/>`,
  }[k];
  return D ? svg(210, 180, D, k) : "";
}

/* ---------- fractions on a number line ---------- */
function fractionline(v) {
  const n = int(v.parts, 2, 12), wholes = int(v.wholes, 1, 3) ?? 1;
  if (!n) return "";
  const at = v.at == null ? null : int(v.at, 0, n * wholes);
  const W = 620, x0 = 30, x1 = W - 30, y = 70, X = (k) => x0 + (k / (n * wholes)) * (x1 - x0);
  let out = `<line x1="${x0}" y1="${y}" x2="${x1}" y2="${y}" class="ink" stroke-width="2.5"/>`;
  for (let k = 0; k <= n * wholes; k++) {
    const whole = k % n === 0;
    out += `<line x1="${X(k)}" y1="${y - (whole ? 12 : 8)}" x2="${X(k)}" y2="${y + (whole ? 12 : 8)}" class="ink" stroke-width="${whole ? 2.5 : 1.5}"/>`;
    if (whole) out += text(X(k), y + 34, k / n, "lbl big");
    else if (v.label_all) out += text(X(k), y + 32, `${k}/${n}`, "lbl sm");
  }
  if (at !== null) out += `<circle cx="${X(at)}" cy="${y}" r="8" class="mark"/>` + text(X(at), y - 20, v.ask ? "?" : `${at}/${n}`, "lbl big");
  return svg(W, 112, out, `Number line from 0 to ${wholes} in ${n} equal parts`);
}

/* ---------- small tables (frequency tables, input-output tables) ---------- */
function table(v) {
  const rows = (Array.isArray(v.rows) ? v.rows : []).slice(0, 8).map((r) => (Array.isArray(r) ? r.slice(0, 7).map((c) => String(c ?? "")) : []));
  if (rows.length < 2 || !rows[0].length) return "";
  const cols = rows[0].length, cw = Math.min(150, Math.floor(600 / cols)), rh = 38;
  let out = "";
  rows.forEach((r, i) => r.forEach((c, j) => { out += `<rect x="${10 + j * cw}" y="${10 + i * rh}" width="${cw}" height="${rh}" class="${i === 0 ? "pv-h" : "cell"}"/>` + text(10 + j * cw + cw / 2, 10 + i * rh + 25, c, i === 0 ? "lbl sm" : "lbl"); }));
  return svg(20 + cols * cw, 20 + rows.length * rh, out, v.title || "Table");
}

/* ---------- pictures of things to count (emoji in rows of five) ---------- */
const emo = (e) => String(e ?? "").slice(0, 8);
function objects(v) {
  const gs = (Array.isArray(v.groups) ? v.groups : []).slice(0, 3).map((g) => ({ e: emo(g.emoji) || "●", n: int(g.n, 0, 20) ?? 0, x: int(g.crossed, 0, 20) ?? 0 }));
  if (!gs.length || !gs.some((g) => g.n)) return "";
  const per = 5, u = 44, gap = gs.length > 1 ? 44 : 0;
  let x = 10, out = "", H = 0;
  gs.forEach((g, gi) => {
    const cols = Math.min(per, Math.max(1, g.n)), rows = Math.ceil(g.n / per);
    for (let k = 0; k < g.n; k++) {
      const cx = x + (k % per) * u + u / 2, cy = 10 + Math.floor(k / per) * u + u / 2;
      out += text(cx, cy + 12, g.e, "emo");
      if (k >= g.n - g.x) out += `<path d="M${cx - 16} ${cy - 16} L${cx + 16} ${cy + 16} M${cx + 16} ${cy - 16} L${cx - 16} ${cy + 16}" class="cross" stroke-width="4"/>`;
    }
    H = Math.max(H, rows * u);
    x += cols * u;
    if (gi < gs.length - 1) { if (v.op) out += text(x + gap / 2, 10 + u / 2 + 10, v.op === "-" ? "−" : String(v.op).slice(0, 1), "op"); x += gap; }
  });
  return svg(x + 10, H + 20, out, gs.map((g) => `${g.n} ${g.e}`).join(" and "));
}

/* ---------- comparing lengths, with optional unit cubes ---------- */
function lengths(v) {
  const items = (Array.isArray(v.items) ? v.items : []).slice(0, 4).map((t) => ({ l: String(t.label ?? "").slice(0, 12), n: int(t.len, 1, 15) ?? 0 })).filter((t) => t.n);
  if (!items.length) return "";
  const max = Math.max(...items.map((t) => t.n)), lw = 90, u = Math.min(40, Math.floor(440 / max)), rh = 56;
  let out = "";
  items.forEach((t, i) => {
    const y = 10 + i * rh;
    out += /^[A-Za-z]/.test(t.l) ? text(lw - 10, y + 30, t.l, "lbl", "end") : text(lw - 12, y + 34, t.l, "emo sm", "end") + `<rect x="${lw}" y="${y + 10}" width="${t.n * u}" height="28" rx="6" class="${i % 2 ? "part2" : "part1"}"/>`;
    if (v.units) for (let k = 0; k < t.n; k++) out += `<rect x="${lw + k * u + 2}" y="${y + 40}" width="${u - 4}" height="12" rx="2" class="b-t"/>`;
  });
  out += `<line x1="${lw}" y1="4" x2="${lw}" y2="${items.length * rh + 10}" class="guide"/>`;
  return svg(lw + max * u + 20, items.length * rh + 16, out, "Lengths to compare");
}

/* ---------- hundred chart with hidden or shaded numbers ---------- */
function hundred(v) {
  const start = int(v.start, 1, 111) ?? 1, rows = int(v.rows, 1, 10) ?? 10;
  const ask = new Set((Array.isArray(v.ask) ? v.ask : []).map(Number)), shade = new Set((Array.isArray(v.shade) ? v.shade : []).map(Number));
  const c = 44;
  let out = "";
  for (let i = 0; i < rows * 10; i++) {
    const n = start + i, x = 10 + (i % 10) * c, y = 10 + Math.floor(i / 10) * c;
    if (n > 120) break;
    out += `<rect x="${x}" y="${y}" width="${c}" height="${c}" class="${ask.has(n) ? "part-q" : shade.has(n) ? "part2" : "cell"}"/>` + text(x + c / 2, y + 28, ask.has(n) ? "?" : n, ask.has(n) ? "lbl big" : "lbl sm");
  }
  return svg(20 + 10 * c, 20 + rows * c, out, "Hundred chart");
}

/* ---------- tally chart ---------- */
function tally(v) {
  const labels = (Array.isArray(v.labels) ? v.labels : []).slice(0, 5).map(String);
  const vals = (Array.isArray(v.values) ? v.values : []).slice(0, labels.length).map((x) => int(x, 0, 20) ?? 0);
  if (!labels.length || vals.length !== labels.length) return "";
  const rh = 46, y0 = v.title ? 34 : 10;
  let out = v.title ? text(200, 22, v.title, "lbl") : "";
  labels.forEach((l, i) => {
    const y = y0 + i * rh;
    out += `<rect x="10" y="${y}" width="130" height="${rh}" class="pv-h"/><rect x="140" y="${y}" width="260" height="${rh}" class="cell"/>` + text(75, y + 29, l, "lbl sm");
    for (let k = 0; k < vals[i]; k++) {
      const grp = Math.floor(k / 5), j = k % 5, gx = 156 + grp * 52;
      out += j < 4 ? `<line x1="${gx + j * 9}" y1="${y + 10}" x2="${gx + j * 9}" y2="${y + 36}" class="ink" stroke-width="3"/>` : `<line x1="${gx - 5}" y1="${y + 32}" x2="${gx + 33}" y2="${y + 14}" class="ink" stroke-width="3"/>`;
    }
  });
  return svg(410, y0 + labels.length * rh + 10, out, v.title || "Tally chart");
}

/* ---------- where one thing is next to another ---------- */
function position(v) {
  const where = { above: [0, -1], below: [0, 1], beside: [1, 0], "next to": [1, 0], left: [-1, 0], right: [1, 0] }[v.where];
  if (!where) return "";
  const cx = 150, cy = 110, d = 78;
  const out = text(cx, cy + 22, emo(v.ref) || "📦", "emo big") + text(cx + where[0] * d, cy + where[1] * d + 14, emo(v.thing) || "⚽", "emo");
  return svg(300, 220, out, `One thing ${v.where} another`);
}

/* ---------- an angle with its arc, labelled in degrees or with "?" ---------- */
function angle(v) {
  const d = int(v.deg, 1, 359);
  if (!d) return "";
  const parts = (Array.isArray(v.split) ? v.split : []).map((x) => int(x, 1, 359)).filter(Boolean);
  const cx = 150, cy = 150, R = 120, P = (a, r = R) => [cx + r * Math.cos((-a * Math.PI) / 180), cy + r * Math.sin((-a * Math.PI) / 180)];
  const ray = (a) => { const [x, y] = P(a); return `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" class="ink" stroke-width="3"/><circle cx="${x}" cy="${y}" r="4" class="ink-fill"/>`; };
  const arc = (a1, a2, r, cls) => { const [x1, y1] = P(a1, r), [x2, y2] = P(a2, r); return `<path d="M${x1} ${y1} A${r} ${r} 0 ${a2 - a1 > 180 ? 1 : 0} 0 ${x2} ${y2}" fill="none" class="${cls}" stroke-width="2.5"/>`; };
  let out = ray(0) + ray(d), at = 0;
  if (parts.length > 1 && parts.reduce((a, b) => a + b, 0) === d) {
    parts.forEach((p, i) => { if (i) out += ray(at); out += arc(at, at + p, 40 + i * 14, i % 2 ? "jump-down" : "jump-up"); const [tx, ty] = P(at + p / 2, 78 + i * 14); out += text(tx, ty + 6, v.ask === i ? "?" : `${p}°`, "lbl sm"); at += p; });
  } else {
    out += d === 90 ? `<path d="M${cx + 22} ${cy} L${cx + 22} ${cy - 22} L${cx} ${cy - 22}" fill="none" class="ink" stroke-width="2"/>` : arc(0, d, 40, "jump-up");
    const [tx, ty] = P(d / 2, 68);
    if (v.label !== false) out += text(tx, ty + 6, v.ask ? "?" : `${d}°`, "lbl");
  }
  out += `<circle cx="${cx}" cy="${cy}" r="4" class="ink-fill"/>`;
  return svg(300, d > 180 ? 290 : 170, out, `An angle of ${v.ask ? "unknown size" : d + " degrees"}`);
}

/* ---------- coordinate grid with points (first quadrant or all four) ---------- */
function coord(v) {
  const lo = int(v.min, -10, 0) ?? 0, hi = int(v.max, 1, 12) ?? 10, n = hi - lo, u = Math.floor(300 / n), x0 = 30, y0 = 20;
  const X = (x) => x0 + (x - lo) * u, Y = (y) => y0 + (hi - y) * u;
  let out = "";
  for (let i = lo; i <= hi; i++) {
    out += `<line x1="${X(i)}" y1="${Y(lo)}" x2="${X(i)}" y2="${Y(hi)}" class="grid"/><line x1="${X(lo)}" y1="${Y(i)}" x2="${X(hi)}" y2="${Y(i)}" class="grid"/>`;
    if (i !== 0 || lo === 0) out += text(X(i), Y(Math.max(lo, 0)) + 16, i, "lbl sm") + (i ? text(X(Math.max(lo, 0)) - 6, Y(i) + 5, i, "lbl sm", "end") : "");
  }
  out += `<line x1="${X(lo)}" y1="${Y(0)}" x2="${X(hi)}" y2="${Y(0)}" class="ink" stroke-width="2"/><line x1="${X(0)}" y1="${Y(lo)}" x2="${X(0)}" y2="${Y(hi)}" class="ink" stroke-width="2"/>`;
  const pts = (Array.isArray(v.points) ? v.points : []).slice(0, 8).map((p) => ({ x: Number(p.x), y: Number(p.y), l: String(p.label ?? "").slice(0, 3) })).filter((p) => p.x >= lo && p.x <= hi && p.y >= lo && p.y <= hi);
  if (v.line && pts.length > 1) out += `<polyline points="${pts.map((p) => `${X(p.x)},${Y(p.y)}`).join(" ")}" fill="none" class="jump-up" stroke-width="2.5"/>`;
  if (v.shape && pts.length > 2) out += `<polygon points="${pts.map((p) => `${X(p.x)},${Y(p.y)}`).join(" ")}" class="part1"/>`;
  pts.forEach((p) => { out += `<circle cx="${X(p.x)}" cy="${Y(p.y)}" r="6" class="mark"/>` + (p.l ? text(X(p.x) + 9, Y(p.y) - 8, p.l, "lbl", "start") : ""); });
  return svg(x0 + n * u + 30, y0 + n * u + 30, out, "Coordinate grid");
}

/* ---------- a box made of unit cubes, for volume ---------- */
function cubes(v) {
  const l = int(v.l, 1, 10), w = int(v.w, 1, 6), h = int(v.h, 1, 8);
  if (!l || !w || !h) return "";
  const u = Math.min(34, Math.floor(300 / (l + w * 0.6))), dx = u * 0.5, dy = u * 0.4, x0 = 10, y0 = 10 + w * dy;
  let out = "";
  for (let i = 0; i < h; i++) for (let j = 0; j < l; j++) out += `<rect x="${x0 + j * u}" y="${y0 + i * u}" width="${u}" height="${u}" class="part1"/>`;
  for (let k = 0; k < w; k++) for (let j = 0; j < l; j++) { const x = x0 + j * u + (w - k - 1) * dx, y = y0 - (w - k) * dy; out += `<path d="M${x} ${y + dy} L${x + dx} ${y} L${x + dx + u} ${y} L${x + u} ${y + dy} Z" class="part2"/>`; }
  for (let k = 0; k < w; k++) for (let i = 0; i < h; i++) { const x = x0 + l * u + k * dx, y = y0 + i * u - k * dy; out += `<path d="M${x} ${y} L${x + dx} ${y - dy} L${x + dx} ${y - dy + u} L${x} ${y + u} Z" class="b-h"/>`; }
  if (v.labels) out += text(x0 + (l * u) / 2, y0 + h * u + 22, v.hide === "l" ? "?" : `${l}${v.unit ? " " + String(v.unit).slice(0, 3) : ""}`, "lbl") + text(x0 + l * u + w * dx + 8, y0 + (h * u) / 2 - (w * dy) / 2, v.hide === "h" ? "?" : `${h}`, "lbl", "start") + text(x0 + l * u + (w * dx) / 2 + 10, y0 + h * u - (w * dy) / 2 + 22, v.hide === "w" ? "?" : `${w}`, "lbl sm", "start");
  return svg(x0 + l * u + w * dx + 50, y0 + h * u + 34, out, `A box ${l} by ${w} by ${h} unit cubes`);
}

const DRAW = { angle, coord, cubes, objects, lengths, hundred, tally, position, ruler, area, polygon, solid, fractionline, table, numberline, blocks, tenframe, strip, bar: strip, barmodel: strip, array, groups, clock, coins, fraction, graph, placevalue };

export function renderVisual(v) {
  if (!v || typeof v !== "object" || !DRAW[v.type]) return "";
  try {
    const s = DRAW[v.type](v);
    return s ? `<figure class="vizbox">${s}${v.caption ? `<figcaption>${esc(v.caption)}</figcaption>` : ""}</figure>` : "";
  } catch {
    return "";
  }
}

export const VISUAL_TYPES = Object.keys(DRAW);
