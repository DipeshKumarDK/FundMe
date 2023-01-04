import React from "react";
import CampaignCard from "../../components/CampaignCard";
import loader from "../../assets/loader.svg";
import { useNavigate } from "react-router-dom";

function ProfileCom({ isLoading, campaigns }) {
  const navigate = useNavigate();

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };

  return (
    <div className="bg-slate-800 min-h-[450px] xl:pl-32 lg:pl-24 sm:pl-12 lg:pr-32 xl:pr-32 sm:pr-12 pl-3 pr-3">
      <div className="flex flex-wrap gap-[26px]">
        {isLoading && (
          <img
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] mt-[20px] object-contain"
          />
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] mt-[20px] leading-[30px] text-[#818183]">
            You have not created any campigns yet
          </p>
        )}
      </div>
      <div className="grid xl:grid-cols-4 md:grid-cols-3 pt-4 pb-4 sm:grid-cols-2 grid-cols-1 items-baseline">
        {!isLoading &&
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

export default ProfileCom;
