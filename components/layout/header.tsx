import { motion } from "framer-motion";
import AlmaIcon from "../ui/icons/alma";

function DecorativeCircles() {
  return (
    <div className="relative w-40 h-40 hidden sm:flex items-center justify-center">
      <motion.div
        className="absolute w-32 h-32 bg-lime-300 rounded-full shadow-lg"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      <motion.div
        className="absolute w-24 h-24 bg-lime-400 rounded-full shadow-md top-4 left-4"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, rotate: 10 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      />
      <motion.div
        className="absolute w-16 h-16 bg-lime-500 rounded-full shadow-sm top-8 left-8"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, rotate: -10 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      />
    </div>
  );
}

export default function Header() {
  return (
    <div className="bg-[#e0f0bc] h-80 flex flex-wrap items-center justify-center">
      <DecorativeCircles />
      <div className="px-6 py-8 sm:px-8">
        <div className="text-center sm:text-left">
          <AlmaIcon className="w-12 sm:w-16 mb-5" />
          <h1 className="text-3xl sm:text-5xl font-bold text-black">
            Get An Assessment
            <br /> Of Your Immigration Case
          </h1>
        </div>
      </div>
    </div>
  );
}
