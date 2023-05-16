"use client";
import Link from "next/link";
import styles from "./styles.module.scss";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import Drawer from "../Drawer";

interface IRoute {
  path: string;
  label: string;
}

interface HeaderProps {
  routes: IRoute[];
}

const Header = ({ routes }: HeaderProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h2>Kenzie Empresas</h2>
        {/* <button onClick={() => setIsDrawerOpen(true)}>
          <GiHamburgerMenu />
        </button>
        <Drawer isOpen={isDrawerOpen} onClose={handleDrawerClose}>
          <nav>
            {routes.map((route, index) => (
              <Link key={index} href={route.path}>
                {route.label}
              </Link>
            ))}
          </nav>
        </Drawer> */}
        <nav>
          {routes.map((route, index) => (
            <Link key={index} href={route.path}>
              {route.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
