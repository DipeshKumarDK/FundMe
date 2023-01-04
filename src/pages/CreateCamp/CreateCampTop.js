import React from "react";
import { motion } from "framer-motion";

function CreateCampTop() {
  return (
    <div className="md:h-44 h-32 w-full bg-slate-900 xl:pl-32 lg:pl-24 md:pl-16 sm:pl-12 pl-4 pr-4 flex flex-col justify-center bg-no-repeat bg-cover">
      <motion.div
        initial={{ x: "-10vw", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 2, type: "spring" }}
        className="md:text-lg text-slate-300 mt-2"
      >
        Get started with raising funds for your cause.
      </motion.div>
      <motion.div
        initial={{ x: "100vw", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 2, type: "spring" }}
        className="md:text-xl sm:text-xl text-white font-semibold"
      >
        CREATE YOUR CAMPAIGN
      </motion.div>
      <motion.div
        initial={{ x: "-10vw", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 2, type: "spring" }}
        className="md:text-lg text-slate-300"
      >
        Make sure that you provide all necessary details.
      </motion.div>
    </div>
  );
}

export default CreateCampTop;
