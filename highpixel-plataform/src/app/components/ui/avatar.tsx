import Image from "next/image";

type Props = {
  src?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  isBorded?: boolean;
};

export const AvatarUser = ({
  src,
  size = "md",
  className = "",
  isBorded = true,
}: Props) => {
  const sizes: Record<string, string> = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-24 w-24",
  };
  return (
    <div
      className={`${sizes[size]} ${isBorded ? "overflow-hidden rounded-full border" : ""} ${className}`}
    >
      <Image
        src={src || "/avatar.jpg"}
        alt="avatar"
        width={96}
        height={96}
        className="object-cover"
      />
    </div>
  );
};

export default AvatarUser;
