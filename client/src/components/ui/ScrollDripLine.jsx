import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const ScrollDripLine = () => {
  const [positions, setPositions] = useState({
    hero: { x: 0, y: 0 },
    about: { x: 0, y: 0 },
    featured: { x: 0, y: 0 },
  });
  const [isReady, setIsReady] = useState(false);

  const { scrollY } = useScroll();

  useEffect(() => {
    const updatePositions = () => {
      // Elements to track
      // Hero Line: We can track the 'Scroll to Explore' text wrapper or the line itself if it has an ID
      // About Header: "OUR ORIGIN" (#origin-text)
      // Featured Header: "FEATURED WORK" (#featured-text)

      const heroEl = document.getElementById("hero-scroll-indicator");
      const aboutEl = document.getElementById("origin-text");
      const featuredEl = document.getElementById("featured-text");

      if (heroEl && aboutEl && featuredEl) {
        const heroRect = heroEl.getBoundingClientRect();
        const aboutRect = aboutEl.getBoundingClientRect();
        const featuredRect = featuredEl.getBoundingClientRect();

        // Calculate absolute positions relative to document
        // Hero: Center of the indicator
        const heroX = heroRect.left + heroRect.width / 2;
        const heroY = heroRect.top + window.scrollY + heroRect.height / 2 + 20; // Start slightly below text

        // About: Align with Left of "Our Origin" text? Content is usually left-aligned.
        // Or roughly center? The user said "stops at the Our Origin text".
        // Let's target the center-left of the text element.
        const aboutX = aboutRect.left + aboutRect.width / 2;
        const aboutY = aboutRect.top + window.scrollY; // Top of text

        // Featured: Center of "Featured Work" text
        const featuredX = featuredRect.left + featuredRect.width / 2;
        const featuredY = featuredRect.top + window.scrollY; // Top of text

        setPositions({
          hero: { x: heroX, y: heroY },
          about: { x: aboutX, y: aboutY },
          featured: { x: featuredX, y: featuredY },
        });
        setIsReady(true);
      }
    };

    window.addEventListener("resize", updatePositions);
    // Multiple timeouts to catch layout shifts
    setTimeout(updatePositions, 500);
    setTimeout(updatePositions, 1500);

    return () => window.removeEventListener("resize", updatePositions);
  }, []);

  const viewportHeight =
    typeof window !== "undefined" ? window.innerHeight : 1000;

  // Logic:
  // 0 Scroll -> Line is at Hero.
  // Scroll Down -> Line elongates? Or moves? "Drips down... stops at...".
  // "Stops at" implies motion. "Moves back and forth".
  // So it's a projectile moving from A to B to C.

  // Transition Points
  // Start: Hero
  // Stage 1: About (When About is centered in view)
  // Stage 2: Featured (When Featured is centered in view)

  const startY = positions.hero.y;
  const midY = positions.about.y;
  const endY = positions.featured.y;

  // Trigger points (scroll position when the target is roughly centered)
  const stage1Trigger = midY - viewportHeight * 0.6;
  const stage2Trigger = endY - viewportHeight * 0.6;

  const isValid = isReady && stage1Trigger > 0 && stage2Trigger > stage1Trigger;

  const inputRange = isValid ? [0, stage1Trigger, stage2Trigger] : [0, 1, 2];

  const xRange = isValid
    ? [positions.hero.x, positions.about.x, positions.featured.x]
    : [0, 0, 0];

  const yRange = isValid
    ? [positions.hero.y, positions.about.y, positions.featured.y]
    : [0, 0, 0];

  const x = useTransform(scrollY, inputRange, xRange);
  const y = useTransform(scrollY, inputRange, yRange);

  // Make the motion fluid/springy
  const springX = useSpring(x, { stiffness: 40, damping: 20 });
  const springY = useSpring(y, { stiffness: 40, damping: 20 });

  // Visibility:
  // Fade out before start? No, starts at Hero.
  // Maybe scale X/Y to simulate dripping elongation?

  if (!isValid) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none z-[9999] overflow-hidden"
      style={{ height: Math.max(endY + 1000, 5000) }}
    >
      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
        }}
        className="absolute top-0 left-0"
      >
        {/* The Visual Drip Line */}
        <motion.div
          animate={{ height: [40, 60, 40] }} // Pulsing length
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-[2px] bg-gradient-to-b from-primary to-transparent rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)]"
        />
      </motion.div>
    </div>
  );
};

export default ScrollDripLine;
