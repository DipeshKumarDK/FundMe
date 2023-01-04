import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useStateContext } from "../../context";
import Loader from "../../components/Loader";
import { calculateBarPercentage, daysLeft } from "../../utils";
import pic from "../../assets/Disasters.webp";
import CountBox from "../../components/CountBox";
import CustomButton from "../../components/CustomButton";
import CampaignCard from "../../components/CampaignCard";

function CampaignDetailComp({ Loading, campaigns }) {
  const { state } = useLocation();
  const navigate = useNavigate();

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };
  const { donate, getDonations, contract, address, deleteCampaign } =
    useStateContext(); 

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [donators, setDonators] = useState([]);

  const deleteCam = async () => {
    window.alert("Campaign's deadline has been reached. You havre to delete campaign")
    setIsLoading(true)
    const state_pId = state.pId;
    const data = await deleteCampaign(state_pId);
    setIsLoading(false)
    navigate("/");
  };

  const goHome = async () => {
    window.alert("Campaign's deadline has been reached")
    navigate("/");
  };


  const remainingDays = daysLeft(state.deadline); // daysleft function imported from utils

  const fetchDonators = async () => {
    const data = await getDonations(state.pId);

    setDonators(data);
  };

  useEffect(() => {
    if (contract) fetchDonators();
  }, [contract, address]);

  useEffect(() => {
    if (remainingDays <= 0 && address === state?.owner){ deleteCam();}
  }, [remainingDays]);

  useEffect(() => {
    if (remainingDays <= 0 && address !== state?.owner){ goHome();}
  }, [remainingDays]);

  const handleDonate = async () => {
    setIsLoading(true);
    await donate(state.pId, amount);
    navigate("/");
    setIsLoading(false);
  };

  return (
    <div className=" xl:pl-32 lg:pl-16 sm:pl-8 xl:pr-32 lg:pr-16 sm:pr-8 pl-3 pr-3 pt-8 pb-8 w-full">
      {isLoading && <Loader />}
      <div className="flex lg:flex-row flex-col w-full">
        <div className="lg:w-7/12 w-full">
          <div className="lg:block sm:hidden w-full">
            <img
              src={state.image || pic}
              className="lg:w-full w-full border border-gray-500 rounded-t-sm rounded-b-sm h-72"
            />
            <div className="text-lg text-slate-200 lg:w-full w-full pl-2 pr-2 pt-6 pb-6 flex flex-row justify-center border border-gray-500">
              <div className="truncate">{state.title}</div>
            </div>
            <div className=" text-slate-200 lg:w-full w-full pl-2 pr-2 pt-6 pb-6 flex flex-row justify-center border rounded-b-sm border-gray-500">
              <div className="truncate">{state?.tagline}</div>
            </div>
          </div>
          <div className="lg:hidden hidden w-full sm:flex flex-row">
            <img src={pic} className="w-1/2 border border-gray-500 h-48" />
            <div className="w-1/2 flex flex-col justify-center h-48 border border-gray-500">
              <div className="h-24 flex flex-col pl-4 pr-4 justify-center text-slate-200">
                <div className="truncate">{state.title}</div>
              </div>
              <div className="h-24 flex pl-4 pr-4 border-t border-gray-500 flex-col justify-center text-slate-200">
                <div className="truncate">{state.tagline}</div>
              </div>
            </div>
          </div>
          <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
            <div
              className="absolute h-full bg-[#4acd8d]"
              style={{
                width: `${calculateBarPercentage(
                  state.target,
                  state.amountCollected
                )}%`,
                maxWidth: "100%",
              }}
            ></div>
          </div>
        </div>
        <div className="lg:w-1/2 w-full lg:mt-0 mt-6 lg:ml-6 flex flex-col p-4 bg-[#272730] rounded-[10px]">
          <p className="font-epilogue fount-medium text-[25px] leading-[30px] text-center text-[#e0e1ea]">
            Fund the campaign
          </p>
          <div className="mt-[25px]">
            <input
              type="number"
              placeholder="ETH 0.1"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#7f7f8a] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#7a8191] rounded-[10px]"
            />

            <div className="my-[10px] p-4 bg-[#13131a] rounded-[10px]">
              <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">
                Back It Because You Believe In It.
              </h4>
              <p className="mt-[10px] font-epilogue font-normal leading-[22px] text-[#808191]">
                We are all in this together. Each and every one of us can make a
                difference.
              </p>
            </div>

            <div className="my-[10px] p-4 mb-4 mt-2 bg-[#13131a] rounded-[10px]">
              <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">
                Contribute towards the cause of campaign.
              </h4>
              <p className="mt-[10px] font-epilogue font-normal leading-[22px] text-[#808191]">
                Your small contribution will be very important in making the campaign a success.
              </p>
            </div>

            <CustomButton
              btnType="button"
              title="Fund Campaign" 
              styles="w-full bg-[#8c6dfd]"
              handleClick={handleDonate}
            />
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 lg:mt-16 mt-8">
        <CountBox title="Days Left" value={remainingDays} />
        <CountBox
          title={`Raised of ${state.target}`}
          value={state.amountCollected}
        />
        <CountBox title="Total Backers" value={donators.length} />
        <CountBox title="Campaign Started By" value={state?.owner_name} />
      </div>

      <div className="lg:mt-16 mt-10">
        <div className="font-epilogue sm:text-2xl text-xl text-white">
          Story Behind The Campaign
        </div>
        <div className="text-slate-200 mt-5 fomnt-serif leading-15">
          {state.description}
        </div>
      </div>

      <div className="lg:mt-8 mt-6">
        <iframe
          className="rounded"
          width="100%"
          height="400px"
          src={state.video}
          title="YouTube video player"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>

      <div className="sm:text-2xl text-xl font-epilogue mt-10 text-white">Explore More Campaigns</div>
      {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] mt-[20px] leading-[30px] text-[#818183]">
            No Campaigns found.
          </p>
        )}
      <div className="grid xl:grid-cols-4 md:grid-cols-3 pt-4 mt-2 sm:grid-cols-2 grid-cols-1 items-baseline">
        {!Loading &&
          campaigns.length > 0 &&
          campaigns.map((campaign) => (
            <CampaignCard
              key={campaign?.pId}
              {...campaign}
              handleClick={() => handleNavigate(campaign)}
            />
          ))}
      </div>
    </div>
  );
}

export default CampaignDetailComp;
