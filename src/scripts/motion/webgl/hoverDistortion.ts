import { Renderer, Program, Mesh, Plane, Texture } from 'ogl';

// Signature WebGL hover effect. A single fixed, pointer-events:none <canvas>
// (one WebGL context) is repositioned over whichever [data-webgl] image is
// hovered, drawing that image with a velocity-driven ripple + RGB shift. The
// real <img> stays in the DOM underneath (SEO + fallback). Pointer devices only.
//
// Single-image-at-a-time keeps alignment trivial (we only match one rect) and
// costs nothing when not hovering (canvas hidden, RAF stopped).

const vertex = /* glsl */ `
  attribute vec3 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  uniform sampler2D tMap;
  uniform vec2 uMouse;     // 0..1, v from bottom
  uniform float uVelocity; // 0..~2
  uniform float uHover;    // eased 0..1
  varying vec2 vUv;
  void main() {
    vec2 uv = vUv;
    float d = distance(uv, uMouse);
    float falloff = smoothstep(0.55, 0.0, d);
    float ripple = sin(d * 16.0 - uVelocity * 5.0) * 0.018 * uHover * falloff;
    vec2 dir = normalize(uv - uMouse + 1e-4);
    vec2 duv = uv + dir * ripple;
    float shift = 0.010 * uHover * clamp(uVelocity, 0.0, 1.0) + 0.004 * abs(ripple) * 40.0;
    float r = texture2D(tMap, duv + vec2(shift, 0.0)).r;
    float g = texture2D(tMap, duv).g;
    float b = texture2D(tMap, duv - vec2(shift, 0.0)).b;
    gl_FragColor = vec4(r, g, b, 1.0);
  }
`;

export function initHoverDistortion(signal: AbortSignal) {
  const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-webgl]'));
  if (!targets.length) return;

  let renderer: Renderer;
  try {
    renderer = new Renderer({ alpha: true, dpr: Math.min(window.devicePixelRatio || 1, 2) });
  } catch {
    return; // WebGL unavailable — DOM images remain
  }
  const gl = renderer.gl;
  const canvas = gl.canvas as HTMLCanvasElement;
  canvas.style.cssText =
    'position:fixed;left:0;top:0;z-index:30;pointer-events:none;opacity:0;transition:opacity .25s ease;';
  document.body.appendChild(canvas);

  const geometry = new Plane(gl, { width: 2, height: 2 });
  const program = new Program(gl, {
    vertex,
    fragment,
    uniforms: {
      tMap: { value: new Texture(gl) },
      uMouse: { value: [0.5, 0.5] },
      uVelocity: { value: 0 },
      uHover: { value: 0 },
    },
  });
  const mesh = new Mesh(gl, { geometry, program });

  const textures = new WeakMap<HTMLImageElement, Texture>();
  function textureFor(img: HTMLImageElement): Texture {
    let tex = textures.get(img);
    if (!tex) {
      // Images are non-power-of-two: must use CLAMP + no mipmaps or WebGL1
      // renders them black.
      tex = new Texture(gl, {
        image: img,
        generateMipmaps: false,
        minFilter: gl.LINEAR,
        magFilter: gl.LINEAR,
        wrapS: gl.CLAMP_TO_EDGE,
        wrapT: gl.CLAMP_TO_EDGE,
      });
      textures.set(img, tex);
    }
    return tex;
  }

  let active: HTMLElement | null = null;
  let hovering = false;
  let raf = 0;
  let lastW = 0;
  let lastH = 0;
  let px = 0;
  let py = 0;
  let pt = 0;

  function frame() {
    raf = requestAnimationFrame(frame);
    if (!active) return;
    const r = active.getBoundingClientRect();
    canvas.style.transform = `translate(${r.left}px, ${r.top}px)`;
    if (r.width !== lastW || r.height !== lastH) {
      lastW = r.width;
      lastH = r.height;
      renderer.setSize(r.width, r.height);
    }
    const u = program.uniforms;
    u.uHover.value += ((hovering ? 1 : 0) - u.uHover.value) * 0.1;
    u.uVelocity.value *= 0.92;
    renderer.render({ scene: mesh });

    if (!hovering && u.uHover.value < 0.01) {
      canvas.style.opacity = '0';
      cancelAnimationFrame(raf);
      raf = 0;
      active = null;
    }
  }

  function onEnter(el: HTMLElement) {
    const img = el.querySelector('img');
    if (!img || !(img as HTMLImageElement).complete) return;
    active = el;
    hovering = true;
    program.uniforms.tMap.value = textureFor(img as HTMLImageElement);
    lastW = 0;
    lastH = 0;
    canvas.style.opacity = '1';
    if (!raf) raf = requestAnimationFrame(frame);
  }
  function onLeave() {
    hovering = false;
  }
  function onMove(el: HTMLElement, e: PointerEvent) {
    if (e.pointerType !== 'mouse') return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    program.uniforms.uMouse.value = [x, 1 - y];
    const now = performance.now();
    const dt = Math.max(now - pt, 1);
    const v = Math.hypot(e.clientX - px, e.clientY - py) / dt;
    program.uniforms.uVelocity.value = Math.min(program.uniforms.uVelocity.value + v * 0.5, 2.0);
    px = e.clientX;
    py = e.clientY;
    pt = now;
  }

  targets.forEach((el) => {
    el.addEventListener('pointerenter', () => onEnter(el), { signal });
    el.addEventListener('pointerleave', onLeave, { signal });
    el.addEventListener('pointermove', (e) => onMove(el, e as PointerEvent), { signal });
  });

  const cleanup = () => {
    if (raf) cancelAnimationFrame(raf);
    canvas.remove();
    const ext = gl.getExtension('WEBGL_lose_context');
    ext?.loseContext();
  };
  signal.addEventListener('abort', cleanup);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) hovering = false;
  });
}
