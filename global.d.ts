import { MotionProps } from 'framer-motion';

declare module 'framer-motion' {
  interface MotionProps {
    className?: string;
  }
}
