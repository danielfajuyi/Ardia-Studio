import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const ScrollFluidConnector = () => {
  const [positions, setPositions] = useState({
    hero: { x: 0, y: 0 },
    about: { x: 0, y: 0 },
    featured: { x: 0, y: 0 },
  });

  const [isReady, setIsReady] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const updatePositions = () => {
      const heroEl = document.getElementById("hero-scroll-indicator");
      const aboutEl = document.getElementById("origin-text");
      const featuredEl = document.getElementById("featured-text");

      if (heroEl && aboutEl && featuredEl) {
        const heroRect = heroEl.getBoundingClientRect();
        const aboutRect = aboutEl.getBoundingClientRect();
        const featuredRect = featuredEl.getBoundingClientRect();

        // We use absolute page coordinates (scrollY + top)
        setPositions({
          hero: {
            x: heroRect.left + heroRect.width / 2,
            y: heroRect.top + window.scrollY + heroRect.height / 2,
          },
          about: {
            x: aboutRect.left,
            y: aboutRect.top + window.scrollY + aboutRect.height / 2,
          },
          featured: {
            x: featuredRect.left,
            y: featuredRect.top + window.scrollY + featuredRect.height / 2,
          },
        });
        setIsReady(true);
      }
    };

    window.addEventListener("resize", updatePositions);
    setTimeout(updatePositions, 500);
    setTimeout(updatePositions, 2000);

    return () => window.removeEventListener("resize", updatePositions);
  }, []);

  const viewportHeight =
    typeof window !== "undefined" ? window.innerHeight : 1000;

  // Safe fallback values to prevent Framer Motion errors on initial render
  // useTransform requires strictly ascending input ranges.
  const startY = positions.hero.y;
  const midY = positions.about.y;
  const endY = positions.featured.y;

  // Calculate triggers based on viewport position (centering the elements)
  const stage1End = midY - viewportHeight * 0.5;
  const stage2End = endY - viewportHeight * 0.5;

  // We only use the real range if we are ready and the values are ascending
  // Otherwise we return a dummy range [0, 1, 2]
  const isValid = isReady && stage1End > 0 && stage2End > stage1End;

  const inputRange = isValid ? [0, stage1End, stage2End] : [0, 1, 2];

  const xRange = isValid
    ? [positions.hero.x, positions.about.x, positions.featured.x]
    : [0, 0, 0];

  const yRange = isValid
    ? [positions.hero.y, positions.about.y, positions.featured.y]
    : [0, 0, 0];

  const x = useTransform(scrollY, inputRange, xRange);
  const y = useTransform(scrollY, inputRange, yRange);

  const springX = useSpring(x, { stiffness: 60, damping: 20 });
  const springY = useSpring(y, { stiffness: 60, damping: 20 });

  // Scale / Glow effect
  const scaleInputRange = isValid
    ? [
        0,
        100,
        stage1End - 100,
        stage1End,
        stage1End + 100,
        stage2End - 100,
        stage2End,
      ]
    : [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6];

  const scale = useTransform(
    scrollY,
    scaleInputRange,
    [1, 0.5, 0.5, 1.5, 0.5, 0.5, 1.5],
  );

  // Even with valid hooks above, we don't want to render the ball at (0,0)
  if (!isValid) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[9999] h-[5000px]">
      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          scale,
        }}
        className="fixed top-0 left-0 w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.8)] filter blur-[1px]"
      />
    </div>
  );
};

export default ScrollFluidConnector;
