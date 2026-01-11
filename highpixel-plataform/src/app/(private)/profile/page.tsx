import { ProfileBanner } from "@/app/components/profile/banner";
import { ProfileContent } from "@/app/components/profile/content";
import { ProfileSidebar } from "@/app/components/profile/sidebar";
import { Header } from "@/app/components/ui/header";
import { HeaderNotify } from "@/app/components/ui/header-notify";

const Profile = () => {
  return (
    <div className="min-h-screen bg-[#141518]">
      <Header />
      <HeaderNotify />
      <ProfileBanner />

      <div className="container px-4 pb-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row">
          <ProfileSidebar />
          <ProfileContent />
        </div>
      </div>
    </div>
  );
};

export default Profile;
