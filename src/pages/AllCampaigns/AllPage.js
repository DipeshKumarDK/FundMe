import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import AllCamTop from "./AllCamTop";
import CampaignsList from "./CampaignsList";
import { useStateContext } from "../../context";

function AllPage() {
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
    <div> 
      <Navbar />
      <AllCamTop />
      <CampaignsList
        title="All Campaigns"
        isLoading={isLoading}
        campaigns={campaigns}
      />
      <Footer />
    </div>
  );
}

export default AllPage;
