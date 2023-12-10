import { motion } from "framer-motion";

export default function ExpandIcon({
  className,
  delay,
}: {
  className?: string;
  delay: number;
}) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 300 100"
      className={className}
      initial={{ y: "30%" }}
      animate={{ y: "-30%" }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "easeOut",
        repeatType: "reverse",
        delay,
      }}
    >
      <g>
        <polygon points="0,69 150,0 300,69 300,100 150,40 0,100" />
      </g>
    </motion.svg>
  );
}
