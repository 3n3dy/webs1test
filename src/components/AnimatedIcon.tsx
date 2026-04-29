import { motion, type TargetAndTransition, type Transition } from "framer-motion";
import { type ReactNode } from "react";

interface AnimatedIconProps {
  children: ReactNode;
  type?:
    | "bounce"
    | "float"
    | "pulse"
    | "scale"
    | "spin"
    | "spin-reverse"
    | "wiggle"
    | "shake"
    | "swing"
    | "heartbeat"
    | "glow"
    | "fade-in"
    | "fade-out"
    | "zoom-in"
    | "zoom-out"
    | "slide-up"
    | "slide-down"
    | "slide-left"
    | "slide-right"
    | "rotate-slow"
    | "rotate-fast"
    | "flip"
    | "tada";
  className?: string;
}

type AnimationConfig = {
  animate?: TargetAndTransition;
  whileHover?: TargetAndTransition;
  transition?: Transition;
};

const animations: Record<NonNullable<AnimatedIconProps["type"]>, AnimationConfig> = {
  bounce: {
    animate: { y: [0, -10, 0] },
    transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
  },
  float: {
    animate: { y: [0, -15, 0] },
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
  pulse: {
    animate: { scale: [1, 1.05, 1] },
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  },
  scale: {
    animate: { scale: 1 },
    whileHover: { scale: 1.1 },
    transition: { duration: 0.3 },
  },
  spin: {
    animate: { rotate: 360 },
    transition: { duration: 2, repeat: Infinity, ease: "linear" },
  },
  "spin-reverse": {
    animate: { rotate: -360 },
    transition: { duration: 2, repeat: Infinity, ease: "linear" },
  },
  "rotate-slow": {
    animate: { rotate: 360 },
    transition: { duration: 4, repeat: Infinity, ease: "linear" },
  },
  "rotate-fast": {
    animate: { rotate: 360 },
    transition: { duration: 1, repeat: Infinity, ease: "linear" },
  },
  wiggle: {
    animate: { rotate: [-3, 3, -3, 3, 0] },
    transition: { duration: 0.8, repeat: Infinity, ease: "easeInOut" },
  },
  shake: {
    animate: { x: [-5, 5, -5, 5, 0] },
    transition: { duration: 0.5, repeat: Infinity },
  },
  swing: {
    animate: { rotate: [0, 15, -10, 5, -5, 0] },
    transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
  },
  heartbeat: {
    animate: { scale: [1, 1.1, 1, 1.15, 1] },
    transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
  },
  "zoom-in": {
    animate: { scale: [0, 1] },
    transition: { duration: 0.5, ease: "easeOut" },
  },
  "zoom-out": {
    animate: { scale: [1.2, 1] },
    transition: { duration: 0.5, ease: "easeOut" },
  },
  "fade-in": {
    animate: { opacity: [0, 1] },
    transition: { duration: 0.8, ease: "easeOut" },
  },
  "fade-out": {
    animate: { opacity: [1, 0] },
    transition: { duration: 0.8, ease: "easeOut" },
  },
  glow: {
    animate: { scale: [1, 1.05, 1] },
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  },
  "slide-up": {
    animate: { y: [20, 0], opacity: [0, 1] },
    transition: { duration: 0.6, ease: "easeOut" },
  },
  "slide-down": {
    animate: { y: [-20, 0], opacity: [0, 1] },
    transition: { duration: 0.6, ease: "easeOut" },
  },
  "slide-left": {
    animate: { x: [20, 0], opacity: [0, 1] },
    transition: { duration: 0.6, ease: "easeOut" },
  },
  "slide-right": {
    animate: { x: [-20, 0], opacity: [0, 1] },
    transition: { duration: 0.6, ease: "easeOut" },
  },
  flip: {
    animate: { rotateY: 360 },
    transition: { duration: 1, ease: "easeInOut" },
  },
  tada: {
    animate: {
      scale: [1, 0.9, 0.9, 1.1, 1.1, 1.1, 1, 1, 1],
      rotate: [0, -3, -3, 3, -3, 3, 0, 0, 0],
    },
    transition: { duration: 1.5, repeat: Infinity, repeatDelay: 2 },
  },
};

export const AnimatedIcon = ({
  children,
  type = "scale",
  className,
}: AnimatedIconProps) => {
  const anim = animations[type] || animations.scale;

  return (
    <motion.div
      className={className}
      animate={anim.animate}
      whileHover={anim.whileHover}
      transition={anim.transition}
      style={{ display: "inline-block" }}
    >
      {children}
    </motion.div>
  );
};
