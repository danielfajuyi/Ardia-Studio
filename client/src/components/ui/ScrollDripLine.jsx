import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const ScrollDripLine = () => {
  const [positions, setPositions] = useState({
    hero: { x: 0, y: 0 },
    about: { x: 0, y: 0 },
    featured: { x: 0, y: 0 },
    value: { x: 0, y: 0 },
    offer: { x: 0, y: 0 },
    process: { x: 0, y: 0 },
    trust: { x: 0, y: 0 },
    close: { x: 0, y: 0 },
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
      const valueEl = document.getElementById("value-text");
      const offerEl = document.getElementById("offer-text");
      const processEl = document.getElementById("process-text");
      const trustEl = document.getElementById("trust-text");
      const closeEl = document.getElementById("close-text");

      if (
        heroEl &&
        aboutEl &&
        featuredEl &&
        valueEl &&
        offerEl &&
        processEl &&
        trustEl &&
        closeEl
      ) {
        const getPos = (el) => {
          const rect = el.getBoundingClientRect();
          return {
            x: rect.left + rect.width / 2,
            y: rect.top + window.scrollY,
          };
        };

        const heroRect = heroEl.getBoundingClientRect();
        const heroPos = {
          x: heroRect.left + heroRect.width / 2,
          y: heroRect.top + window.scrollY + heroRect.height / 2 + 20,
        };

        setPositions({
          hero: heroPos,
          about: getPos(aboutEl),
          featured: getPos(featuredEl),
          value: getPos(valueEl),
          offer: getPos(offerEl),
          process: getPos(processEl),
          trust: getPos(trustEl),
          close: getPos(closeEl),
        });
        setIsReady(true);
      }
    };

    window.addEventListener("resize", updatePositions);
    // Multiple timeouts to catch layout shifts
    setTimeout(updatePositions, 500);
    setTimeout(updatePositions, 1500);
    setTimeout(updatePositions, 3000);

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

  // Triggers: When the target element is somewhat centered or slightly above center
  const getTrigger = (targetY) => targetY - viewportHeight * 0.5;

  const stops = [
    { pos: positions.hero, scroll: 0 },
    { pos: positions.about, scroll: getTrigger(positions.about.y) },
    { pos: positions.featured, scroll: getTrigger(positions.featured.y) },
    { pos: positions.value, scroll: getTrigger(positions.value.y) },
    { pos: positions.offer, scroll: getTrigger(positions.offer.y) },
    { pos: positions.process, scroll: getTrigger(positions.process.y) },
    { pos: positions.trust, scroll: getTrigger(positions.trust.y) },
    { pos: positions.close, scroll: getTrigger(positions.close.y) },
  ];

  // Validate: Ascending order
  const isValid =
    isReady &&
    stops.every((stop, i) => i === 0 || stop.scroll > stops[i - 1].scroll);

  const inputRange = isValid ? stops.map((s) => s.scroll) : [0, 1];
  const xRange = isValid ? stops.map((s) => s.pos.x) : [0, 0];
  const yRange = isValid ? stops.map((s) => s.pos.y) : [0, 0];

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
      style={{ height: Math.max(positions.close.y + 1000, 5000) }}
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
