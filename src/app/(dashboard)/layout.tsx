import React from "react";
import SideBar from "./_components/sidebar";
import OrgSidebar from "./_components/org-sidebar";
import Navbar from "./navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full">
      <SideBar />
      <div className="pl-[60px] h-full">
        <div className="flex gap-x-3 h-full">
          <OrgSidebar />
          <div className="h-full flex-1">
            <Navbar />
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
