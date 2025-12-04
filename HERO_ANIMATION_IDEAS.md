# Hero Section Animation Ideas

## ✅ Currently Implemented

- **Scroll Down Indicator**: Mouse-shaped animated indicator that bounces and guides users to featured products
- **Smooth Scroll**: Click the indicator to smoothly scroll to the featured section
- **Staggered Animations**: Elements fade in with delays for a professional reveal effect

---

## 🎨 Additional Cool Animation Ideas

### 1. **Parallax Background Effect**

Add depth by making background elements move at different speeds on scroll.

```tsx
// Add to hero section
<div
  className="absolute inset-0"
  style={{ transform: `translateY(${scrollY * 0.5}px)` }}
>
  {/* Background elements */}
</div>
```

### 2. **Typewriter Effect for Tagline**

Make the tagline appear character by character.

```tsx
const [text, setText] = useState("");
const fullText = "Your one-stop shop for quality home appliances...";

useEffect(() => {
  let i = 0;
  const timer = setInterval(() => {
    if (i < fullText.length) {
      setText(fullText.slice(0, i + 1));
      i++;
    }
  }, 50);
  return () => clearInterval(timer);
}, []);
```

### 3. **Floating Product Cards**

Show 3-4 small product cards that float around the hero section.

```tsx
<div className="absolute top-20 right-10 animate-float-slow">
  <Card className="w-32 h-32 rotate-6 hover:rotate-0 transition-transform">
    <img src="/product1.jpg" alt="" />
  </Card>
</div>
```

Add CSS:

```css
@keyframes float-slow {
  0%,
  100% {
    transform: translateY(0px) rotate(6deg);
  }
  50% {
    transform: translateY(-20px) rotate(6deg);
  }
}
```

### 4. **Particle/Confetti Animation**

Add floating particles for celebration effect.

```tsx
import { useEffect } from "react";
import confetti from "canvas-confetti";

// On page load
useEffect(() => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
}, []);
```

### 5. **Gradient Text Animation**

Animated gradient text for the main title.

```tsx
<h1 className="gradient-text-animate">Thivin Enterprises</h1>
```

CSS:

```css
.gradient-text-animate {
  background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6);
  background-size: 300% 300%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-shift 3s ease infinite;
}

@keyframes gradient-shift {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}
```

### 6. **Count-Up Statistics**

Animate numbers counting up (e.g., "1000+ Happy Customers").

```tsx
import { useCountUp } from "use-count-up";

const { value } = useCountUp({
  isCounting: true,
  end: 1000,
  duration: 2,
});

<div>{value}+ Happy Customers</div>;
```

### 7. **3D Tilt Effect on Cards**

Cards tilt based on mouse position (like Apple's website).

```tsx
import { motion } from "framer-motion";

<motion.div
  whileHover={{ rotateX: 5, rotateY: 5 }}
  style={{ transformStyle: "preserve-3d" }}
>
  {/* Card content */}
</motion.div>;
```

### 8. **Wave Animation at Bottom**

Add an SVG wave that animates at the bottom of the hero.

```tsx
<svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 100">
  <path
    className="animate-wave"
    fill="#ffffff"
    d="M0,50 Q360,80 720,50 T1440,50 L1440,100 L0,100 Z"
  />
</svg>
```

CSS:

```css
@keyframes wave {
  0%,
  100% {
    d: path("M0,50 Q360,80 720,50 T1440,50 L1440,100 L0,100 Z");
  }
  50% {
    d: path("M0,50 Q360,20 720,50 T1440,50 L1440,100 L0,100 Z");
  }
}
```

### 9. **Magnetic Button Effect**

Buttons that follow your mouse cursor slightly.

```tsx
const [position, setPosition] = useState({ x: 0, y: 0 });

const handleMouseMove = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = (e.clientX - rect.left - rect.width / 2) / 10;
  const y = (e.clientY - rect.top - rect.height / 2) / 10;
  setPosition({ x, y });
};

<Button
  onMouseMove={handleMouseMove}
  onMouseLeave={() => setPosition({ x: 0, y: 0 })}
  style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
>
  Shop Now
</Button>;
```

### 10. **Image Reveal on Scroll**

Images slide in or reveal as you scroll.

```tsx
<motion.div
  initial={{ opacity: 0, x: -100 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
>
  <img src="/hero-image.jpg" alt="" />
</motion.div>
```

### 11. **Spotlight Effect**

A spotlight that follows the cursor.

```css
.hero-section {
  background: radial-gradient(
    600px circle at var(--mouse-x) var(--mouse-y),
    rgba(59, 130, 246, 0.15),
    transparent 40%
  );
}
```

### 12. **Text Scramble Effect**

Text appears with a scramble/decrypt animation.

```tsx
import { useEffect, useState } from "react";

const scrambleText = (text) => {
  const chars = "!<>-_\\/[]{}—=+*^?#________";
  // Scramble logic here
};
```

---

## 🚀 Recommended Next Steps

1. **Install Framer Motion** for advanced animations:

   ```bash
   npm install framer-motion
   ```

2. **Add Intersection Observer** for scroll-triggered animations

3. **Consider Performance**: Use `will-change` CSS property for animated elements

4. **Test on Mobile**: Ensure animations don't cause performance issues

---

## 📦 Libraries to Consider

- **Framer Motion**: Advanced React animations
- **GSAP**: Professional animation library
- **Lottie**: JSON-based animations
- **AOS (Animate On Scroll)**: Simple scroll animations
- **react-spring**: Physics-based animations
- **canvas-confetti**: Confetti effects

---

Would you like me to implement any of these specific animations?
