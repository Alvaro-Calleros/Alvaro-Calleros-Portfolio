# 3D Animation Implementation Guide

## Visual Layout

```
┌─────────────────────────────────────────────────────────────┐
│                    CONTACT SECTION                          │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  ✨ Animated Stars Background (Full Screen)          │  │
│  │     - Pink particles (#f272c8)                        │  │
│  │     - Rotating slowly                                 │  │
│  │     - z-index: -1 (behind everything)                 │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              📍 Contact Title                        │   │
│  │           Get in Touch / Contacto                    │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌────────────────────┬────────────────────────────────┐   │
│  │                    │                                │   │
│  │   🌍 EARTH 3D      │    📇 CONTACT CARD            │   │
│  │                    │                                │   │
│  │  • Auto-rotating   │    ✉️  Email                  │   │
│  │  • Interactive     │    📱 Phone                   │   │
│  │  • 400-500px tall  │    📍 Location                │   │
│  │                    │                                │   │
│  │                    │    🔗 Social Links             │   │
│  │                    │    📥 Download CV              │   │
│  │                    │                                │   │
│  └────────────────────┴────────────────────────────────┘   │
│                                                              │
│              © Footer Text                                   │
└─────────────────────────────────────────────────────────────┘

Mobile View (< lg breakpoint):
┌──────────────────┐
│  ✨ Stars BG     │
│                  │
│  📍 Title        │
│                  │
│  ┌────────────┐  │
│  │ 🌍 Earth   │  │
│  └────────────┘  │
│                  │
│  ┌────────────┐  │
│  │ 📇 Contact │  │
│  │    Card    │  │
│  └────────────┘  │
│                  │
│  © Footer        │
└──────────────────┘
```

## Component Hierarchy

```
Contact.tsx
├── StarsCanvas (Background Layer)
│   └── Canvas
│       └── Stars Component
│           └── Points (1500 particles)
│               └── PointMaterial (pink)
│
└── Content Container (z-10)
    ├── Title (h2)
    ├── Subtitle (p)
    ├── Grid Layout (2 columns on lg+)
    │   ├── Earth Container
    │   │   └── EarthCanvas
    │   │       └── Canvas
    │   │           ├── OrbitControls (autoRotate)
    │   │           └── Suspense
    │   │               └── EarthModel
    │   │                   └── GLTF Scene (/planet/scene.gltf)
    │   │
    │   └── Contact Card
    │       ├── Contact Info Grid (3 cols)
    │       │   ├── Email
    │       │   ├── Phone
    │       │   └── Location
    │       └── Actions
    │           ├── Download CV Button
    │           └── Social Links (LinkedIn, GitHub)
    │
    └── Footer Text
```

## Animation Flow

### On Page Load
1. **Stars Canvas** initializes immediately
   - Generates 1500 random points in sphere
   - Starts rotation animation (slow, continuous)
   - Renders behind all content

2. **Scroll Reveal Triggers** (when section enters viewport)
   - Title fades in + slides up (0ms delay)
   - Subtitle fades in + slides up (100ms delay)
   - Earth container scales in (200ms delay)
   - Contact card reveals (scroll-reveal class)

3. **Earth Model Loading**
   - Shows `CanvasLoader` spinner during GLTF load
   - Once loaded, starts auto-rotation
   - User can drag to orbit (no zoom)

### Continuous Animations
- **Stars**: Rotate on X and Y axes indefinitely
- **Earth**: Auto-rotate around Y axis via OrbitControls
- **Hover Effects**: Contact icons scale on hover

## File Dependencies

```
Contact.tsx
├── imports from "@/components/canvas/Stars"
│   └── Stars.jsx
│       ├── @react-three/fiber (Canvas, useFrame)
│       ├── @react-three/drei (Points, PointMaterial, Preload)
│       └── maath/random (sphere generation)
│
├── imports from "@/components/canvas/Earth"
│   └── Earth.jsx
│       ├── @react-three/fiber (Canvas)
│       ├── @react-three/drei (OrbitControls, Preload, useGLTF)
│       ├── three/examples/jsm/loaders/DRACOLoader
│       ├── ./Loader (CanvasLoader)
│       └── /planet/scene.gltf (asset)
│
└── uses CSS classes from src/index.css
    ├── .stars-canvas-container
    ├── .canvas-loader
    └── @keyframes spin
```

## Key Configuration Values

### Stars Component
```javascript
NUM_STARS: 1500
sphere radius: 1.2
color: "#f272c8" (pink)
size: 0.002
rotation speed: delta/10 (x), delta/15 (y)
```

### Earth Component
```javascript
GLTF path: "/planet/scene.gltf"
scale: 2.5
camera position: [-4, 3, 6]
camera fov: 45
autoRotate: true
enableZoom: false
polar angle: locked at π/2
```

### Layout Breakpoints
```css
Earth height: 400px (default), 500px (lg+)
Grid: 1 column (default), 2 columns (lg+)
Container max-width: 6xl (1280px)
```

## Styling Integration with Design System

The animations use the project's existing design tokens:

```css
/* From index.css */
--primary: 260 100% 65%        /* Purple - used in stars */
--secondary: 270 100% 75%      /* Light purple */
--background: 222 47% 8%       /* Dark blue-gray */
--card: 222 47% 11%            /* Slightly lighter */

/* Stars color matches primary theme */
color: #f272c8 ≈ hsl(320, 90%, 70%) /* Pink accent */

/* Gradients used */
gradient-text: 135deg primary → secondary
gradient-card: 135deg card → muted
```

## Performance Optimizations

1. **Earth Canvas**
   - `frameloop="demand"` - only renders when needed
   - `dpr={[1, 2]}` - adaptive pixel ratio
   - `Suspense` with loader - smooth loading UX

2. **Stars Canvas**
   - `frustumCulled` - culls off-screen particles
   - `Preload all` - preloads assets
   - Fixed particle count (no dynamic generation)

3. **Layout**
   - `will-change` avoided (let browser optimize)
   - CSS transforms for animations (GPU accelerated)
   - `overflow-hidden` prevents layout shifts

## Troubleshooting

### If Earth doesn't load:
1. Check browser console for GLTF errors
2. Verify `/planet/scene.gltf` exists in public folder
3. Check DRACO import path matches three.js version
4. Ensure Canvas has defined height

### If Stars don't appear:
1. Verify z-index layering (stars should be -1)
2. Check if `stars-canvas-container` CSS is loaded
3. Ensure maath package is installed
4. Check for WebGL support in browser

### If layout breaks on mobile:
1. Test grid breakpoint (lg = 1024px)
2. Verify responsive height classes work
3. Check for horizontal overflow
4. Test with DevTools mobile emulation

## Next Steps

To customize further:
1. **Adjust colors**: Change star color or add color variation
2. **Add lights**: Add ambient/directional lights to Earth
3. **Interaction**: Add click events to Earth model
4. **Performance**: Reduce star count on mobile
5. **Accessibility**: Add reduced-motion media query handling
