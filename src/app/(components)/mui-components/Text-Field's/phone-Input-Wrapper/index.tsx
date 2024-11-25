"use client";

import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface CommonPhoneInputProps {
  value: any;
  onChange: (value: string) => void;
  country: string;
  errorMessage?: string;
}

const CommonPhoneInput: React.FC<CommonPhoneInputProps> = ({
  value,
  onChange,
  country,
  errorMessage,
}) => {
  return (
    <PhoneInput
      country={country}
      value={value}
      onChange={onChange}
      countryCodeEditable={false}
      enableLongNumbers={false}
      enableSearch={true}
      inputProps={{ required: true }}
      placeholder="Enter mobile number"
      onlyCountries={["in"]}
    />
  );
};

export default CommonPhoneInput;
