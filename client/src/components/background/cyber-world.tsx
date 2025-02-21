import { motion } from "framer-motion";
import { useMemo } from "react";

// Simplified world map coordinates
const worldMap = `M 50 25 100 25 100 75 50 75 Z`;

function generateRandomPoints(count: number) {
  return Array.from({ length: count }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
  }));
}

function generateRandomConnections(points: { x: number; y: number }[], count: number) {
  return Array.from({ length: count }, () => {
    const start = points[Math.floor(Math.random() * points.length)];
    const end = points[Math.floor(Math.random() * points.length)];
    return { start, end, delay: Math.random() * 5 };
  });
}

export function CyberWorld() {
  const points = useMemo(() => generateRandomPoints(20), []);
  const connections = useMemo(() => generateRandomConnections(points, 15), [points]);

  return (
    <div className="fixed inset-0 pointer-events-none opacity-10">
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* World Map Base */}
        <motion.path
          d={worldMap}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Connection Lines */}
        {connections.map((connection, i) => (
          <motion.line
            key={i}
            x1={connection.start.x}
            y1={connection.start.y}
            x2={connection.end.x}
            y2={connection.end.y}
            stroke="currentColor"
            strokeWidth="0.1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 1, 0],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 3,
              delay: connection.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        {/* Points */}
        {points.map((point, i) => (
          <motion.circle
            key={i}
            cx={point.x}
            cy={point.y}
            r="0.5"
            fill="currentColor"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1.5, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              delay: point.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}
