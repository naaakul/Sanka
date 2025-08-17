import Chat from "@/components/playground/Chat";
import NextIDEInterface from "@/components/playground/code/CodePreviewEnvironment";
import PlaygroundNavbar from "@/components/playground/PlaygroundNavbar";
import { PlaygroundPanels } from "@/components/playground/PlaygroundPanels";

const Page = ({ params }: { params: { category: string } }) => {
  return (
    <div className="h-screen flex flex-col">
      <PlaygroundNavbar />

      <PlaygroundPanels
        leftPanel={
          <div className="pl-2 pb-2">
            <Chat category={params.category} />
          </div>
        }
        rightPanel={
          <div className="pr-2 pb-2">
            <NextIDEInterface />
          </div>
        }
        defaultLeftWidth={50}
        minLeftWidth={30}
        maxLeftWidth={60}
      />
    </div>
  );
};

export default Page;
