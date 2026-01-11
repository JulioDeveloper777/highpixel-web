import { TimelineFeed } from "@/app/components/timeline/feed";
import { TimelineSidebar } from "@/app/components/timeline/sidebar";
import { TimelineSuggestionsSidebar } from "@/app/components/timeline/suggestions-sidebar";
import { Header } from "@/app/components/ui/header";

const Timeline = () => {
  return (
    <div className="min-h-screen bg-[#141518]">
      <Header />

      <div className="container mx-auto max-w-[1600px] px-4 py-6">
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="lg:w-96">
            <TimelineSidebar />
          </div>
          <div className="flex-1 lg:max-w-[700px]">
            <TimelineFeed />
          </div>
          <div className="lg:w-[280px] xl:w-[300px]">
            <TimelineSuggestionsSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;