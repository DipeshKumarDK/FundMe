import React from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import CreateCampCom from "./CreateCampCom";
import CreateCampTop from "./CreateCampTop";

function CreateCampaign() {
  return (
    <div>
      <Navbar />
      <CreateCampTop />
      <CreateCampCom />
      <Footer />
    </div>
  );
}

export default CreateCampaign;
