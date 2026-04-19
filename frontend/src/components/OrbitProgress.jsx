import React, { useEffect, useState, useRef } from 'react';

const OrbitProgress = ({ percent = 0, size = 120, strokeWidth = 8, orbitColor = 'var(--brand-primary, #6366F1)' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  
  // Safe bounded percentage
  const safePercent = Math.min(Math.max(percent, 0), 100);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Trigger only once when it comes into view
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  // Calculate offset. If not visible, offset equals circumference (empty).
  const strokeDashoffset = isVisible ? circumference - (safePercent / 100) * circumference : circumference;

  // We use an inline style tag for the custom animation to avoid modifying global CSS configurations
  return (
    <div 
      ref={containerRef} 
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <style>
        {`
          @keyframes orbit-spin {
            from { transform: rotate(-90deg); }
            to { transform: rotate(270deg); }
          }
          .animate-orbit {
            animation: orbit-spin 2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          }
        `}
      </style>
      
      {/* Container for the SVG that handles the rotation animation */}
      <div className={`absolute inset-0 w-full h-full ${isVisible ? 'animate-orbit' : '-rotate-90'}`}>
        <svg 
          width={size} 
          height={size}
          className="w-full h-full"
        >
          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="var(--border-soft, #374151)"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress orbit */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={orbitColor}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: strokeDashoffset,
              transition: 'stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        </svg>
      </div>

      {/* Center Percentage Text */}
      <div className="absolute flex flex-col items-center justify-center z-10">
        <span className="text-2xl font-bold text-[var(--text-primary)]">
          {isVisible ? safePercent : 0}<span className="text-sm opacity-70">%</span>
        </span>
      </div>
    </div>
  );
};

export default OrbitProgress;
