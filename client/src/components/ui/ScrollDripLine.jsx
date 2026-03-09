import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const ScrollDripLine = () => {
  const [stops, setStops] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [lineHeight, setLineHeight] = useState(0);

  const { scrollY } = useScroll();

  useEffect(() => {
    // List of all potential anchor points in order
    const targetIds = [
      "hero-scroll-indicator", // Start
      "origin-text", // About
      "featured-text", // Featured Video
      "value-text", // Why Choose Us
      "offer-text", // Services
      "process-text", // Process
      "trust-text", // Testimonials
      "academy-text", // Academy
      "works-text", // Works
      "pricing-text", // Pricing
      "faq-text", // FAQ
      "close-text", // Final CTA (Optional close)
    ];

    const calculatePositions = () => {
      const foundStops = [];
      let maxY = 0;

      // Helper to calculate absolute position
      const getCoords = (el) => {
        const rect = el.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2,
          y: rect.top + window.scrollY,
        };
      };

      // 1. Always attempt to find Hero first as the starting point.
      const heroEl = document.getElementById("hero-scroll-indicator");

      // If hero is missing, we can't really start, but let's try to proceed if we find other things?
      // Nah, Hero is critical for the start.
      if (!heroEl) return false;

      const heroCoords = getCoords(heroEl);
      // Adjust Hero Y to be strictly below the text container
      const heroRect = heroEl.getBoundingClientRect();
      heroCoords.y += heroRect.height + 10;

      foundStops.push({
        id: "hero",
        pos: heroCoords,
        scroll: 0, // Start point is always scroll 0
      });
      maxY = heroCoords.y;

      // 2. Iterate through the rest
      const viewportHeight = window.innerHeight;

      targetIds.slice(1).forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const coords = getCoords(el);

          // Trigger animation when this element reaches center of viewport
          const trigger = Math.max(0, coords.y - viewportHeight * 0.5);

          foundStops.push({
            id: id,
            pos: coords,
            scroll: trigger,
          });

          if (coords.y > maxY) maxY = coords.y;
        }
      });

      // 3. Sort by 'scroll' trigger to ensure monotonic increase for Framer Motion
      foundStops.sort((a, b) => a.scroll - b.scroll);

      // 4. Force strict monotonicity (Framer Motion requires strictly increasing input ranges)
      for (let i = 1; i < foundStops.length; i++) {
        if (foundStops[i].scroll <= foundStops[i - 1].scroll) {
          foundStops[i].scroll = foundStops[i - 1].scroll + 1;
        }
      }

      // We need at least 2 points to start rendering lines
      if (foundStops.length >= 2) {
        setStops([...foundStops]); // Force state update
        setLineHeight(maxY + 1000); // Add buffer
        setIsReady(true);
      }
    };

    // Calculate immediately
    calculatePositions();

    // Use ResizeObserver to recalculate when page layout shifts (e.g. images load)
    const resizeObserver = new ResizeObserver(() => {
      calculatePositions();
    });
    resizeObserver.observe(document.documentElement);

    // Re-calculate on resize
    window.addEventListener("resize", calculatePositions);

    // Optional: continuous polling fallback for the first 3 seconds 
    // to catch any weird asynchronous paints
    const interval = setInterval(calculatePositions, 500);
    const timeout = setTimeout(() => clearInterval(interval), 3000);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", calculatePositions);
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  // -- Render Logic --

  // Ensure arrays are valid for useTransform
  const valid = isReady && stops.length >= 2;

  const inputRange = valid ? stops.map((s) => s.scroll) : [0, 1];
  const xRange = valid ? stops.map((s) => s.pos.x) : [0, 0];
  const yRange = valid ? stops.map((s) => s.pos.y) : [0, 0];

  const x = useTransform(scrollY, inputRange, xRange);
  const y = useTransform(scrollY, inputRange, yRange);

  // Slower, more fluid physics
  const springX = useSpring(x, { stiffness: 35, damping: 30 });
  const springY = useSpring(y, { stiffness: 35, damping: 30 });

  if (!valid) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none z-[9999] overflow-hidden"
      style={{ height: lineHeight }}
    >
      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: "-50%", // Center the pulse on the coordinate
        }}
        className="absolute top-0 left-0"
      >
        <motion.div
          animate={{ height: [40, 60, 40] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-[2px] bg-gradient-to-b from-primary to-transparent rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)]"
        />
      </motion.div>
    </div>
  );
};

export default ScrollDripLine;
