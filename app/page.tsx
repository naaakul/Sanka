import React from "react";
import Navbar from "@/components/session/Navbar";
import Background from "@/components/ui/background";
import Builder from "@/components/ui/builder";

const page = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center w-full bg-black overflow-hidden">
      <Background/>
      {/* <Navbar /> */}
      <Builder/>
    </div>
  );
};

export default page;
