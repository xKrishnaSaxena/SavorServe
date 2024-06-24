import React from "react";
import Link from "next/link";
import { MenuItem } from "@/types/Restaurant";

interface SidebarProps {
  menu: MenuItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ menu }) => {
  return (
    <div className="ml-24 w-64 h-full shadow-md bg-white-100 hidden lg-block">
      <ul>
        {menu.map((item, index) => (
          <li key={index} className="mb-4">
            <Link href={`#${item.category}`} legacyBehavior>
              <a className="text-lg font-semibold text-white hover:text-blue-400">
                {item.category}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
