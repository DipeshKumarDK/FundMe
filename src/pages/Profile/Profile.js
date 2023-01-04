import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import ProfileCom from "./ProfileCom";
import ProfileTop from "./ProfileTop";
import { useStateContext } from "../../context";

function Profile() { 
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getUserCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getUserCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);
  return (
    <div>
      <Navbar />
      <ProfileTop />
      <ProfileCom
        title="All Campaigns"
        isLoading={isLoading}
        campaigns={campaigns}
      />
      <Footer />
    </div>
  );
}

export default Profile;
