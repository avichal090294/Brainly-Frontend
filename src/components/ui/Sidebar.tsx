import { BlogIcon } from "../../icons/BlogIcon";
import { LogoIcon } from "../../icons/LogoIcon";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { SideBarItem } from "./SidebarItem";

export const Sidebar = () => {
  return (
    <>
      <div className="pl-4 pt-4 w-64 bg-white shadow h-screen fixed left-0 top-0 text-gray-600 ">
        <div className="flex text-2xl font-semibold items-center gap-2 text-purple-500 text-shadow-md cursor-pointer">
          <LogoIcon size="md" />
          Brainly
        </div>
        <div className="mt-8 cursor-pointer">
          <SideBarItem text="Twitter" icon={<TwitterIcon size="sm" />} />
          <SideBarItem text="YouTube" icon={<YoutubeIcon size="sm" />} />
          <SideBarItem text="Blogs" icon={<BlogIcon size="sm" />} />
        </div>
      </div>
    </>
  );
};
