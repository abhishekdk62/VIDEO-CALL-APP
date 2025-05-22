// SplitText.jsx
import { useSprings, animated } from "@react-spring/web";
import { useEffect, useRef, useState } from "react";

export default function SplitText({
  text,
  className = "",
  delay = 100,
  animationFrom = { opacity: 0, transform: "translate3d(0,40px,0)" },
  animationTo = { opacity: 1, transform: "translate3d(0,0,0)" },
  onLetterAnimationComplete,
}) {
  const letters = text.split("");
  const [inView, setInView] = useState(false);
  const ref = useRef();
  const doneCount = useRef(0);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        obs.disconnect();
      }
    });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const springs = useSprings(
    letters.length,
    letters.map((_, i) => ({
      from: animationFrom,
      to: inView
        ? async next => {
            await next(animationTo);
            doneCount.current += 1;
            if (
              doneCount.current === letters.length &&
              onLetterAnimationComplete
            ) {
              onLetterAnimationComplete();
            }
          }
        : animationFrom,
      delay: i * delay,
    }))
  );

  return (
    <p
      ref={ref}
      className={`inline-block overflow-visible ${className}`}
      style={{ fontFamily: "'Fugaz One', cursive" }}
    >
      {letters.map((char, i) => (
        <animated.span
          key={i}
          style={springs[i]}
          className="inline-block will-change-transform"
        >
          {char}
        </animated.span>
      ))}
    </p>
  );
}
