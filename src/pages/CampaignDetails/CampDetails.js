import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import CampaignDetailComp from "./CampaignDetailComp";
import { useStateContext } from "../../context";

function CampDetails() {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  }; 

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);
  return (
    <div className="bg-[#13131a]">
      <Navbar />
      <CampaignDetailComp         
        title="All Campaigns"
        Loading={isLoading}
        campaigns={campaigns.slice(0,4)}/>
      <Footer />
    </div>
  );
}

export default CampDetails;
