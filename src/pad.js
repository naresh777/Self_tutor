// Scratch pad: a finger / stylus / mouse drawing area for working problems out.
// The canvas lives outside the re-rendered HTML so drawings survive re-renders
// (checking an answer, opening a hint). It is wiped when the problem changes.

let wrap = null, canvas = null, ctx = null, key = null, mode = "pen";
let drawing = false, last = null;

const ink = () => getComputedStyle(document.documentElement).getPropertyValue("--ink").trim() || "#1d2a44";

function build() {
  wrap = document.createElement("div");
  wrap.className = "pad";
  wrap.innerHTML = `<div class="padtools" role="group" aria-label="Scratch pad tools">
      <button type="button" class="btn sel" data-pad="pen" aria-pressed="true">Pencil</button>
      <button type="button" class="btn" data-pad="eraser" aria-pressed="false">Eraser</button>
      <button type="button" class="btn ghost" data-pad="clear">Clear</button>
    </div>
    <canvas aria-label="Scratch pad. Draw here with your finger, a stylus or the mouse."></canvas>`;
  canvas = wrap.querySelector("canvas");
  ctx = canvas.getContext("2d");

  wrap.querySelectorAll("[data-pad]").forEach((b) => b.addEventListener("click", () => {
    const m = b.dataset.pad;
    if (m === "clear") { clear(); return; }
    mode = m;
    wrap.querySelectorAll("[data-pad=pen],[data-pad=eraser]").forEach((x) => {
      const on = x.dataset.pad === mode;
      x.classList.toggle("sel", on);
      x.setAttribute("aria-pressed", String(on));
    });
    canvas.classList.toggle("erasing", mode === "eraser");
  }));

  const pt = (e) => { const r = canvas.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
  canvas.addEventListener("pointerdown", (e) => {
    drawing = true; last = pt(e);
    canvas.setPointerCapture?.(e.pointerId);
    stroke(last, { x: last.x + 0.01, y: last.y + 0.01 }, e);
    e.preventDefault();
  });
  canvas.addEventListener("pointermove", (e) => {
    if (!drawing) return;
    const p = pt(e); stroke(last, p, e); last = p;
    e.preventDefault();
  });
  const end = () => { drawing = false; last = null; };
  canvas.addEventListener("pointerup", end);
  canvas.addEventListener("pointercancel", end);
  canvas.addEventListener("pointerleave", end);

  new ResizeObserver(() => fit()).observe(canvas);
}

function stroke(a, b, e) {
  const er = mode === "eraser" || e.buttons === 32; // 32 = stylus eraser end
  ctx.save();
  ctx.globalCompositeOperation = er ? "destination-out" : "source-over";
  ctx.strokeStyle = ink();
  ctx.lineWidth = er ? 22 : e.pointerType === "pen" && e.pressure ? 1.5 + e.pressure * 3 : 3;
  ctx.lineCap = "round"; ctx.lineJoin = "round";
  ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
  ctx.restore();
}

// Match the canvas bitmap to its on-screen size (sharp on high-DPI screens), keeping what's drawn.
function fit() {
  const r = canvas.getBoundingClientRect();
  if (!r.width || !r.height) return;
  const dpr = window.devicePixelRatio || 1;
  const w = Math.round(r.width * dpr), h = Math.round(r.height * dpr);
  if (canvas.width === w && canvas.height === h) return;
  let keep = null;
  if (canvas.width && canvas.height) { keep = document.createElement("canvas"); keep.width = canvas.width; keep.height = canvas.height; keep.getContext("2d").drawImage(canvas, 0, 0); }
  canvas.width = w; canvas.height = h;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  if (keep) ctx.drawImage(keep, 0, 0, keep.width / dpr, keep.height / dpr);
}

function clear() {
  if (!ctx) return;
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.restore();
}

export const padCard = (k) =>
  `<div class="card padcard"><div class="row spread"><h3>Scratch pad</h3><span class="small muted">Work it out here</span></div><div id="padslot" data-key="${k}"></div></div>`;

// Call after each render: moves the pad into its slot, and wipes it for a new problem.
export function mountPad() {
  const slot = document.getElementById("padslot");
  if (!slot) return;
  if (!wrap) build();
  slot.appendChild(wrap);
  fit();
  if (slot.dataset.key !== key) { key = slot.dataset.key; clear(); }
}
