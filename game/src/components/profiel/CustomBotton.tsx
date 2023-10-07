import React from "react";
import Image from "next/image";
import { CustomBotton } from "../../type";
const CustomBotton = ({ title, containerStyle, handleclick, btntype, textStyle, rightIcon }: CustomBotton) => {
  return (
    <button
      disabled={false}
      type={btntype || "button"}
      className={`custom-btn gap-2 ${containerStyle}`}
      onClick={handleclick}
    >
      <span className={`flex-1 ${textStyle}`}>{title}</span>
      <div>
        {
          rightIcon &&
          <Image
            src={rightIcon}
            alt={title}
            width={20}
            height={20}
          />
        }
      </div>
    </button >
  );
};

export default CustomBotton;
