import React from "react";
import { motion } from "framer-motion";

function ProfileTop() {
  return (
    <div className="md:h-44 sm:h-32 h-36 w-full bg-slate-900 xl:pl-32 lg:pl-24 md:pl-16 sm:pl-12 pl-4 pr-4 flex flex-col justify-center bg-no-repeat bg-cover">
      <motion.div
        initial={{ x: "-10vw", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 2, type: "spring" }}
        className="md:text-lg text-slate-300"
      >
        You have created some campaigns by now.
      </motion.div>
      <motion.div
        initial={{ x: "100vw", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 2, type: "spring" }}
        className="md:text-lg text-white mt-2"
      >
        CAMPAIGNS CREATED BY YOU
      </motion.div>
      <motion.div
        initial={{ x: "-10vw", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 2, type: "spring" }}
        className="md:text-lg text-slate-300 mt-2"
      >
        You are getting good funds for your campaigns.
      </motion.div>
    </div>
  );
}

export default ProfileTop;
