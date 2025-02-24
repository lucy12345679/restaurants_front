"use client";

import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { useDrawer } from "@/hooks/use-drawer";
import { useUser } from "@/hooks/use-user";
import { ISidebarItem } from "@/interface";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaRegUser, FaListUl } from "react-icons/fa";
import { IoExitOutline } from "react-icons/io5";
import Cookies from "js-cookie";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { onClose } = useDrawer();
  const { removeUser } = useUser();

  const logoutProfile = () => {
    removeUser();
    Cookies.remove("currentUser");
    Cookies.remove("role");
    router.push("/");
  };

  const links: ISidebarItem[] = [
    {
      icon: (
        <FaRegUser
          className={`w-[22px] h-[22px] ${
            pathname === "/user-profile" && "text-[#D4AF37]"
          }`}
        />
      ),
      label: "Profile",
      route: "/user-profile",
    },
    {
      icon: (
        <FaListUl
          className={`w-[22px] h-[22px] ${
            pathname === "/user-profile/booking" && "text-[#D4AF37]"
          }`}
        />
      ),
      label: "My Bookings",
      route: "/user-profile/booking",
    },
  ];

  return (
    <div className="w-full !sticky !top-0 xl:!w-[285px] h-screen bg-[#D4AF37]_bg_color py-4 md:py-10 xl:py-[52px] px-3 flex flex-col justify-between items-center">
      <div className="flex flex-col items-center w-full">
        <h2 className="text-[#D4AF37]">Happiness</h2>

        <ul className="flex flex-col gap-[13px] w-full mt-12">
          {links.map((item: ISidebarItem, i: number) => (
            <Link
              key={i}
              onClick={onClose}
              href={item.route}
              className={`flex gap-3 w-full cursor-pointer border-[1px] border-transparent ${
                pathname === item.route && "hover:opacity-70 hover:bg-[#D4AF37] !border-[#D4AF37]/80 "
              } rounded p-3`}
            >
              {item.icon}
              <span
                className={`font-medium ${
                  pathname === item.route && "text-[#D4AF37]"
                }`}
              >
                {item.label}
              </span>
            </Link>
          ))}
        </ul>
      </div>

      <Button
        className="w-full border-gray-900 bg-transparent hover:bg-red-400 hover:border-red-400 border-[1px] group flex justify-start !p-3"
        variant={"outline"}
        onClick={logoutProfile}
      >
        <IoExitOutline className="w-[22px] h-[22px] mr-3 group-hover:text-white" />
        <span className="group-hover:text-white font-medium">Logout</span>
      </Button>
    </div>
  );
}
