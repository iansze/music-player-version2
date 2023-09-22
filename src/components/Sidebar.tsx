import { FC, useState } from "react";
import logo from "../assets/logo.svg";
import { links } from "../assets/constants";
import { NavLink } from "react-router-dom";
import { HiOutlineMenu } from "react-icons/hi";
import { RiCloseLine } from "react-icons/ri";

interface SidebarProps {}

const NavLinks = () => (
  <>
    <div className="mt-10">
      {links.map((link) => (
        <NavLink
          key={link.name}
          to={link.to}
          className="flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400"
        >
          <link.icon className="w-6 h-6 mr-2" />
          {link.name}
        </NavLink>
      ))}
    </div>
  </>
);

const Sidebar: FC<SidebarProps> = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  return (
    <>
      <div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-zinc-900">
        <img src={logo} alt="Logo" className="w-full h-14 object-contain" />
        <NavLinks />
      </div>

      <div className="absolute md:hidden block top-6 right-3">
        {mobileMenuOpen ? (
          <RiCloseLine
            onClick={() => setMobileMenuOpen(false)}
            className="w-6 h-6 text-white mr-2"
          />
        ) : (
          <HiOutlineMenu
            onClick={() => setMobileMenuOpen(true)}
            className="w-6 h-6 text-white mr-2"
          />
        )}
      </div>

      <div
        className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-stone-800 backdrop-blur-lg z-10 p-6 md:hidden  ${
          mobileMenuOpen ? "left-0" : "-left-full"
        }`}
      >
        <img src={logo} alt="Logo" className="w-full h-14 object-contain" />
        <NavLinks />
      </div>
    </>
  );
};

export default Sidebar;
