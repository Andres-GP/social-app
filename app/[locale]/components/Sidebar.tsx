import React from "react";
import SidebarUserInfo from "./SidebarUserInfo";

const Sidebar = () => {
  return (
    <nav className="sm:h-fit md-h-screen flex-col md:sticky sm:relative top-0 xl:mr-10 p-3">
      <div className="flex flex-col">
        <SidebarUserInfo />
      </div>
    </nav>
  );
};

export default Sidebar;
