import React from "react";
import SidebarUserInfo from "./SidebarUserInfo";

const Sidebar = () => {
  return (
    <nav className="h-screen hidden sm:flex flex-col sticky top-0 xl:mr-10 p-3">
      <div className="flex flex-col h-full justify-between">
        <div className="py-3">
          {/* <Image
            src={""}
            width={48}
            height={48}
            alt="Logo"
          /> */}
        </div>
        <SidebarUserInfo />
      </div>
    </nav>
  );
};

export default Sidebar;
