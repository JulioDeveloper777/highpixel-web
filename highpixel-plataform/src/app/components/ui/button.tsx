import { ExternalLink } from "lucide-react";

type ButtonProps = React.ComponentProps<"button">;

type Props = ButtonProps & {
  label?: string;
  size?: 1 | 2 | 3 | 4;
  borderounded?: boolean;
  background?: "white" | "transparent" | "red";
  icon?: "link";
};

export const Button = ({
  label,
  size = 1,
  borderounded,
  icon,
  background,
  ...rest
}: Props) => {
  return (
    <button
      className={`--font-rubik flex cursor-pointer items-center justify-center rounded-[10px] p-3 font-medium text-white transition-all hover:brightness-75 ${size === 1 && "h-14 text-lg"} ${size === 2 && "h-10 w-32 text-sm lg:text-base"} ${size === 3 && "size-11 text-xs font-bold"} ${size === 4 && "h-7 w-20 text-xs font-bold"} ${borderounded === true && "rounded-full"} ${background === "white" && "bg-[#FFFFFF]"} ${background === "transparent" && "bg-transparent"} ${background === "red" && "bg-[#D60620]"}`}
      {...rest}
    >
      {icon === "link" && <ExternalLink size={40} color="#c8c8c8" />}
      {label}
    </button>
  );
};
