import React, { useState , useRef } from "react";
import { CgProfile } from "react-icons/cg";
import { AiFillHome } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiSearch } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../context";
import { useSelector, useDispatch } from 'react-redux';
import { changeSearch} from "../actions/index"

function Navbar(props) {
  const [hi, setHi] = useState("N");

  const myTotal=useSelector((state)=> 
  state.changeTotal
  );

  const changeHi = () => { 
    if (hi === "Y") {
      setHi("N");
    } else {
      setHi("Y");
    }
  };
  const navigate = useNavigate();

  const { connect, address } = useStateContext();

  const search = useRef();

  const dispatch = useDispatch();

  const Search = () => {
    dispatch(changeSearch(search.current.value));
    navigate("/all")
  }

  return (
    <div>
      <div
        className={`xl:pl-24 lg:pl-16 md:pl-4 xl:pr-24 lg:pr-16 md:pr-4 pr-3 pt-1 pb-1 flex flex-row ${
          props?.yes === "no" ? "md:bg-purple-800" : "md:bg-slate-200"
        } w-full bg-slate-600`}
      >
        <div className="md:hidden flex flex-row ml-4 mr-2 mb-1 mt-1">
          <GiHamburgerMenu
            className="h-8 w-8 mt-0.5 p-1 bg-transparent text-white cursor-pointer"
            onClick={changeHi}
          />
        </div>
        <div
          className={`w-1/4 ${
            props?.yes === "no" ? "md:text-white" : "md:text-slate-800"
          } md:block hidden text-white font-semibold lg:pl-4 pl-1 pt-2 pb-2 md:text-xl text-lg font-sans`}
          id="title"
        >
          FUND ME
        </div>
        <div className="md:w-3/4 w-full flex flex-row justify-end">
          <Link to="/profile" className={`mr-4 pt-0.5`}>
            <CgProfile className="h-8 mt-1 w-8 md:text-slate-900 text-slate-200" />
          </Link>
          <Link to="/" className={`mr-4 lg:block hidden pt-0.5`}>
            <AiFillHome className="h-8 mt-1 w-8 text-slate-900" />
          </Link>
          <div className="lg:flex sm:flex hidden flex-row max-w-[458px] py-2 pl-4 pr-2 h-[44px] mr-4 bg-slate-800 rounded-[100px]">
            <input ref={search}
              type="text"
              placeholder="Search for campaigns"
              className="flex lg:w-72 w-56 font-epilogue font-normal text-[14px] placeholder:text-[#bfc8de] text-white bg-transparent outline-none"
            />

            <div className="w-[30px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer" onClick={Search}>
              <FiSearch className="w-[15px] h-[15px] text-white object-contain" />
            </div>
          </div>
          <div className="flex flex-row">
            <div
              onClick={() => {
                if (address) navigate("/create-campaign");
                else connect();
              }}
            >
              <div className="text-white bg-gradient-to-r cursor-pointer from-slate-800 to-slate-700 pt-2 pb-2 mt-0.5 sm:text-base text-sm pl-3 pr-3 rounded">
                {address ? "CREATE A CAMPAIGN" : "CONNECT"}
              </div>
            </div>
          </div>
        </div>
      </div>
   
      <div
        className={`flex-row hidden bg-slate-800 w-full ${
          props?.yes === "no" ? "sm:hidden" : "sm:flex"
        } pt-2 pb-2 justify-center 2xl:pl-44 xl:pl-32 lg:pl-24 md:pl-6 2xl:pr-44 xl:pr-32 lg:pr-24 md:pr-6`}
      >
        <div className="flex flex-col justify-center">
        <div className="text-sm font-semibold pb-0.5 text-white pt-0.5">
          ACTIVE CAMPAIGNS - {myTotal}
        </div>
        </div>
        <Link to="/all" className="text-slate-800 ml-10 bg-gradient-to-r font-medium cursor-pointer from-slate-400 to-slate-200 pt-2 pb-2 sm:text-base text-sm pl-3 pr-3 rounded">
          EXPLORE CAMPAIGNS
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
