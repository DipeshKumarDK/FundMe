import React from "react";

const FormField = ({labelName,placeholder,inputType,isTextArea,handleChange}) => {
  return (
    <label className="flex-1 w-full flex flex-col">
      {labelName && (
        <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#d2d2d7] mb-[10px]">
          {labelName}
        </span>
      )}
      {isTextArea ? (
        <textarea
          required
            onChange={handleChange}
          rows={10}
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#8e8e9e] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#a1a7b5] rounded-[10px] sm:min-w-[300px]"
        />
      ) : (
        <input
          required
            onChange={handleChange}
          type={inputType}
          step="0.1"
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#8f8f9b] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#999eac] rounded-[10px] sm:min-w-[300px]"
        />
      )}
    </label>
  );
};

export default FormField;
