import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default Navbar;
