import Chat from "@/components/playground/Chat";
import NextIDEInterface from "@/components/playground/code/CodePreviewEnvironment";
import PlaygroundNavbar from "@/components/playground/PlaygroundNavbar";
import { PlaygroundPanels } from "@/components/playground/PlaygroundPanels";
import React from "react";

const page = () => {
  return (
    <div>
      <PlaygroundNavbar />

      <PlaygroundPanels
        leftPanel={
          <div className="h-full pl-2 pb-2">
            <Chat />
          </div>
        }
        rightPanel={
          <div className="h-full pr-2 pb-2">
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

export default page;
