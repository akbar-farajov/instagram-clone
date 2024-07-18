import React from "react";
import { NAV_ITEMS } from "../constants/navigation";
import Link from "next/link";

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="sticky top-0 bottom-0 h-screen w-72  text-white flex flex-col justify-between py-4 px-2 border-r">
      <div>
        <h1 className="text-3xl font-bold mb-8">Instagram</h1>
        <nav>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center py-3 px-4 rounded-xl transition duration-100 hover:bg-gray-700"
            >
              <item.icon className="mr-3" size={26} />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      {children}
    </div>
  );
};

export default Sidebar;
