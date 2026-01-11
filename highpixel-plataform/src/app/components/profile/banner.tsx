import bannerImage from "../../../../public/banner.png";
import Image from "next/image";

export const ProfileBanner = () => {
  return (
    <div className="w-full flex justify-center px-4">
      <div className="relative w-full max-w-7xl h-64 overflow-hidden rounded-lg">
        <Image 
          src={bannerImage} 
          alt="Profile Banner" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80"></div>
      </div>
    </div>
  );
};
