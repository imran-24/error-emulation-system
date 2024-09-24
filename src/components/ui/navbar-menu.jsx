/* eslint-disable react/prop-types */


import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
  className
}) => {
  return (
    (<div onMouseEnter={() => setActive(item)} className={cn("relative ")}>
      <motion.p
        transition={{ duration: 0.3 }}
        className={cn("cursor-pointer flex items-center text-black hover:opacity-[0.9] dark:text-white", className)}>
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}>
          {active === item && (
            <div
              className="absolute top-[calc(100%_+_1rem)] left-1/2 transform -translate-x-1/2">
              <motion.div
                transition={transition}
                // layoutId ensures smooth animation
                layoutId="active"
                className="bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl">
                <motion.div
                  // layout ensures smooth animation
                  layout
                  className="min-w-36 w-max h-full p-4 ">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>)
  );
};

export const Menu = ({
  setActive,
  children
}) => {
  return (
    (<nav
      // resets the state
      onMouseLeave={() => setActive(null)}
      className="relative  dark:bg-black dark:border-white/[0.2] bg-white shadow-input flex items-center justify-center space-x-4 px-8 py-4 ">
      {children}
    </nav>)
  );
};

