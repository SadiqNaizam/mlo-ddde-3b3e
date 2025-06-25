import React, { useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface AnimatedCounterProps {
  /**
   * The numerical value to display and animate to.
   */
  value: number;
}

/**
 * A component that animates a numerical value smoothly when it changes.
 * Ideal for displaying values that update in real-time, like a cost estimator.
 */
const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value }) => {
  console.log('AnimatedCounter loaded');

  // Create a spring motion value. This provides a smooth, physics-based animation.
  // The configuration can be tweaked for different animation feels.
  const springValue = useSpring(value, {
    mass: 0.8,
    stiffness: 75,
    damping: 15,
  });

  // Create a transformed motion value to format the spring's output.
  // We round the value to the nearest integer and format it with commas.
  const displayValue = useTransform(springValue, (latest) => {
    return Math.round(latest).toLocaleString();
  });

  // Use an effect to update the spring's target value whenever the `value` prop changes.
  // This triggers the animation.
  useEffect(() => {
    springValue.set(value);
  }, [springValue, value]);

  return (
    <motion.span>
      {displayValue}
    </motion.span>
  );
};

export default AnimatedCounter;