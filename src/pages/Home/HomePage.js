import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import HomeList from "./HomeList";
import HomePic from "./HomePic";
import Journey from "./Journey";
import Questions from "./Questions";
import { useStateContext } from "../../context";
import { useDispatch } from 'react-redux';
import {changeTotal} from "../../actions/index"

function HomePage() {  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getCampaigns , getActiveCampaigns } = useStateContext();

  const dispatch = useDispatch()

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    data.sort((a,b)=>b.amountCollected - a.amountCollected) // to get funds with most funds
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  const fetchActiveCampaigns = async () => {
    setIsLoading(true);
    const data = await getActiveCampaigns();
    dispatch(changeTotal(data?.length))
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchActiveCampaigns();
  }, [address, contract]);

  return (
    <div>
      <Navbar yes="yes" />
      <HomePic />
      <Journey />
      <HomeList name="MOST FUNDED" title="All Campaigns"
        isLoading={isLoading}
        campaigns={campaigns.slice(0,4)} />
      <Questions/>
      <Footer />
    </div>
  );
}

export default HomePage;
