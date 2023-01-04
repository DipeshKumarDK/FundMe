import React, { useContext, createContext } from "react";

import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext();

// this is where we get backend (contract from) {from thirdweb}
export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(
    "0xB4C96b6620c18cc4a25A130208F3a6e9829B9290"
  );

  // function createCampaign called
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );

  const { mutateAsync: deleteCampaign } = useContractWrite(
    contract,
    "deleteCampaign"
  );

  const address = useAddress();
  const connect = useMetamask();

  const startCampaign = async (form) => {
    try {
      const data = await createCampaign([
        address, 
        form.title,
        form.description,
        form.target,
        new Date(form.deadline).getTime(),
        form.image,
        form.visible,
        form.owner_name,
        form.video,
        form.tagline
      ]);

      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  const delCampaign = async (toDelete) => {
    console.log(toDelete);
    const deleted = await deleteCampaign([toDelete]);
    console.log("Deleted");
  };

  // get all campaigns at once
  const getCampaigns = async () => {
    const campaigns = await contract.call("getCampaigns");

    const AllCampaings = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(
        campaign.amountCollected.toString()
      ),
      image: campaign.image,
      visible: campaign.visible,
      video: campaign.video,
      tagline: campaign.tagline,
      owner_name: campaign.owner_name,
      pId: i,
    }));

    const needCampaigns = AllCampaings.filter(
      (campaign) => campaign.visible?._hex === "0x00"
    );

   return needCampaigns;
  };

  // get campaigns created by a specific user.
  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const Campaigns = allCampaigns.filter(
      (campaign) => campaign.owner === address
    );

    return Campaigns;
  };

  const getActiveCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const Campaigns = allCampaigns.filter(
      (campaign) => campaign.visible?._hex === '0x00'
    );

    return Campaigns;
  };

  const getSearchCampaigns = async (search) => {
    const allCampaigns = await getCampaigns();

    const Campaigns = allCampaigns.filter(
      (campaign) => campaign.title === search
    );

    return Campaigns;
  };

  // donate to the campaign
  const donate = async (pId, amount) => {
    const data = await contract.call("donateToCampaign", pId, {
      value: ethers.utils.parseEther(amount),
    });

    return data;
  };

  // get all donations list for a particular campaign
  const getDonations = async (pId) => {
    const donations = await contract.call("getDonators", pId);
    const n = donations[0].length;

    const AllDonations = [];

    for (let i = 0; i < n; i++) {
      AllDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString()),
      });
    }

    return AllDonations;
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign: startCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
        deleteCampaign: delCampaign,
        getSearchCampaigns,
        getActiveCampaigns
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
