"use client";

import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { KeyboardEvent, useState } from "react";

type Props = {
  placeholder: string;
  password?: boolean;
  filled?: boolean;
  icon?: IconDefinition;
  value?: string;
  border?: boolean;
  onChange?: (newValue: string) => void;
  onEnter?: () => void;
};

export const Input = ({
  placeholder,
  password,
  filled,
  icon,
  value,
  onChange,
  onEnter,
  border,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code.toLowerCase() === "enter" && onEnter) {
      onEnter();
    }
  };

  return (
    <div
      className={`"flex h-14 items-center rounded-xl ${filled && "bg-[#151515]"} ${
        border === true && "border-2 border-[#3b3b3b] has-[:focus]:border-white"
      }`}
    >
      {icon && (
        <FontAwesomeIcon icon={icon} className="ml-4 size-6 text-gray-500" />
      )}
      <input
        type={password && !showPassword ? "password" : "text"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        className="h-full flex-1 bg-transparent px-4 text-white outline-none"
        onKeyUp={handleKeyUp}
      />

      {password && (
        <FontAwesomeIcon
          onClick={() => setShowPassword(!showPassword)}
          icon={showPassword ? faEye : faEyeSlash}
          className="mr-4 size-6 cursor-pointer text-gray-500"
        />
      )}
    </div>
  );
};
