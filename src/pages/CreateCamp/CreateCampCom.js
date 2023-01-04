import React, { useState } from "react";
import pic from "../../assets/Disasters.webp";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import { checkIfImage } from "../../utils";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import Loader from "../../components/Loader";
import { useStateContext } from "../../context";

const CreateCampCom = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign } = useStateContext();

  const [form, setForm] = useState({
    owner_name: "",
    title: "",
    description: "",
    target : '',
    deadline: "",
    image: "",
    visible: "0",
    tagline: "",
    video: ""
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
 
    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true);

        // 18 is decimals
        await createCampaign({
          ...form,
          target: ethers.utils.parseUnits(form.target, 18),
          visible: 0,
        });
        setIsLoading(false);
        navigate("/");
      } else {
        alert("Provide valid image URL");
        setForm({ ...form, image: "" });
      }
    });
  };

  return (
    <div className="bg-slate-800 flex justify-center items-center flex-col xl:pl-32 lg:pl-24 md:pl-16 sm:pl-12 pl-4 xl:pr-32 lg:pr-24 md:pr-16 sm:pr-12 pr-4 :pt-8 pt-5 md:pb-10 pb-7">
      {isLoading && <Loader />}
      <form
        onSubmit={handleSubmit}
        className="w-full mt-[10px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Your Name *"
            placeholder="Enter your name"
            inputType="text"
            value={form.owner_name}
            handleChange={(e) => handleFormFieldChange("owner_name", e)}
          />
          <FormField
            labelName="Campaign Title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange("title", e)}
          />
        </div>

        <FormField
          labelName="Story *"
          placeholder="Write your story"
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFieldChange("description", e)}
        />

        <div className="w-full sm:flex hidden justify-start items-center p-4 bg-gradient-to-r from-slate-800 to-slate-700 h-[120px] rounded-[10px]">
          <img
            src={pic}
            alt="money"
            className="w-[40px] h-[40px] object-contain"
          />
          <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">
            You will get 100% of the raised amount
          </h4>
        </div>

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange("target", e)}
          />
          <FormField
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange("deadline", e)}
          />
        </div>

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Campaign Image *"
            placeholder="Place Image URL of your campaign"
            inputType="url"
            value={form.image}
            handleChange={(e) => handleFormFieldChange("image", e)}
          />
          <FormField
            labelName="Campaign Video *"
            placeholder="Place Embeddable YT Video URL of your campaign"
            inputType="url"
            value={form.video}
            handleChange={(e) => handleFormFieldChange('video', e)}
          />
        </div>

        <FormField
          labelName="Campaign Tagline *"
          placeholder="Enter a good tagline for your campaign"
          inputType="text"
          value={form.tagline}
          handleChange={(e) => handleFormFieldChange('tagline', e)}
        />

        <div className="flex justify-center items-center mt-[20px]">
          <CustomButton
            btnType="submit"
            title="Submit new campaign"
            styles="bg-gradient-to-r from-purple-900 to-purple-800"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCampCom;
