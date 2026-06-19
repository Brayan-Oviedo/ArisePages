# Text Animation Effects — Quick Reference

## 1. Typewriter
**Effect:** Letter-by-letter reveal with slight vertical rise  
**Use Case:** Hero headlines, dramatic entrances  
**Example:**
```javascript
TextAnimator.typewriter(element, {
  duration: 2,
  ease: 'power2.inOut',
  stagger: 0.05
});
```
**Live:** Not used in current landing (available for future use)

---

## 2. Morphing
**Effect:** Word cross-fades and transforms shape  
**Use Case:** Dynamic taglines, feature highlights  
**Example:**
```javascript
TextAnimator.morph(element, {
  wordList: ['Create', 'Design', 'Launch'],
  wordDuration: 2,
  ease: 'elastic.out'
});
```
**Live:** Not used in current landing (available for future use)

---

## 3. Gradient Fill
**Effect:** Animated color gradient flows across text  
**Use Case:** CTA buttons, accent text, premium feel  
**Example:**
```javascript
TextAnimator.gradientFill(element, {
  duration: 2.5,
  angle: 45,
  colors: ['#FF2D55', '#A855F7'],
  animateAngle: true,
  loop: true
});
```
**Live in Landing:** CTA buttons (`.btn-primary`) — infinite loop  
**Lines:** index.html ~1144-1159

---

## 4. Character Entrance
**Effect:** Individual characters scale/rotate in with stagger  
**Use Case:** Section headers, emphasis text, dramatic impact  
**Example:**
```javascript
TextAnimator.characterEntrance(element, {
  effect: 'fade-scale-rotate',
  duration: 0.8,
  stagger: 0.06,
  scale: { from: 0.8, to: 1 },
  rotation: { from: -8, to: 0 },
  ease: 'back.out(1.5)',
  delay: 0.3
});
```
**Live in Landing:**
- Hero title (`.hero-title`) — On load, fade/scale/rotate
- Benefit card titles — On scroll, fade/scale
- FAQ headers — On scroll, fade/scale/rotate

---

## 5. Ink/Pen Stroke
**Effect:** Text drawn effect via blur animation  
**Use Case:** Artistic titles, signatures, hand-drawn feel  
**Example:**
```javascript
TextAnimator.inkStroke(element, {
  duration: 2.5,
  strokeWidth: 2,
  ease: 'power1.inOut'
});
```
**Live:** Not used in current landing (available for future use)

---

## 6. Glitch
**Effect:** Controlled digital distortion with RGB separation  
**Use Case:** Tech products, cyberpunk feel, digital brands  
**Example:**
```javascript
TextAnimator.glitch(element, {
  intensity: 'medium',
  duration: 0.6,
  frequency: 4,
  offset: 3,
  colors: ['#FF2D55', '#050507'],
  ease: 'expo.out'
});
```
**Live in Landing:** CTA section title (`.section-title` in #cta) — On scroll  
**Lines:** index.html ~1127-1139

---

## 7. Wave Pattern
**Effect:** Undulating wave motion across words  
**Use Case:** Secondary headlines, flowing text, organic feel  
**Example:**
```javascript
TextAnimator.wave(element, {
  duration: 2,
  amplitude: 12,
  frequency: 2.5,
  ease: 'sine.inOut'
});
```
**Live in Landing:** Pricing section title — On scroll  
**Lines:** index.html ~1118-1126

---

## 8. Shatter
**Effect:** Text explodes into particles then reforms  
**Use Case:** High-impact moments, hero entrance, launch reveals  
**Example:**
```javascript
TextAnimator.shatter(element, {
  duration: 1.5,
  particles: 15,
  velocity: 200,
  ease: 'back.out(1.5)',
  mergeBack: true,
  mergeDuration: 0.8
});
```
**Live:** Not used in current landing (available for future use)

---

## 9. Liquid Merge
**Effect:** Blob-like entrance with blur fade and scale  
**Use Case:** Modern aesthetic, contemporary feel, abstract text  
**Example:**
```javascript
TextAnimator.liquidMerge(element, {
  duration: 1.5,
  blur: { from: 6, to: 0 },
  opacity: { from: 0.4, to: 1 },
  scale: { from: 0.9, to: 1 },
  ease: 'power2.out'
});
```
**Live in Landing:** Benefits section title — On scroll  
**Lines:** index.html ~1108-1117

---

## 10. Pixel Sort
**Effect:** Matrix-style reveal with character shift  
**Use Case:** Tech, data-driven companies, futuristic feel  
**Example:**
```javascript
TextAnimator.pixelSort(element, {
  duration: 1.2,
  sortDirection: 'horizontal',
  ease: 'expo.out',
  color: '#00D9FF'
});
```
**Live:** Not used in current landing (available for future use)

---

## 11. Neon Flicker
**Effect:** Retro-futuristic glow pulse with flicker  
**Use Case:** Gaming, audio brands, 80s aesthetic, premium glow  
**Example:**
```javascript
TextAnimator.neonFlicker(element, {
  duration: 0.5,
  flickerPattern: 'pulse',
  glowColor: '#FF2D55',
  flickerCount: 6,
  ease: 'power1.inOut'
});
```
**Live in Landing:** Pricing plan names — On scroll  
**Lines:** index.html ~1167-1179

---

## Common Parameters

### Timing
- `duration` (number) — Animation length in seconds (default: 1.2)
- `ease` (string) — GSAP easing (e.g., 'power2.out', 'back.out(1.5)', 'elastic.out')
- `delay` (number) — Initial delay before animation starts (default: 0)
- `stagger` (number) — Delay between individual character/word animations (default: 0.1)

### Triggers
- `trigger` (string) — 'load' (immediate) or 'scroll' (on viewport entry)
- `start` (string) — ScrollTrigger start position (default: 'top 80%')

### Effects-Specific
- `scale` — { from: number, to: number } for size changes
- `rotation` — { from: deg, to: deg } for spin effects
- `colors` — Array of hex colors for gradients/glows
- `amplitude` — Wave or oscillation size (pixels)
- `frequency` — Number of oscillations in animation cycle
- `loop` — Boolean, whether animation repeats infinitely

---

## Quick Copy-Paste Examples

### Hero Title (Already Applied)
```javascript
TextAnimator.characterEntrance(document.querySelector('.hero-title'), {
  effect: 'fade-scale-rotate',
  duration: 0.8,
  stagger: 0.06,
  scale: { from: 0.8, to: 1 },
  rotation: { from: -8, to: 0 },
  ease: 'back.out(1.5)',
  delay: 0.3
});
```

### Custom Button (Not Yet Applied)
```javascript
const btn = document.querySelector('#my-button-text');
TextAnimator.gradientFill(btn, {
  duration: 2,
  colors: ['#FF2D55', '#A855F7'],
  animateAngle: true,
  loop: true
});
```

### Testimonial Quote on Scroll (Not Yet Applied)
```javascript
const quote = document.querySelector('.testimonial-text');
TextAnimator.liquidMerge(quote, {
  duration: 1.5,
  blur: { from: 8, to: 0 },
  opacity: { from: 0.3, to: 1 },
  trigger: 'scroll',
  start: 'top 75%'
});
```

### Stats Counter on Scroll (Not Yet Applied)
```javascript
const stat = document.querySelector('.stat-number');
TextAnimator.characterEntrance(stat, {
  duration: 1,
  stagger: 0.1,
  scale: { from: 0, to: 1 },
  trigger: 'scroll',
  start: 'top 80%'
});
```

---

## Currently Used Animations in Landing

| Effect | Used Where | Trigger | Status |
|--------|-----------|---------|--------|
| Character Entrance | Hero title, benefit titles, FAQ headers | Load/Scroll | ✓ Active |
| Gradient Fill | CTA buttons | Load (loop) | ✓ Active |
| Liquid Merge | Benefits header | Scroll | ✓ Active |
| Wave | Pricing header | Scroll | ✓ Active |
| Glitch | CTA header | Scroll | ✓ Active |
| Neon Flicker | Plan names | Scroll | ✓ Active |
| Typewriter | — | — | Available |
| Morphing | — | — | Available |
| Ink Stroke | — | — | Available |
| Shatter | — | — | Available |
| Pixel Sort | — | — | Available |

---

## Performance Tips

1. **Limit simultaneous animations** — Too many at once can cause lag
2. **Use appropriate easing** — 'power2.out' is safest for smoothness
3. **Set reasonable stagger** — 0.05-0.15 seconds is typical
4. **Check scroll performance** — DevTools > Performance tab
5. **Test on mobile** — Ensure 60fps on real devices

---

## How to Add to Your Landing

1. Open the HTML file containing your element
2. Find the `initTextAnimations()` function
3. Add your new effect configuration
4. Adjust parameters until it feels right
5. Test in browser (especially on scroll triggers)
