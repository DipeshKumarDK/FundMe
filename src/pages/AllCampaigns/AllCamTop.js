import React from "react";
import { motion } from "framer-motion";

function AllCamTop() {
  return (
    <div className="md:h-44 sm:h-32 h-36 w-full bg-slate-900 xl:pl-32 lg:pl-24 md:pl-16 sm:pl-12 pl-4 pr-4 flex flex-col justify-center bg-no-repeat bg-cover">
      <motion.div
        initial={{ x: "-10vw", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 2, type: "spring" }}
        className="md:text-lg text-slate-300 sm:mt-2"
      >
        You don't need a reason for helping those in need.
      </motion.div>
      <motion.div
        initial={{ x: "100vw", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 2, type: "spring" }}
        className="md:text-xl sm:text-lg text-white mt-2"
      >
        ALL FUND-RAISING CAMPAIGNS
      </motion.div>
      <motion.div
        initial={{ x: "-10vw", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 2, type: "spring" }}
        className="md:text-lg text-slate-300 mt-2"
      >
        Help raising funds for the cause of these campaigns.
      </motion.div>
    </div>
  );
}

export default AllCamTop;
