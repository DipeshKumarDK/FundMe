import React, { useState , useEffect } from "react";
import { motion , useAnimation } from "framer-motion"
import {useInView} from "react-intersection-observer";

function Questions() {
    const {ref , inView} = useInView();
    const animation = useAnimation();
  
    useEffect(() => {
      if(inView){
          animation.start({
              x:0,
              transition:{
                  duration:2 , type: 'spring'
              }
          })
      }
      if(!inView){
          animation.start({
              x:'-100vw'
          })
      }
    }, [inView])

  const [one , setOne] = useState("Y")
  const [two , setTwo] = useState("N")
  const [three , setThree] = useState("N")
  const [four , setFour] = useState("N") 

  const changeOne = () => {
    if(one==="Y"){
        setOne("N")
    }else{
        setOne("Y")
    }
  }

  const changeTwo = () => {
    if(two==="Y"){
        setTwo("N")
    }else{
        setTwo("Y")
    }
  }

  const changeThree = () => {
    if(three==="Y"){
        setThree("N")
    }else{
        setThree("Y")
    }
  }

  const changeFour = () => {
    if(four==="Y"){
        setFour("N")
    }else{
        setFour("Y")
    }
  }

  return (
    <div ref={ref} className="pt-8 pb-12 xl:pl-44 xl:pr-44 lg:pl-32 lg:pr-32 md:pl-16 md:pr-16 sm:pl-8 sm:pr-8 pl-2 pr-2 bg-white">
    <div className="flex flex-row w-full justify-center">
      <motion.div animate={animation}  className="mb-5 md:text-3xl sm:text-2xl text-xl font-semibold text-slate-700">Frequently Asked Quetions About Crowd Funding</motion.div>  
      </div>
      <div className="mt-3">
        <div className="flex flex-row w-full mb-4 justify-between">
          <div className="sm:text-xl text-lg font-semibold">
            Why should we use crowdfunding?
          </div>
          <button onClick={changeOne} className="text-lg text-slate-500 font-bold">{one==="N"?"+":"-"}</button>
        </div>
        <hr className="font-bold" />
        <div className={`mt-3 ${one==="Y"?"":"hidden"}`}>
           Crowdfunding is one of the most widely used ways for raising funds for a project or a campaign. 
           FundMe provides you a platform where you can publish a campaign and start receiving funds for your campaign. 
           We have helped a lot of people in raising funds for campaigns through this platform.
        </div>
      </div>
      <div className="mt-4">
        <div className="flex flex-row w-full mb-4 justify-between">
          <div className="sm:text-xl text-lg font-semibold">
            How much percentage of the donation goes to campaign?
          </div>
          <button onClick={changeTwo} className="text-lg text-slate-500 font-bold">{two==="N"?"+":"-"}</button>
        </div>
        <hr className="font-bold" />
        <div className={`mt-3 ${two==="Y"?"":"hidden"}`}>
        FundMe is a platform that is completely non-profit. No extra charges are charged to the funder or the reciever.  
        100% of the donated amount goes to the campaign creator.
        </div>
      </div>
      <div className="mt-4">
        <div className="flex flex-row w-full mb-4 justify-between">
          <div className="sm:text-xl text-lg font-semibold">
            Is it free to create a campaign?
          </div>
          <button onClick={changeThree} className="text-lg text-slate-500 font-bold">{three==="N"?"+":"-"}</button>
        </div>
        <hr className="font-bold" />
        <div className={`mt-3 ${three==="Y"?"":"hidden"}`}>
          FundMe is a platform that is completely non-profit. 
          You can create a campaign and start recieving funds for your project.
        </div>
      </div>
      <div className="mt-4">
        <div className="flex flex-row w-full mb-4 justify-between">
          <div className="sm:text-xl text-lg font-semibold">
            Can we change deadline of a campaign?
          </div>
          <button onClick={changeFour} className="text-lg text-slate-500 font-bold">{four==="N"?"+":"-"}</button>
        </div>
        <hr className="font-bold" />
        <div className={`mt-3 ${four==="Y"?"":"hidden"}`}>
          No. You can not change the deadline of a campaign once the campaign is published. 
          So, it's advised to decide a good deadline for your campaign after taking into consideration all important factors.
        </div>
      </div>
    </div>
  );
}

export default Questions;