import React, { useEffect, useState } from "react";
import pic1 from "../../assets/Disasters.webp";
import pic3 from "../../assets/Education1.jpg";
import pic2 from "../../assets/start-up.jpg";
import pic4 from "../../assets/disaster.jpg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Homepic() {
  const [back, setBack] = useState(pic1);

  const getBack = () => {
    if (back === pic1) {
      setBack(pic2);
    } else if (back === pic2) {
      setBack(pic3);
    }
    else if (back === pic3) {
      setBack(pic1);
    }
    else if (back === pic4) {
      setBack(pic1);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getBack();
    }, 5000);
  }, [back]);

  return (
    <div
      id="mid"
      className="h-120 w-full flex flex-row rounded-b justify-start bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${back})` }}
    >
      <div className={`text-white h-full flex flex-col justify-center xl:pl-36 md:pl-24 sm:pl-20 pl-4 xl:pr-44 md:pr-24 pr-3 lg:w-7/12 md:w-3/4 sm:w-11/12`}>
        <motion.div
          initial={{ x: "-10vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 2, type: "spring" }}
          className="text-slate-400 sm:text-base text-sm sm:font-medium font-semibold"
        >
          HELPING OTHERS IS THE SECRET OF HAPPINESS
        </motion.div>
        <motion.div
          initial={{ x: "100vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 2, type: "spring" }}
          className="sm:text-2xl text-xl wq:pt-1 pt-2 font-medium w-full"
        >
          LET'S EXPLORE VARIOUS FUND-RAISING CAMPAIGNS
        </motion.div>
        <motion.div
          initial={{ x: "-10vw", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 2, type: "spring" }}
          className="text-slate-400 sm:text-base text-sm w-full wq:pt-1 pt-2 sm:font-medium font-semibold"
        >
          MAKE THE RIGHT CALL AND CONTRIBUTE FOR GOOD
        </motion.div>
        <Link to="/all">
          <button className="text-white bg-gradient-to-r from-slate-800 to-slate-600 rounded sm:mt-4 mt-1 pt-2 pb-2 sm:text-base pl-3 pr-3">
            EXPLORE MORE
          </button>
        </Link>
      </div>


      <div className=" bg-slate-100 lg:flex font-serif mt-20 mb-24 w-5/12 hidden flex-col justify-center pl-10 pr-2">
        <div className="xl:text-4xl text-3xl">
          Raise Funds For Your Campaign Using CrowdFunding.
        </div>
        <div className="2xl:mt-4 mt-2 xl:text-2xl text-xl text-slate-800">
          If You Are Up For A Good Cause And Want Funding, You Landed At The
          Right Platform.
        </div>
        <Link to="/create-campaign" className="2xl:mt-6 mt-4">
          <motion.button
            initial={{ x: "100vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 2, type: "spring" }}
            className="text-white bg-gradient-to-r from-slate-800 to-slate-700 pt-2 pb-2 sm:text-base text-sm pl-3 pr-3 rounded"
          >
            CREATE A CAMPAIGN
          </motion.button>
        </Link>
      </div>
    </div>
  );
}

export default Homepic;
