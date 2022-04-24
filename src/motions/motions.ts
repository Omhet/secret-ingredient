export const menuVariants = {
  hidden: {
    clipPath: 'circle(0% at top right)',
  },
  visible: {
    clipPath: `circle(150% at top right)`,
    transition: { type: 'tween', duration: 1.5, ease: 'easeOut' },
  },
  exit: {
    clipPath: 'circle(0% at top right)',
    transition: {
      type: 'tween',
      duration: 1.5,
      ease: 'easeInOut',
    },
  },
};
export const buttonVariants = {
  hover: { scale: 1.1, transition: { type: 'spring', stiffness: 300 } },
};
export const button2Variants = {
  hover: { scale: 0.9, transition: { type: 'spring', stiffness: 300 } },
};
export const navItemVariants = {
  hover: {
    rotate: [0, -2, 0, 2, 0],
    transition: {
      repeat: Infinity,
      duration: 0.3,
    },
  },
};
export const levelContainerVariants = {
  hover: {
    scale: 0.95,
    transition: { type: 'spring', stiffness: 120, duration: 1.5 },
  },
};
export const levelVariants = {
  hover: {
    scale: 1.15,
    transition: { type: 'spring', stiffness: 120, duration: 1.5 },
  },
};
export const authorLinkVariants = {
  animate: (delay: number) => ({
    scale: [1, 1.02, 1, 0.98, 1],
    transition: {
      repeat: Infinity,
      duration: 0.7,
      delay,
    },
  }),
};

export const mobileNavItemVariants = {
  hover: {
    scale: 1.3,
    transition: { type: 'spring', stiffness: 300 },
  },
};
